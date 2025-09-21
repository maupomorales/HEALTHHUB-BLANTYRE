import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Card, Button, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmergencyScreen: React.FC = () => {
  const handleEmergencyCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleWhatsApp = (phone: string, serviceName: string) => {
    const message = `Hello! I need emergency assistance from ${serviceName}. Please help!`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl);
  };

  const handleMapNavigation = (name: string, address: string) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`;
    Linking.openURL(mapUrl);
  };

  const emergencyContacts = [
    {
      service: "General Emergency",
      number: "997",
      description: "All emergencies - Police, Fire, Medical",
      icon: "warning",
      color: "#dc2626",
      priority: "critical",
    },
    {
      service: "Police Emergency",
      number: "990",
      description: "Crime, accidents, security emergencies",
      icon: "security",
      color: "#2563eb",
      priority: "critical",
    },
    {
      service: "Fire & Rescue",
      number: "998",
      description: "Fire emergencies, rescue operations",
      icon: "local-fire-department",
      color: "#ea580c",
      priority: "critical",
    },
    {
      service: "Ambulance Service",
      number: "998",
      description: "Medical emergencies, patient transport",
      icon: "local-hospital",
      color: "#16a34a",
      priority: "critical",
    },
  ];

  const hospitals = [
    {
      name: "Queen Elizabeth Central Hospital",
      address: "Mahatma Gandhi Road, Blantyre",
      phone: "+265 1 874 333",
      hours: "24/7",
      services: ["Emergency", "Surgery", "Maternity", "Pediatrics"],
      rating: 4.2,
      coordinates: "Casualty Department",
    },
    {
      name: "Blantyre Adventist Hospital",
      address: "Masauko Chipembere Highway, Blantyre",
      phone: "+265 1 620 000",
      hours: "24/7",
      services: ["Emergency", "Cardiology", "Orthopedics", "ICU"],
      rating: 4.5,
      coordinates: "Emergency Department",
    },
    {
      name: "Mlambe Hospital",
      address: "Chilomoni, Blantyre",
      phone: "+265 1 740 200",
      hours: "24/7",
      services: ["Emergency", "General Medicine", "Surgery"],
      rating: 4.0,
      coordinates: "Casualty Department",
    },
    {
      name: "St. Joseph's Mission Hospital",
      address: "Ndirande, Blantyre",
      phone: "+265 1 670 100",
      hours: "24/7",
      services: ["Emergency", "Maternity", "Outpatient"],
      rating: 4.3,
      coordinates: "Casualty Department",
    },
  ];

  const clinics = [
    {
      name: "Limbe Health Center",
      address: "Kamuzu Road, Limbe",
      phone: "+265 1 640 299",
      hours: "24/7",
      services: ["Emergency Care", "Maternity", "Outpatient"],
    },
    {
      name: "Ndirande Health Center",
      address: "Ndirande Township",
      phone: "+265 1 670 188",
      hours: "24/7",
      services: ["Emergency Care", "Child Health", "HIV Testing"],
    },
    {
      name: "Chilomoni Health Center",
      address: "Chilomoni Township",
      phone: "+265 1 740 266",
      hours: "24/7",
      services: ["Emergency Care", "Family Planning", "TB Treatment"],
    },
    {
      name: "Bangwe Health Center",
      address: "Bangwe Township",
      phone: "+265 1 910 455",
      hours: "24/7",
      services: ["Emergency Care", "Immunization", "Antenatal Care"],
    },
  ];

  const emergencyTips = [
    {
      title: "Medical Emergency",
      icon: "favorite",
      tips: [
        "Call 997 or 998 immediately",
        "Stay calm and speak clearly",
        "Provide exact location",
        "Don't move injured person unless necessary",
        "Apply pressure to bleeding wounds",
      ],
    },
    {
      title: "Fire Emergency",
      icon: "local-fire-department",
      tips: [
        "Call 998 immediately",
        "Evacuate the building",
        "Stay low to avoid smoke",
        "Don't use elevators",
        "Meet at designated assembly point",
      ],
    },
    {
      title: "Crime/Security",
      icon: "security",
      tips: [
        "Call 990 for police",
        "Don't resist if being robbed",
        "Try to remember suspect details",
        "Preserve crime scene if safe",
        "Report to nearest police station",
      ],
    },
    {
      title: "Road Accident",
      icon: "local-hospital",
      tips: [
        "Call 997 immediately",
        "Secure the accident scene",
        "Don't move seriously injured",
        "Exchange insurance details",
      ],
    },
  ];

  const pharmacies24h = [
    {
      name: "Central Pharmacy Blantyre",
      address: "Victoria Avenue, Blantyre",
      phone: "+265 1 620 123",
      services: ["Emergency Medicines", "First Aid Supplies"],
    },
    {
      name: "HealthPlus Pharmacy Limbe",
      address: "Masauko Chipembere Highway, Limbe",
      phone: "+265 1 640 234",
      services: ["Prescription Medicines", "Medical Equipment"],
    },
    {
      name: "Mandala Health Pharmacy",
      address: "Mandala Road, Mandala",
      phone: "+265 1 660 567",
      services: ["Emergency Drugs", "Health Consultation"],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="emergency" size={40} color="#dc2626" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Emergency Services</Text>
            <Text style={styles.headerSubtitle}>24/7 Emergency Support for Blantyre</Text>
          </View>
        </View>
        <Badge style={styles.emergencyBadge}>
          <Icon name="access-time" size={16} color="#ffffff" />
          <Text style={styles.emergencyBadgeText}> Available 24/7</Text>
        </Badge>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Hotlines</Text>
        <Text style={styles.sectionSubtitle}>Critical emergency numbers - Save these contacts now</Text>

        <View style={styles.emergencyGrid}>
          {emergencyContacts.map((contact, index) => (
            <Card key={index} style={[styles.emergencyCard, { borderColor: contact.color }]} elevation={3}>
              <Card.Content style={styles.emergencyCardContent}>
                <View style={[styles.emergencyIcon, { backgroundColor: contact.color }]}>
                  <Icon name={contact.icon} size={32} color="#ffffff" />
                </View>
                <Text style={styles.emergencyService}>{contact.service}</Text>
                <Text style={[styles.emergencyNumber, { color: contact.color }]}>{contact.number}</Text>
                <Text style={styles.emergencyDescription}>{contact.description}</Text>
                <Button
                  mode="contained"
                  style={[styles.emergencyButton, { backgroundColor: contact.color }]}
                  onPress={() => handleEmergencyCall(contact.number)}
                  compact
                >
                  <Icon name="phone" size={16} color="#ffffff" />
                  <Text style={styles.emergencyButtonText}> Call Now</Text>
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Hospitals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Hospitals</Text>
        <Text style={styles.sectionSubtitle}>24/7 emergency care facilities in Blantyre</Text>

        <View style={styles.hospitalsList}>
          {hospitals.map((hospital, index) => (
            <Card key={index} style={styles.hospitalCard} elevation={2}>
              <Card.Content style={styles.hospitalCardContent}>
                <View style={styles.hospitalHeader}>
                  <View style={styles.hospitalInfo}>
                    <Text style={styles.hospitalName}>{hospital.name}</Text>
                    <View style={styles.hospitalLocation}>
                      <Icon name="location-on" size={16} color="#dc2626" />
                      <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                    </View>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#fbbf24" />
                    <Text style={styles.rating}>{hospital.rating}</Text>
                  </View>
                </View>

                <View style={styles.hospitalDetails}>
                  <View style={styles.hospitalDetailItem}>
                    <Icon name="phone" size={16} color="#2563eb" />
                    <Text style={styles.hospitalDetailText}>{hospital.phone}</Text>
                  </View>
                  <View style={styles.hospitalDetailItem}>
                    <Icon name="access-time" size={16} color="#2563eb" />
                    <Text style={styles.hospitalDetailText}>{hospital.hours}</Text>
                  </View>
                </View>

                <View style={styles.hospitalServices}>
                  {hospital.services.map((service, idx) => (
                    <Badge key={idx} style={styles.hospitalServiceTag} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </View>

                <View style={styles.hospitalActions}>
                  <Button
                    mode="contained"
                    style={[styles.actionButton, { backgroundColor: '#dc2626' }]}
                    onPress={() => handleEmergencyCall(hospital.phone)}
                    compact
                  >
                    <Icon name="phone" size={16} color="#ffffff" />
                    <Text style={styles.actionButtonText}> Call</Text>
                  </Button>
                  <Button
                    mode="contained"
                    style={[styles.actionButton, { backgroundColor: '#16a34a' }]}
                    onPress={() => handleWhatsApp(hospital.phone, hospital.name)}
                    compact
                  >
                    <Icon name="message" size={16} color="#ffffff" />
                    <Text style={styles.actionButtonText}> WhatsApp</Text>
                  </Button>
                  <Button
                    mode="outlined"
                    style={styles.actionButton}
                    onPress={() => handleMapNavigation(hospital.name, hospital.address)}
                    compact
                  >
                    <Icon name="map" size={16} color="#2563eb" />
                    <Text style={[styles.actionButtonText, { color: '#2563eb' }]}> Map</Text>
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Health Centers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Centers</Text>
        <Text style={styles.sectionSubtitle}>Community health centers with emergency services</Text>

        <View style={styles.clinicsList}>
          {clinics.map((clinic, index) => (
            <Card key={index} style={styles.clinicCard} elevation={1}>
              <Card.Content style={styles.clinicCardContent}>
                <View style={styles.clinicHeader}>
                  <Text style={styles.clinicName}>{clinic.name}</Text>
                  <View style={styles.clinicLocation}>
                    <Icon name="location-on" size={14} color="#64748b" />
                    <Text style={styles.clinicAddress}>{clinic.address}</Text>
                  </View>
                </View>

                <View style={styles.clinicDetails}>
                  <View style={styles.clinicDetailItem}>
                    <Icon name="phone" size={14} color="#2563eb" />
                    <Text style={styles.clinicDetailText}>{clinic.phone}</Text>
                  </View>
                  <View style={styles.clinicDetailItem}>
                    <Icon name="access-time" size={14} color="#2563eb" />
                    <Text style={styles.clinicDetailText}>{clinic.hours}</Text>
                  </View>
                </View>

                <View style={styles.clinicServices}>
                  {clinic.services.map((service, idx) => (
                    <Badge key={idx} style={styles.clinicServiceTag} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </View>

                <View style={styles.clinicActions}>
                  <Button
                    mode="contained"
                    style={[styles.clinicActionButton, { backgroundColor: '#2563eb' }]}
                    onPress={() => handleEmergencyCall(clinic.phone)}
                    compact
                  >
                    <Icon name="phone" size={14} color="#ffffff" />
                    <Text style={styles.clinicActionButtonText}> Call</Text>
                  </Button>
                  <Button
                    mode="outlined"
                    style={styles.clinicActionButton}
                    onPress={() => handleMapNavigation(clinic.name, clinic.address)}
                    compact
                  >
                    <Icon name="map" size={14} color="#2563eb" />
                    <Text style={[styles.clinicActionButtonText, { color: '#2563eb' }]}> Map</Text>
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Emergency Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Response Tips</Text>
        <Text style={styles.sectionSubtitle}>Important guidelines for different emergency situations</Text>

        <View style={styles.tipsList}>
          {emergencyTips.map((tip, index) => (
            <Card key={index} style={styles.tipCard} elevation={1}>
              <Card.Content style={styles.tipCardContent}>
                <View style={styles.tipHeader}>
                  <View style={styles.tipIcon}>
                    <Icon name={tip.icon} size={24} color="#dc2626" />
                  </View>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                </View>
                <View style={styles.tipList}>
                  {tip.tips.map((tipItem, idx) => (
                    <View key={idx} style={styles.tipItem}>
                      <Icon name="check-circle" size={16} color="#16a34a" />
                      <Text style={styles.tipText}>{tipItem}</Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* 24/7 Pharmacies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>24/7 Pharmacies</Text>
        <Text style={styles.sectionSubtitle}>Emergency medicines and first aid supplies</Text>

        <View style={styles.pharmaciesList}>
          {pharmacies24h.map((pharmacy, index) => (
            <Card key={index} style={styles.pharmacyCard} elevation={1}>
              <Card.Content style={styles.pharmacyCardContent}>
                <View style={styles.pharmacyHeader}>
                  <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                  <View style={styles.pharmacyLocation}>
                    <Icon name="location-on" size={14} color="#64748b" />
                    <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
                  </View>
                </View>

                <View style={styles.pharmacyServices}>
                  {pharmacy.services.map((service, idx) => (
                    <Badge key={idx} style={styles.pharmacyServiceTag} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </View>

                <View style={styles.pharmacyActions}>
                  <Button
                    mode="contained"
                    style={[styles.pharmacyActionButton, { backgroundColor: '#2563eb' }]}
                    onPress={() => handleEmergencyCall(pharmacy.phone)}
                    compact
                  >
                    <Icon name="phone" size={14} color="#ffffff" />
                    <Text style={styles.pharmacyActionButtonText}> Call</Text>
                  </Button>
                  <Button
                    mode="outlined"
                    style={styles.pharmacyActionButton}
                    onPress={() => handleMapNavigation(pharmacy.name, pharmacy.address)}
                    compact
                  >
                    <Icon name="map" size={14} color="#2563eb" />
                    <Text style={[styles.pharmacyActionButtonText, { color: '#2563eb' }]}> Map</Text>
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Icon name="emergency" size={32} color="#ffffff" />
          <View style={styles.footerText}>
            <Text style={styles.footerTitle}>Emergency Services</Text>
            <Text style={styles.footerSubtitle}>24/7 Support for Blantyre</Text>
          </View>
        </View>
        <Text style={styles.footerDescription}>
          In case of emergency, call the appropriate number immediately. 
          Stay calm and provide clear information about your location and situation.
        </Text>
        <Text style={styles.footerCopyright}>
          © 2025 Blantyre Health Hub. Emergency services directory.
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
    backgroundColor: '#dc2626',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    color: '#fecaca',
  },
  emergencyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyBadgeText: {
    color: '#ffffff',
    fontWeight: '600',
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
  emergencyGrid: {
    gap: 16,
  },
  emergencyCard: {
    borderWidth: 2,
    marginBottom: 16,
  },
  emergencyCardContent: {
    alignItems: 'center',
    padding: 20,
  },
  emergencyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyService: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emergencyNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  emergencyButton: {
    width: '100%',
  },
  emergencyButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  hospitalsList: {
    gap: 16,
  },
  hospitalCard: {
    marginBottom: 16,
  },
  hospitalCardContent: {
    padding: 16,
  },
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  hospitalLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
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
  hospitalDetails: {
    marginBottom: 12,
  },
  hospitalDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  hospitalDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
  },
  hospitalServices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 4,
  },
  hospitalServiceTag: {
    marginRight: 4,
    marginBottom: 4,
  },
  hospitalActions: {
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
  clinicsList: {
    gap: 12,
  },
  clinicCard: {
    marginBottom: 12,
  },
  clinicCardContent: {
    padding: 16,
  },
  clinicHeader: {
    marginBottom: 12,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  clinicLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clinicAddress: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  clinicDetails: {
    marginBottom: 12,
  },
  clinicDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  clinicDetailText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#64748b',
  },
  clinicServices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 4,
  },
  clinicServiceTag: {
    marginRight: 4,
    marginBottom: 4,
  },
  clinicActions: {
    flexDirection: 'row',
    gap: 8,
  },
  clinicActionButton: {
    flex: 1,
  },
  clinicActionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  tipsList: {
    gap: 16,
  },
  tipCard: {
    marginBottom: 16,
  },
  tipCardContent: {
    padding: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  tipList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
    flex: 1,
    lineHeight: 20,
  },
  pharmaciesList: {
    gap: 12,
  },
  pharmacyCard: {
    marginBottom: 12,
  },
  pharmacyCardContent: {
    padding: 16,
  },
  pharmacyHeader: {
    marginBottom: 12,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  pharmacyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyAddress: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  pharmacyServices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 4,
  },
  pharmacyServiceTag: {
    marginRight: 4,
    marginBottom: 4,
  },
  pharmacyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  pharmacyActionButton: {
    flex: 1,
  },
  pharmacyActionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
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

export default EmergencyScreen;
