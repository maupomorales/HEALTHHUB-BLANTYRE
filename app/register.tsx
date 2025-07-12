"use client"

import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { TextInput, Button, Card, Chip, HelperText, ActivityIndicator } from "react-native-paper"
import * as MailComposer from "expo-mail-composer"
import Toast from "react-native-toast-message"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  interests: string[]
}

const healthInterests = [
  "Pharmacy",
  "Dental Care",
  "Eye Care",
  "Fitness & Wellness",
  "Skincare & Beauty",
  "Mental Health",
]

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    interests: [],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    const phoneRegex = /^(\+265|265)?[0-9]{9}$/
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Malawi phone number"
    }

    if (!formData.city.trim() || formData.city.length < 2) {
      newErrors.city = "City/Area is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const sendEmailDirectly = async () => {
    const emailSubject = `🏥 New Health Hub Registration - ${formData.firstName} ${formData.lastName}`

    const emailBody = `
NEW BLANTYRE HEALTH HUB REGISTRATION

📋 PERSONAL INFORMATION:
• Name: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Date of Birth: ${formData.dateOfBirth || "Not provided"}
• Address: ${formData.address || "Not provided"}
• City/Area: ${formData.city}

🏥 HEALTH INTERESTS:
${formData.interests.length > 0 ? formData.interests.map((interest) => `• ${interest}`).join("\n") : "• None selected"}

📅 REGISTRATION DETAILS:
• Registration Date: ${new Date().toLocaleDateString()}
• Registration Time: ${new Date().toLocaleTimeString()}
• Timestamp: ${new Date().toISOString()}

📧 CONTACT INFORMATION:
You can reach out to this new subscriber at:
• Email: ${formData.email}
• Phone: ${formData.phone}

---
This registration was submitted through the Blantyre Health Hub mobile app.
Please follow up with the subscriber to provide relevant health updates for their area.

Best regards,
Blantyre Health Hub Mobile App
    `.trim()

    try {
      const isAvailable = await MailComposer.isAvailableAsync()

      if (isAvailable) {
        const result = await MailComposer.composeAsync({
          recipients: ["healthhubconnect071@gmail.com"],
          subject: emailSubject,
          body: emailBody,
        })

        if (result.status === "sent") {
          return true
        } else if (result.status === "cancelled") {
          throw new Error("Email sending was cancelled")
        }
      } else {
        throw new Error("Email is not available on this device")
      }
    } catch (error) {
      console.error("Email sending error:", error)
      throw error
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fix the errors in the form",
      })
      return
    }

    setIsLoading(true)

    try {
      // Try to send email directly
      await sendEmailDirectly()

      Toast.show({
        type: "success",
        text1: "Registration Successful! 🎉",
        text2: "Your information has been sent to our team. We'll contact you soon!",
        visibilityTime: 4000,
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        interests: [],
      })

      // Navigate back after a delay
      setTimeout(() => {
        router.back()
      }, 2000)
    } catch (error) {
      console.error("Registration error:", error)

      Alert.alert(
        "Registration Error",
        "Failed to send registration email. Please try again or contact us directly at healthhubconnect071@gmail.com",
        [
          { text: "Try Again", style: "default" },
          {
            text: "Contact Us",
            onPress: () => {
              MailComposer.composeAsync({
                recipients: ["healthhubconnect071@gmail.com"],
                subject: "Registration Issue - Blantyre Health Hub",
                body: "I had trouble registering through the app. Please help me subscribe to health updates.",
              })
            },
          },
        ],
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="mail" size={40} color="#2563eb" />
          <Text style={styles.headerTitle}>Subscribe to Health Updates</Text>
          <Text style={styles.headerSubtitle}>
            Join thousands of Blantyre residents staying informed about healthcare services
          </Text>
        </View>

        {/* Email Info Card */}
        <Card style={styles.infoCard}>
          <Card.Content style={styles.infoContent}>
            <Ionicons name="mail" size={24} color="#2563eb" />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Direct Email Registration</Text>
              <Text style={styles.infoSubtitle}>Your registration will be sent to: healthhubconnect071@gmail.com</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Form */}
        <Card style={styles.formCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <TextInput
                  label="First Name *"
                  value={formData.firstName}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, firstName: text }))}
                  mode="outlined"
                  error={!!errors.firstName}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors.firstName}>
                  {errors.firstName}
                </HelperText>
              </View>

              <View style={styles.halfWidth}>
                <TextInput
                  label="Last Name *"
                  value={formData.lastName}
                  onChangeText={(text) => setFormData((prev) => ({ ...prev, lastName: text }))}
                  mode="outlined"
                  error={!!errors.lastName}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors.lastName}>
                  {errors.lastName}
                </HelperText>
              </View>
            </View>

            <TextInput
              label="Email Address *"
              value={formData.email}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>

            <TextInput
              label="Phone Number *"
              value={formData.phone}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))}
              mode="outlined"
              keyboardType="phone-pad"
              placeholder="+265 xxx xxx xxx"
              error={!!errors.phone}
              style={styles.input}
              left={<TextInput.Icon icon="phone" />}
            />
            <HelperText type="error" visible={!!errors.phone}>
              {errors.phone}
            </HelperText>

            <TextInput
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, dateOfBirth: text }))}
              mode="outlined"
              placeholder="YYYY-MM-DD"
              style={styles.input}
              left={<TextInput.Icon icon="calendar" />}
            />

            <TextInput
              label="Address"
              value={formData.address}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, address: text }))}
              mode="outlined"
              multiline
              style={styles.input}
              left={<TextInput.Icon icon="map-marker" />}
            />

            <TextInput
              label="City/Area *"
              value={formData.city}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, city: text }))}
              mode="outlined"
              placeholder="e.g., Blantyre, Limbe, Chichiri"
              error={!!errors.city}
              style={styles.input}
              left={<TextInput.Icon icon="city" />}
            />
            <HelperText type="error" visible={!!errors.city}>
              {errors.city}
            </HelperText>

            <Text style={styles.sectionTitle}>Health Interests</Text>
            <Text style={styles.sectionSubtitle}>Select topics you're interested in to receive relevant updates:</Text>

            <View style={styles.chipsContainer}>
              {healthInterests.map((interest) => (
                <Chip
                  key={interest}
                  selected={formData.interests.includes(interest)}
                  onPress={() => handleInterestToggle(interest)}
                  style={[styles.chip, formData.interests.includes(interest) && styles.selectedChip]}
                  textStyle={[styles.chipText, formData.interests.includes(interest) && styles.selectedChipText]}
                >
                  {interest}
                </Chip>
              ))}
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By registering, you agree to receive health-related updates from Blantyre Health Hub.
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={isLoading}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}
            >
              {isLoading ? <ActivityIndicator color="#fff" /> : "Send Registration to Email"}
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 10,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },
  infoCard: {
    margin: 20,
    backgroundColor: "#eff6ff",
  },
  infoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
  infoSubtitle: {
    fontSize: 14,
    color: "#3730a3",
    marginTop: 2,
  },
  formCard: {
    margin: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "#f3f4f6",
  },
  selectedChip: {
    backgroundColor: "#2563eb",
  },
  chipText: {
    color: "#374151",
  },
  selectedChipText: {
    color: "#fff",
  },
  termsContainer: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#2563eb",
    marginTop: 10,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
})
