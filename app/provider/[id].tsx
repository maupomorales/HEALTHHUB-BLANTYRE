import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card, Button, Badge, Chip } from "react-native-paper"

const providerData: { [key: string]: any } = {
  "pilirani-judo": {
    id: "pilirani-judo",
    name: "Dr. Pilirani Judo",
    title: "Optometrist/Optician",
    clinicName: "Crystal Clear Vision Center",
    category: "Optometry & Vision Care",
    rating: 4.7,
    reviewCount: 28,
    phone: "+265997813198",
    whatsapp: "+265997813198",
    address: "Nancholi CI, Blantyre City",
    area: "Nancholi",
    hours: {
      weekdays: "Monday - Friday: 08:00 AM - 5:00 PM",
      weekends: "Saturday - Sunday: 08:00 AM - 1:00 PM",
      emergency: "Available for emergency consultations by appointment",
    },
    services: {
      comprehensive: [
        "Complete eye examinations and vision assessments",
        "Prescription eyewear consultation and fitting",
        "Contact lens fitting and training",
        "Vision correction solutions",
        "Eye health screenings",
      ],
      specialized: [
        "Prescription glasses (single vision, progressive, bifocals)",
        "Contact lens services (soft, hard, specialty lenses)",
        "Frame selection and styling consultation",
        "Lens replacement and repairs",
      ],
    },
    motto: "Your vision is our priority - providing quality eye care with professional excellence.",
    qualifications: ["Licensed Optometrist", "Vision Care Specialist", "Contact Lens Fitting Certified"],
    languages: ["English", "Chichewa"],
    experience: "5+ years",
    specialties: ["Vision Correction", "Eye Health", "Contact Lenses", "Prescription Eyewear"],
  },
}

export default function ProviderPage() {
  const params = useLocalSearchParams()
  const providerId = params.id as string
  const provider = providerData[providerId]

  if (!provider) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons name="alert-circle" size={64} color="#6b7280" />
        <Text style={styles.notFoundTitle}>Provider Not Found</Text>
        <Button mode="contained" onPress={() => router.back()}>
          Go Back
        </Button>
      </View>
    )
  }

  const handleCall = () => {
    Linking.openURL(`tel:${provider.phone}`)
  }

  const handleWhatsApp = () => {
    const phoneNumber = provider.whatsapp.replace(/[^0-9]/g, "")
    const message = encodeURIComponent(
      `Hello Dr. ${provider.name.split(" ").pop()}, I found your contact through Blantyre Health Hub. I would like to inquire about your eye care services.`,
    )
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`)
  }

  const handleBookAppointment = () => {
    const phoneNumber = provider.whatsapp.replace(/[^0-9]/g, "")
    const message = encodeURIComponent("I want to book an appointment")
    Linking.openURL(`https://wa.me/${phoneNumber}?text=${message}`)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Provider Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={48} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Text style={styles.providerTitle}>{provider.title}</Text>
              <Text style={styles.clinicName}>{provider.clinicName}</Text>

              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={20} color="#fbbf24" />
                <Text style={styles.rating}>{provider.rating}</Text>
                <Text style={styles.reviewCount}>({provider.reviewCount} reviews)</Text>
              </View>

              <Badge style={styles.categoryBadge}>{provider.category}</Badge>
            </View>
          </View>

          <View style={styles.locationInfo}>
            <Ionicons name="location" size={16} color="#6b7280" />
            <Text style={styles.address}>{provider.address}</Text>
          </View>

          <View style={styles.experienceInfo}>
            <Ionicons name="medal" size={16} color="#6b7280" />
            <Text style={styles.experience}>{provider.experience} experience</Text>
          </View>

          <View style={styles.mottoContainer}>
            <Text style={styles.motto}>"{provider.motto}"</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button mode="contained" onPress={handleWhatsApp} style={styles.whatsappButton} icon="message">
          WhatsApp
        </Button>
        <Button mode="outlined" onPress={handleCall} style={styles.callButton} icon="call">
          Call Now
        </Button>
      </View>

      <Button mode="outlined" onPress={handleBookAppointment} style={styles.appointmentButton} icon="calendar">
        Book Appointment
      </Button>

      {/* Operating Hours */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="time" size={24} color="#2563eb" />
            <Text style={styles.cardTitle}>Operating Hours</Text>
          </View>

          <View style={styles.hoursContainer}>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Weekdays</Text>
              <Text style={styles.hoursValue}>{provider.hours.weekdays.split(": ")[1]}</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursLabel}>Weekends</Text>
              <Text style={styles.hoursValue}>{provider.hours.weekends.split(": ")[1]}</Text>
            </View>
          </View>

          <View style={styles.emergencyNotice}>
            <Ionicons name="alert-circle" size={16} color="#f59e0b" />
            <Text style={styles.emergencyText}>{provider.hours.emergency}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Services */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="eye" size={24} color="#2563eb" />
            <Text style={styles.cardTitle}>Services Offered</Text>
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.servicesSectionTitle}>Comprehensive Eye Care</Text>
            {provider.services.comprehensive.map((service: string, index: number) => (
              <View key={index} style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={16} color="#059669" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.servicesSectionTitle}>Specialized Services</Text>
            {provider.services.specialized.map((service: string, index: number) => (
              <View key={index} style={styles.serviceItem}>
                <Ionicons name="checkmark-circle" size={16} color="#059669" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Specialties */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="heart" size={24} color="#2563eb" />
            <Text style={styles.cardTitle}>Areas of Expertise</Text>
          </View>

          <View style={styles.specialtiesContainer}>
            {provider.specialties.map((specialty: string, index: number) => (
              <Chip key={index} style={styles.specialtyChip}>
                {specialty}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Contact Information */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="call" size={24} color="#2563eb" />
            <Text style={styles.cardTitle}>Contact Information</Text>
          </View>

          <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
            <Ionicons name="call" size={20} color="#2563eb" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{provider.phone}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color="#25d366" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>WhatsApp</Text>
              <Text style={styles.contactValue}>Available for messaging</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <Ionicons name="location" size={20} color="#dc2626" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>{provider.address}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Professional Info */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Ionicons name="school" size={24} color="#2563eb" />
            <Text style={styles.cardTitle}>Professional Information</Text>
          </View>

          <View style={styles.professionalSection}>
            <Text style={styles.professionalSectionTitle}>Qualifications</Text>
            {provider.qualifications.map((qual: string, index: number) => (
              <View key={index} style={styles.qualificationItem}>
                <Ionicons name="medal" size={16} color="#2563eb" />
                <Text style={styles.qualificationText}>{qual}</Text>
              </View>
            ))}
          </View>

          <View style={styles.professionalSection}>
            <Text style={styles.professionalSectionTitle}>Languages</Text>
            <View style={styles.languagesContainer}>
              {provider.languages.map((lang: string, index: number) => (
                <Chip key={index} style={styles.languageChip}>
                  {lang}
                </Chip>
              ))}
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Action Card */}
      <Card style={styles.actionCard}>
        <Card.Content>
          <Text style={styles.actionCardTitle}>Ready to Schedule?</Text>
          <Text style={styles.actionCardText}>Book your appointment today for professional eye care services.</Text>

          <View style={styles.quickActions}>
            <Button mode="contained" onPress={handleBookAppointment} style={styles.bookButton} icon="calendar">
              Book Appointment
            </Button>
            <Button mode="outlined" onPress={handleWhatsApp} style={styles.messageButton} icon="message">
              Message
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginVertical: 16,
  },
  headerCard: {
    margin: 16,
    backgroundColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  providerTitle: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "500",
    marginBottom: 4,
  },
  clinicName: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 4,
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: "#6b7280",
  },
  categoryBadge: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    alignSelf: "flex-start",
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  experienceInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  experience: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  mottoContainer: {
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  motto: {
    fontSize: 14,
    color: "#1e40af",
    fontStyle: "italic",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  whatsappButton: {
    flex: 1,
    backgroundColor: "#25d366",
  },
  callButton: {
    flex: 1,
    borderColor: "#2563eb",
  },
  appointmentButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderColor: "#059669",
  },
  card: {
    margin: 16,
    marginTop: 0,
    backgroundColor: "#fff",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 12,
  },
  hoursContainer: {
    marginBottom: 16,
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  hoursLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  hoursValue: {
    fontSize: 14,
    color: "#111827",
  },
  emergencyNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    padding: 12,
    borderRadius: 8,
  },
  emergencyText: {
    fontSize: 12,
    color: "#92400e",
    marginLeft: 8,
    flex: 1,
  },
  servicesSection: {
    marginBottom: 20,
  },
  servicesSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    flex: 1,
  },
  specialtiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  specialtyChip: {
    backgroundColor: "#f3f4f6",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  contactValue: {
    fontSize: 14,
    color: "#111827",
    marginTop: 2,
  },
  professionalSection: {
    marginBottom: 20,
  },
  professionalSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  qualificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  qualificationText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageChip: {
    backgroundColor: "#f3f4f6",
  },
  actionCard: {
    margin: 16,
    marginTop: 0,
    backgroundColor: "#2563eb",
  },
  actionCardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  actionCardText: {
    fontSize: 14,
    color: "#bfdbfe",
    marginBottom: 20,
  },
  quickActions: {
    gap: 12,
  },
  bookButton: {
    backgroundColor: "#059669",
  },
  messageButton: {
    borderColor: "#fff",
  },
})
