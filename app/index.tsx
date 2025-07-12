"use client"

import React from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Dimensions } from "react-native"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card, Searchbar } from "react-native-paper"

const { width } = Dimensions.get("window")

const services = [
  {
    id: "pharmacies",
    name: "Pharmacies",
    icon: "medical",
    color: "#2563eb",
    description: "Licensed pharmacies with prescription medications",
  },
  {
    id: "opticians",
    name: "Opticians",
    icon: "eye",
    color: "#64748b",
    description: "Professional eye care and quality eyewear",
  },
  {
    id: "dentists",
    name: "Dentists",
    icon: "happy",
    color: "#2563eb",
    description: "Comprehensive dental care for healthy smiles",
  },
  {
    id: "gyms",
    name: "Gyms & Fitness",
    icon: "fitness",
    color: "#64748b",
    description: "Modern fitness facilities and training",
  },
  {
    id: "skincare",
    name: "Skincare",
    icon: "sparkles",
    color: "#2563eb",
    description: "Premium skincare products and treatments",
  },
  {
    id: "emergency",
    name: "Emergency",
    icon: "medical-sharp",
    color: "#dc2626",
    description: "24/7 emergency healthcare contacts",
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleServicePress = (serviceId: string) => {
    if (serviceId === "emergency") {
      router.push("/emergency")
    } else {
      router.push(`/search?category=${serviceId}`)
    }
  }

  const handleSubscribe = () => {
    router.push("/register")
  }

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`)
  }

  const handleEmail = () => {
    Linking.openURL("mailto:healthhubconnect071@gmail.com")
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <Ionicons name="medical" size={60} color="#fff" />
          <Text style={styles.heroTitle}>Blantyre Health Hub</Text>
          <Text style={styles.heroSubtitle}>Your Complete Health Directory</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search by area (e.g., City Centre, Limbe...)"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onSubmitEditing={handleSearch}
            style={styles.searchBar}
            iconColor="#2563eb"
          />
        </View>

        <View style={styles.heroStats}>
          <View style={styles.statItem}>
            <Ionicons name="location" size={16} color="#fff" />
            <Text style={styles.statText}>Blantyre, Malawi</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={16} color="#fff" />
            <Text style={styles.statText}>24/7 Access</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color="#fff" />
            <Text style={styles.statText}>Verified Providers</Text>
          </View>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Services</Text>
        <Text style={styles.sectionSubtitle}>Find trusted healthcare providers across Blantyre</Text>

        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, { borderLeftColor: service.color }]}
              onPress={() => handleServicePress(service.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color + "20" }]}>
                <Ionicons name={service.icon as any} size={32} color={service.color} />
              </View>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Providers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Providers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.providersScroll}>
          {[
            { name: "Central Pharmacy", type: "Pharmacy", rating: 4.8, location: "City Centre" },
            { name: "Vision Care Opticians", type: "Optician", rating: 4.9, location: "Limbe" },
            { name: "Smile Dental Clinic", type: "Dentist", rating: 4.7, location: "Mandala" },
          ].map((provider, index) => (
            <Card key={index} style={styles.providerCard}>
              <Card.Content>
                <View style={styles.providerHeader}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text style={styles.ratingText}>{provider.rating}</Text>
                  </View>
                </View>
                <Text style={styles.providerType}>{provider.type}</Text>
                <View style={styles.providerLocation}>
                  <Ionicons name="location-outline" size={14} color="#64748b" />
                  <Text style={styles.locationText}>{provider.location}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#dc2626" }]}
            onPress={() => handleCall("997")}
          >
            <Ionicons name="call" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Emergency 997</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#2563eb" }]} onPress={handleSubscribe}>
            <Ionicons name="mail" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Card style={styles.contactCard}>
          <Card.Content>
            <TouchableOpacity style={styles.contactItem} onPress={() => handleCall("+265897976524")}>
              <Ionicons name="call" size={20} color="#2563eb" />
              <Text style={styles.contactText}>+265 897976524</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
              <Ionicons name="mail" size={20} color="#2563eb" />
              <Text style={styles.contactText}>healthhubconnect071@gmail.com</Text>
            </TouchableOpacity>

            <View style={styles.contactItem}>
              <Ionicons name="globe" size={20} color="#2563eb" />
              <Text style={styles.contactText}>www.healthhubconnectMW.com</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Blantyre Health Hub. All rights reserved.</Text>
        <Text style={styles.footerSubtext}>Serving Blantyre, Malawi</Text>
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
    backgroundColor: "#2563eb",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#bfdbfe",
    marginTop: 5,
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#fff",
    elevation: 4,
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    color: "#bfdbfe",
    fontSize: 12,
    marginLeft: 4,
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
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  providersScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  providerCard: {
    width: 200,
    marginRight: 12,
    backgroundColor: "#fff",
  },
  providerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  providerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 2,
  },
  providerType: {
    fontSize: 12,
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  providerLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#6b7280",
    marginLeft: 4,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contactCard: {
    backgroundColor: "#fff",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: "#111827",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#1f2937",
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 12,
    textAlign: "center",
  },
  footerSubtext: {
    color: "#6b7280",
    fontSize: 10,
    marginTop: 4,
  },
})
