import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { Card, Button, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import analytics from '../services/analytics';
import errorHandler from '../services/errorHandler';
import offlineStorage from '../services/offlineStorage';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Track screen view
    analytics.trackScreenView('HomeScreen', 'HomeScreen');
    
    // Load cached data if available
    loadCachedData();
  }, []);

  const loadCachedData = async () => {
    try {
      const cachedProviders = await offlineStorage.getCachedHealthcareProviders('featured');
      if (cachedProviders) {
        // Use cached data if available
        console.log('Loaded cached providers:', cachedProviders.length);
      }
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'HomeScreen',
        action: 'LOAD_CACHED_DATA',
      });
    }
  };

  const handlePhoneCall = async (phone: string) => {
    try {
      await Linking.openURL(`tel:${phone}`);
      await analytics.trackContactAction('Featured Provider', 'call');
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'HomeScreen',
        action: 'PHONE_CALL',
      });
    }
  };

  const handleWhatsApp = async (phone: string, serviceName: string) => {
    try {
      const message = `Hello! I'm interested in your services at ${serviceName}. Can you please provide more information?`;
      const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      await Linking.openURL(whatsappUrl);
      await analytics.trackContactAction(serviceName, 'whatsapp');
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'HomeScreen',
        action: 'WHATSAPP_MESSAGE',
      });
    }
  };

  const featuredProviders = [
    { name: "Central Pharmacy", type: "Pharmacy", rating: 4.8, location: "City Centre", hours: "24/7", phone: "+265 1 620 123" },
    { name: "Vision Care Opticians", type: "Optician", rating: 4.9, location: "Limbe", hours: "8AM-6PM", phone: "+265 1 622 345" },
    { name: "Smile Dental Clinic", type: "Dentist", rating: 4.7, location: "Mandala", hours: "8AM-5PM", phone: "+265 1 621 789" },
    { name: "FitLife Gym", type: "Gym", rating: 4.6, location: "Chichiri", hours: "5AM-10PM", phone: "+265 1 623 678" },
    { name: "Glow Skincare", type: "Skincare", rating: 4.8, location: "Limbe", hours: "9AM-7PM", phone: "+265 1 624 901" },
    { name: "HealthPlus Pharmacy", type: "Pharmacy", rating: 4.5, location: "Ndirande", hours: "7AM-9PM", phone: "+265 1 670 345" },
  ];

  const serviceCategories = [
    {
      id: 'pharmacies',
      title: 'Pharmacies',
      icon: 'local-pharmacy',
      description: 'Licensed pharmacies with prescription and over-the-counter medications',
      services: ['Prescription medications', 'Health consultations', 'Medical supplies', 'Emergency services'],
      color: '#2563eb'
    },
    {
      id: 'opticians',
      title: 'Opticians',
      icon: 'visibility',
      description: 'Professional eye care services and quality eyewear solutions',
      services: ['Eye examinations', 'Prescription glasses', 'Contact lenses', 'Vision therapy'],
      color: '#64748b'
    },
    {
      id: 'dentists',
      title: 'Dentists',
      icon: 'mood',
      description: 'Comprehensive dental care for healthy smiles and oral hygiene',
      services: ['General dentistry', 'Teeth cleaning', 'Orthodontics', 'Emergency dental care'],
      color: '#2563eb'
    },
    {
      id: 'gyms',
      title: 'Gyms & Fitness',
      icon: 'fitness-center',
      description: 'Modern fitness facilities and personal training services',
      services: ['Modern equipment', 'Personal training', 'Group classes', 'Nutrition guidance'],
      color: '#64748b'
    },
    {
      id: 'skincare',
      title: 'Skincare Products',
      icon: 'auto-awesome',
      description: 'Premium skincare products and beauty treatments',
      services: ['Skincare products', 'Beauty treatments', 'Dermatology services', 'Cosmetic procedures'],
      color: '#2563eb'
    },
    {
      id: 'emergency',
      title: 'Emergency Services',
      icon: 'favorite',
      description: '24/7 emergency healthcare contacts and locations',
      services: ['Emergency contacts', 'Hospital locations', 'Ambulance services', 'First aid centers'],
      color: '#dc2626'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#dbeafe', '#f1f5f9']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Icon name="local-hospital" size={50} color="#2563eb" />
            <View style={styles.logoText}>
              <Text style={styles.logoTitle}>HEALTH-HUB MW</Text>
              <Text style={styles.logoSubtitle}>Your Complete Health Directory</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('Search' as never)}
          >
            <Icon name="search" size={20} color="#ffffff" />
            <Text style={styles.searchButtonText}>Find Services</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Badge style={styles.heroBadge}>🏥 Blantyre's Premier Health Directory</Badge>
        <Text style={styles.heroTitle}>
          Your Complete{' '}
          <Text style={styles.heroTitleAccent}>Health Hub</Text>
        </Text>
        <Text style={styles.heroDescription}>
          Find and connect with verified healthcare providers instantly through our app. 
          Our platform gives you direct access to trusted professionals across pharmacy, 
          dental, optical, and skincare services.
        </Text>
        
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search' as never)}
        >
          <Icon name="search" size={20} color="#9ca3af" />
          <Text style={styles.searchBarText}>Search by area (e.g., City Centre, Limbe...)</Text>
          <Icon name="arrow-forward" size={20} color="#2563eb" />
        </TouchableOpacity>

        <View style={styles.heroFeatures}>
          <View style={styles.featureItem}>
            <Icon name="location-on" size={16} color="#64748b" />
            <Text style={styles.featureText}>Blantyre, Malawi</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="access-time" size={16} color="#64748b" />
            <Text style={styles.featureText}>24/7 Directory</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="star" size={16} color="#64748b" />
            <Text style={styles.featureText}>Verified Providers</Text>
          </View>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Services Directory</Text>
        <Text style={styles.sectionSubtitle}>
          Find trusted healthcare providers and wellness services across Blantyre
        </Text>

        <View style={styles.servicesGrid}>
          {serviceCategories.map((service) => (
            <Card key={service.id} style={styles.serviceCard} elevation={2}>
              <Card.Content style={styles.serviceCardContent}>
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                  <Icon name={service.icon} size={32} color={service.color} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                
                <View style={styles.serviceList}>
                  {service.services.slice(0, 3).map((item, index) => (
                    <Text key={index} style={styles.serviceItem}>• {item}</Text>
                  ))}
                </View>

                <Button
                  mode="outlined"
                  style={[
                    styles.serviceButton,
                    { borderColor: service.color }
                  ]}
                  labelStyle={{ color: service.color }}
                  onPress={() => {
                    if (service.id === 'emergency') {
                      navigation.navigate('Emergency' as never);
                    } else {
                      navigation.navigate('Search' as never, { category: service.id } as never);
                    }
                  }}
                >
                  {service.id === 'emergency' ? 'Emergency Info' : `View ${service.title}`}
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Featured Providers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Health Providers</Text>
        <Text style={styles.sectionSubtitle}>Top-rated healthcare services in Blantyre</Text>

        <View style={styles.providersGrid}>
          {featuredProviders.map((provider, index) => (
            <Card key={index} style={styles.providerCard} elevation={1}>
              <Card.Content style={styles.providerCardContent}>
                <View style={styles.providerHeader}>
                  <View>
                    <Text style={styles.providerName}>{provider.name}</Text>
                    <Badge style={styles.providerBadge}>{provider.type}</Badge>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#fbbf24" />
                    <Text style={styles.rating}>{provider.rating}</Text>
                  </View>
                </View>

                <View style={styles.providerInfo}>
                  <View style={styles.providerInfoItem}>
                    <Icon name="location-on" size={16} color="#dc2626" />
                    <Text style={styles.providerInfoText}>{provider.location}</Text>
                  </View>
                  <View style={styles.providerInfoItem}>
                    <Icon name="access-time" size={16} color="#dc2626" />
                    <Text style={styles.providerInfoText}>{provider.hours}</Text>
                  </View>
                </View>

                <View style={styles.providerActions}>
                  <Button
                    mode="contained"
                    style={[styles.actionButton, { backgroundColor: '#2563eb' }]}
                    onPress={() => handlePhoneCall(provider.phone)}
                    compact
                  >
                    <Icon name="phone" size={16} color="#ffffff" />
                    <Text style={styles.actionButtonText}> Call</Text>
                  </Button>
                  <Button
                    mode="contained"
                    style={[styles.actionButton, { backgroundColor: '#16a34a' }]}
                    onPress={() => handleWhatsApp(provider.phone, provider.name)}
                    compact
                  >
                    <Icon name="message" size={16} color="#ffffff" />
                    <Text style={styles.actionButtonText}> WhatsApp</Text>
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Blantyre Health Hub</Text>
        <Text style={styles.aboutText}>
          Blantyre Health Hub is your comprehensive directory for all healthcare and wellness 
          services in Blantyre. We connect residents with trusted healthcare providers, making 
          it easier to find quality care when you need it most.
        </Text>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Healthcare Providers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Service Categories</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Directory Access</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Verified Listings</Text>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Blantyre Health Hub</Text>
        <Text style={styles.sectionSubtitle}>Get in touch with us for any inquiries or support</Text>

        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Icon name="phone" size={24} color="#2563eb" />
            <View>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+265 897976524</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <Icon name="email" size={24} color="#2563eb" />
            <View>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>healthhubconnect071@gmail.com</Text>
            </View>
          </View>
          <View style={styles.contactItem}>
            <Icon name="location-on" size={24} color="#2563eb" />
            <View>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>Blantyre, Malawi</Text>
            </View>
          </View>
        </View>

        <Button
          mode="contained"
          style={styles.contactButton}
          onPress={() => navigation.navigate('Contact' as never)}
        >
          Send us a Message
        </Button>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerLogo}>
            <Icon name="local-hospital" size={32} color="#ffffff" />
            <View>
              <Text style={styles.footerTitle}>HEALTH-HUB MW</Text>
              <Text style={styles.footerSubtitle}>Your Health Directory</Text>
            </View>
          </View>
          <Text style={styles.footerDescription}>
            Connecting Blantyre residents with trusted healthcare providers and wellness services.
          </Text>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>Emergency</Text>
            <Text style={styles.emergencyNumber}>Emergency: 997</Text>
            <Text style={styles.emergencyText}>Police: 990</Text>
            <Text style={styles.emergencyText}>Fire: 998</Text>
            <Text style={styles.emergencyText}>Ambulance: 998</Text>
          </View>
        </View>
        <Text style={styles.footerCopyright}>
          © 2025 Blantyre Health Hub. All rights reserved. | Serving Blantyre, Malawi
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 12,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  logoSubtitle: {
    fontSize: 10,
    color: '#64748b',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#ffffff',
    marginLeft: 4,
    fontWeight: '600',
  },
  heroSection: {
    padding: 20,
    alignItems: 'center',
  },
  heroBadge: {
    backgroundColor: '#dbeafe',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroTitleAccent: {
    color: '#2563eb',
  },
  heroDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24,
    width: '100%',
    maxWidth: 400,
  },
  searchBarText: {
    flex: 1,
    marginLeft: 8,
    color: '#9ca3af',
  },
  heroFeatures: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748b',
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
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    marginBottom: 16,
  },
  serviceCardContent: {
    alignItems: 'center',
    padding: 20,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  serviceList: {
    marginBottom: 16,
  },
  serviceItem: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  serviceButton: {
    width: '100%',
  },
  providersGrid: {
    gap: 12,
  },
  providerCard: {
    marginBottom: 12,
  },
  providerCardContent: {
    padding: 16,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  providerBadge: {
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  providerInfo: {
    marginBottom: 16,
  },
  providerInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerInfoText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#64748b',
  },
  providerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  contactInfo: {
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  contactValue: {
    fontSize: 14,
    color: '#64748b',
  },
  contactButton: {
    backgroundColor: '#2563eb',
  },
  footer: {
    backgroundColor: '#1f2937',
    padding: 20,
  },
  footerContent: {
    marginBottom: 16,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  footerSubtitle: {
    fontSize: 10,
    color: '#9ca3af',
    marginLeft: 12,
  },
  footerDescription: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 16,
  },
  emergencyInfo: {
    marginTop: 16,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  emergencyNumber: {
    fontSize: 12,
    color: '#fca5a5',
    fontWeight: '600',
  },
  emergencyText: {
    fontSize: 12,
    color: '#9ca3af',
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

export default HomeScreen;

