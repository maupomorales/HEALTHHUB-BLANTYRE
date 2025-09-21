import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Card, Button, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We will get back to you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
              });
            },
          },
        ]
      );
      setIsSubmitting(false);
    }, 2000);
  };

  const handlePhoneCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWhatsApp = (phone: string) => {
    const message = 'Hello! I would like to get in touch with Blantyre Health Hub.';
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl);
  };

  const contactInfo = [
    {
      type: 'Phone',
      value: '+265 897976524',
      icon: 'phone',
      color: '#2563eb',
      action: () => handlePhoneCall('+265 897976524'),
    },
    {
      type: 'Email',
      value: 'healthhubconnect071@gmail.com',
      icon: 'email',
      color: '#16a34a',
      action: () => handleEmail('healthhubconnect071@gmail.com'),
    },
    {
      type: 'WhatsApp',
      value: '+265 897976524',
      icon: 'message',
      color: '#16a34a',
      action: () => handleWhatsApp('+265 897976524'),
    },
    {
      type: 'Location',
      value: 'Blantyre, Malawi',
      icon: 'location-on',
      color: '#dc2626',
      action: () => {
        const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Blantyre,Malawi';
        Linking.openURL(mapUrl);
      },
    },
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 2:00 PM' },
    { day: 'Emergency Support', hours: '24/7' },
  ];

  const faqItems = [
    {
      question: 'How do I add my business to the directory?',
      answer: 'Contact us through the form below or call us directly. We will guide you through the verification process.',
    },
    {
      question: 'Is the service free for users?',
      answer: 'Yes, our directory service is completely free for users. We only charge businesses for premium listings.',
    },
    {
      question: 'How do I report incorrect information?',
      answer: 'Please contact us immediately with the correct information. We verify all listings regularly.',
    },
    {
      question: 'Do you cover areas outside Blantyre?',
      answer: 'Currently, we focus on Blantyre and surrounding areas. We plan to expand to other cities soon.',
    },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon name="contact-support" size={40} color="#2563eb" />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Contact Us</Text>
              <Text style={styles.headerSubtitle}>Get in touch with Blantyre Health Hub</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get In Touch</Text>
          <Text style={styles.sectionSubtitle}>We're here to help you find the best healthcare services</Text>

          <View style={styles.contactGrid}>
            {contactInfo.map((contact, index) => (
              <Card key={index} style={styles.contactCard} elevation={2}>
                <Card.Content style={styles.contactCardContent}>
                  <TouchableOpacity style={styles.contactItem} onPress={contact.action}>
                    <View style={[styles.contactIcon, { backgroundColor: contact.color + '20' }]}>
                      <Icon name={contact.icon} size={24} color={contact.color} />
                    </View>
                    <View style={styles.contactDetails}>
                      <Text style={styles.contactType}>{contact.type}</Text>
                      <Text style={styles.contactValue}>{contact.value}</Text>
                    </View>
                    <Icon name="arrow-forward" size={20} color="#9ca3af" />
                  </TouchableOpacity>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        {/* Business Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Hours</Text>
          <Text style={styles.sectionSubtitle}>When you can reach us</Text>

          <Card style={styles.hoursCard} elevation={2}>
            <Card.Content style={styles.hoursCardContent}>
              {businessHours.map((schedule, index) => (
                <View key={index} style={styles.hoursItem}>
                  <Text style={styles.hoursDay}>{schedule.day}</Text>
                  <Text style={styles.hoursTime}>{schedule.hours}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <Text style={styles.sectionSubtitle}>Have a question or need assistance? We'd love to hear from you</Text>

          <Card style={styles.formCard} elevation={2}>
            <Card.Content style={styles.formCardContent}>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Name *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder="Your full name"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Email *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    placeholder="your.email@example.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Phone</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    placeholder="+265 XXX XXX XXX"
                    placeholderTextColor="#9ca3af"
                    keyboardType="phone-pad"
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Subject</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.subject}
                    onChangeText={(value) => handleInputChange('subject', value)}
                    placeholder="What's this about?"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Message *</Text>
                <TextInput
                  style={[styles.formInput, styles.messageInput]}
                  value={formData.message}
                  onChangeText={(value) => handleInputChange('message', value)}
                  placeholder="Tell us how we can help you..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <Button
                mode="contained"
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                <Icon name="send" size={20} color="#ffffff" />
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Text>
              </Button>
            </Card.Content>
          </Card>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <Text style={styles.sectionSubtitle}>Quick answers to common questions</Text>

          <View style={styles.faqList}>
            {faqItems.map((faq, index) => (
              <Card key={index} style={styles.faqCard} elevation={1}>
                <Card.Content style={styles.faqCardContent}>
                  <View style={styles.faqHeader}>
                    <Icon name="help-outline" size={20} color="#2563eb" />
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                  </View>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Icon name="contact-support" size={32} color="#ffffff" />
            <View style={styles.footerText}>
              <Text style={styles.footerTitle}>Contact Support</Text>
              <Text style={styles.footerSubtitle}>We're here to help</Text>
            </View>
          </View>
          <Text style={styles.footerDescription}>
            Have questions about our services or need help finding healthcare providers? 
            Don't hesitate to reach out to us. We're committed to helping you find the best care.
          </Text>
          <Text style={styles.footerCopyright}>
            © 2025 Blantyre Health Hub. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#dbeafe',
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  contactGrid: {
    gap: 12,
  },
  contactCard: {
    marginBottom: 12,
  },
  contactCardContent: {
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  contactType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#64748b',
  },
  hoursCard: {
    marginBottom: 16,
  },
  hoursCardContent: {
    padding: 20,
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  hoursDay: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  hoursTime: {
    fontSize: 14,
    color: '#64748b',
  },
  formCard: {
    marginBottom: 16,
  },
  formCardContent: {
    padding: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  formField: {
    flex: 1,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  faqList: {
    gap: 12,
  },
  faqCard: {
    marginBottom: 12,
  },
  faqCardContent: {
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#1f2937',
    padding: 20,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerText: {
    marginLeft: 12,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footerDescription: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 16,
    lineHeight: 18,
  },
  footerCopyright: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 16,
  },
});

export default ContactScreen;

