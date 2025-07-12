import { View, Text, ScrollView, StyleSheet, Linking, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Card, Button, Badge } from "react-native-paper"

const emergencyContacts = [
  {
    service: "General Emergency",
    number: "997",
    description: "All emergencies - Police, Fire, Medical",
    icon: "warning",
    color: "#dc2626",
  },
  {
    service: "Police Emergency",
    number: "990",
    description: "Crime, accidents, security emergencies",
    icon: "shield",
    color: "#1d4ed8",
  },
  {
    service: "Fire & Rescue",
    number: "998",
    description: "Fire emergencies, rescue operations",
    icon: "flame",
    color: "#ea580c",
  },
  {
    service: "Ambulance Service",
    number: "998",
    description: "Medical emergencies, patient transport",
    icon: "medical",
    color: "#059669",
  },
]

const hospitals = [
  {
    name: "Queen Elizabeth Central Hospital",
    type: "Government Hospital",
    address: "Masauko Chipembere Highway, Blantyre",
    phone: "+265 1 871 911",
    services: ["Emergency Room", "Trauma Center", "ICU", "Surgery"],
    hours: "24/7",
    rating: 4.2,
  },
  {
    name: "Blantyre Adventist Hospital",
    type: "Private Hospital",
    address: "Nyambadwe, Blantyre",
    phone: "+265 1 870 444",
    services: ["Emergency Care", "Specialist Services", "Laboratory"],
    hours: "24/7",
    rating: 4.5,
  },
]

export default function EmergencyPage() {
  const handleEmergencyCall = (number: string) => {
    Alert.alert("Emergency Call", `Are you sure you want to call ${number}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Call Now",
        style: "destructive",
        onPress: () => Linking.openURL(`tel:${number}`),
      },
    ])
  }

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Ionicons name="medical" size={60} color="#fff" />
        <Text style={styles.heroTitle}>Emergency Services</Text>
        <Text style={styles.heroSubtitle}>Quick access to emergency contacts and life-saving information</Text>
        <Badge style={styles.badge}>Available 24/7</Badge>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Hotlines</Text>
        <Text style={styles.sectionSubtitle}>Critical emergency numbers - Save these contacts now</Text>

        {emergencyContacts.map((contact, index) => (
          <Card key={index} style={[styles.emergencyCard, { borderLeftColor: contact.color }]}>
            <Card.Content>
              <View style={styles.emergencyHeader}>
                <View style={[styles.emergencyIcon, { backgroundColor: contact.color + "20" }]}>
                  <Ionicons name={contact.icon as any} size={32} color={contact.color} />
                </View>
                <View style={styles.emergencyInfo}>
                  <Text style={styles.emergencyService}>{contact.service}</Text>
                  <Text style={styles.emergencyNumber}>{contact.number}</Text>
                  <Text style={styles.emergencyDescription}>{contact.description}</Text>
                </View>
              </View>
              <Button
                mode="contained"
                onPress={() => handleEmergencyCall(contact.number)}
                style={[styles.emergencyButton, { backgroundColor: contact.color }]}
                icon="call"
              >
                Call Now
              </Button>
            </Card.Content>
          </Card>
        ))}

        <Card style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={24} color="#dc2626" />
              <Text style={styles.infoTitle}>Important Notice</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>997</Text> is the universal emergency number in Malawi. Use it for all
              life-threatening emergencies. Calls are free from all networks.
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Hospitals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Hospitals</Text>
        <Text style={styles.sectionSubtitle}>24/7 emergency medical facilities in Blantyre</Text>

        {hospitals.map((hospital, index) => (
          <Card key={index} style={styles.hospitalCard}>
            <Card.Content>
              <View style={styles.hospitalHeader}>
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <Badge style={styles.hospitalType}>{hospital.type}</Badge>
                </View>
                <View style={styles.rating}>
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text style={styles.ratingText}>{hospital.rating}</Text>
                </View>
              </View>

              <View style={styles.hospitalDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#dc2626" />
                  <Text style={styles.detailText}>{hospital.address}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="call" size={16} color="#dc2626" />
                  <Text style={styles.detailText}>{hospital.phone}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={16} color="#dc2626" />
                  <Text style={[styles.detailText, styles.hoursText]}>{hospital.hours}</Text>
                </View>
              </View>

              <View style={styles.servicesContainer}>
                <Text style={styles.servicesLabel}>Emergency Services:</Text>
                <View style={styles.servicesList}>
                  {hospital.services.map((service, idx) => (
                    <Badge key={idx} style={styles.serviceBadge}>
                      {service}
                    </Badge>
                  ))}
                </View>
              </View>

              <View style={styles.hospitalActions}>
                <Button
                  mode="contained"
                  onPress={() => handleCall(hospital.phone)}
                  style={styles.callButton}
                  icon="call"
                  compact
                >
                  Call
                </Button>
                <Button mode="outlined" style={styles.directionsButton} icon="map" compact>
                  Directions
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Quick Emergency Action */}
      <View style={styles.emergencyAction}>
        <Text style={styles.emergencyActionTitle}>In Case of Emergency</Text>
        <Text style={styles.emergencyActionText}>Stay calm, call for help, and provide clear location details</Text>
        <Button
          mode="contained"
          onPress={() => handleEmergencyCall("997")}
          style={styles.mainEmergencyButton}
          contentStyle={styles.mainEmergencyButtonContent}
          icon="call"
        >
          Emergency Call 997
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  hero: {
    backgroundColor: "#dc2626",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#fecaca",
    marginTop: 8,
    textAlign: "center",
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    marginTop: 16,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
  },
  emergencyCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    backgroundColor: "#fff",
  },
  emergencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  emergencyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyService: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  emergencyNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 4,
  },
  emergencyDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  emergencyButton: {
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
    borderWidth: 1,
    marginTop: 16,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#991b1b",
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#7f1d1d",
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  hospitalCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  hospitalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  hospitalType: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
    color: "#92400e",
  },
  hospitalDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    flex: 1,
  },
  hoursText: {
    color: "#059669",
    fontWeight: "500",
  },
  servicesContainer: {
    marginBottom: 16,
  },
  servicesLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 8,
  },
  servicesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  serviceBadge: {
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
  hospitalActions: {
    flexDirection: "row",
    gap: 8,
  },
  callButton: {
    flex: 1,
    backgroundColor: "#dc2626",
  },
  directionsButton: {
    flex: 1,
    borderColor: "#dc2626",
  },
  emergencyAction: {
    backgroundColor: "#dc2626",
    padding: 30,
    alignItems: "center",
  },
  emergencyActionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  emergencyActionText: {
    fontSize: 16,
    color: "#fecaca",
    textAlign: "center",
    marginBottom: 20,
  },
  mainEmergencyButton: {
    backgroundColor: "#fff",
  },
  mainEmergencyButtonContent: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
})
