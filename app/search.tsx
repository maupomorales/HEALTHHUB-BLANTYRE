"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet, Linking, FlatList } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Searchbar, Card, Button, Chip, ActivityIndicator } from "react-native-paper"

// Sample data - in a real app, this would come from an API
const serviceData = {
  Blantyre: {
    pharmacies: [
      {
        name: "Central Pharmacy Blantyre",
        rating: 4.8,
        address: "Victoria Avenue",
        phone: "+265 1 620 123",
        hours: "24/7",
        services: ["Prescription", "OTC", "Consultation", "Emergency"],
      },
    ],
    opticians: [
      {
        name: "Vision Care Blantyre",
        rating: 4.9,
        address: "Victoria Avenue",
        phone: "+265 1 622 345",
        hours: "8AM-6PM",
        services: ["Eye Exams", "Glasses", "Contact Lenses"],
      },
    ],
  },
  Nancholi: {
    opticians: [
      {
        name: "Pilirani Judo - Optometrist",
        rating: 4.7,
        address: "Nancholi Trading Center",
        phone: "+265 997 813 198",
        hours: "Mon-Fri: 8AM-5PM, Weekends: 8AM-1PM",
        services: ["Eye Exams", "Contact Lenses", "Glasses", "Professional Eye Care"],
      },
    ],
  },
}

const categories = [
  { id: "all", name: "All Services", icon: "search" },
  { id: "pharmacies", name: "Pharmacies", icon: "medical" },
  { id: "dentists", name: "Dentists", icon: "happy" },
  { id: "opticians", name: "Opticians", icon: "eye" },
  { id: "gyms", name: "Gyms", icon: "fitness" },
  { id: "skincare", name: "Skincare", icon: "sparkles" },
]

export default function SearchPage() {
  const params = useLocalSearchParams()
  const [searchQuery, setSearchQuery] = useState((params.q as string) || "")
  const [selectedCategory, setSelectedCategory] = useState((params.category as string) || "all")
  const [results, setResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchQuery) {
      handleSearch()
    }
  }, [searchQuery, selectedCategory])

  const handleSearch = () => {
    setIsLoading(true)

    setTimeout(() => {
      const matchedAreas = Object.keys(serviceData).filter((area) =>
        area.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      if (matchedAreas.length > 0) {
        const searchResults: any = {}
        matchedAreas.forEach((area) => {
          searchResults[area] = serviceData[area as keyof typeof serviceData]
        })
        setResults(searchResults)
      } else {
        setResults({})
      }
      setIsLoading(false)
    }, 500)
  }

  const getFilteredResults = (areaData: any) => {
    if (selectedCategory === "all") {
      return areaData
    }
    return { [selectedCategory]: areaData[selectedCategory] || [] }
  }

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`)
  }

  const handleViewDetails = (serviceName: string) => {
    if (serviceName === "Pilirani Judo - Optometrist") {
      router.push("/provider/pilirani-judo")
    } else {
      alert("Provider details coming soon!")
    }
  }

  const renderServiceCard = ({ item: service, area, category }: any) => (
    <Card style={styles.serviceCard} key={`${area}-${category}-${service.name}`}>
      <Card.Content>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <View style={styles.serviceLocation}>
              <Ionicons name="location-outline" size={14} color="#6b7280" />
              <Text style={styles.locationText}>{service.address}</Text>
            </View>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text style={styles.ratingText}>{service.rating}</Text>
          </View>
        </View>

        <View style={styles.serviceDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="call" size={16} color="#2563eb" />
            <Text style={styles.detailText}>{service.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={16} color="#2563eb" />
            <Text style={styles.detailText}>{service.hours}</Text>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.servicesLabel}>Services:</Text>
          <View style={styles.serviceChips}>
            {service.services.map((svc: string, idx: number) => (
              <Chip key={idx} compact style={styles.serviceChip}>
                {svc}
              </Chip>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={() => handleCall(service.phone)}
            style={styles.callButton}
            icon="call"
            compact
          >
            Call
          </Button>
          <Button mode="outlined" onPress={() => handleViewDetails(service.name)} style={styles.detailsButton} compact>
            View Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  )

  const renderResults = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Searching for healthcare services...</Text>
        </View>
      )
    }

    if (Object.keys(results).length === 0) {
      if (searchQuery) {
        return (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search" size={64} color="#d1d5db" />
            <Text style={styles.noResultsTitle}>No results found</Text>
            <Text style={styles.noResultsText}>We couldn't find any healthcare services in "{searchQuery}".</Text>
            <Text style={styles.suggestionText}>
              Try searching for areas like: Blantyre, Limbe, Chichiri, Mandala, Ndirande
            </Text>
          </View>
        )
      }
      return null
    }

    const allServices: any[] = []
    Object.entries(results).forEach(([area, areaData]: [string, any]) => {
      const filteredData = getFilteredResults(areaData)
      Object.entries(filteredData).forEach(([category, services]: [string, any]) => {
        if (Array.isArray(services)) {
          services.forEach((service) => {
            allServices.push({ ...service, area, category })
          })
        }
      })
    })

    return (
      <FlatList
        data={allServices}
        renderItem={({ item }) => renderServiceCard({ item, area: item.area, category: item.category })}
        keyExtractor={(item, index) => `${item.area}-${item.category}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsList}
      />
    )
  }

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <Searchbar
          placeholder="Enter area name (e.g., Blantyre, Limbe, Chichiri...)"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
        />
      </View>

      {/* Category Filter */}
      {Object.keys(results).length > 0 && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by category:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                selected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={[styles.categoryChip, selectedCategory === category.id && styles.selectedCategoryChip]}
                textStyle={[
                  styles.categoryChipText,
                  selectedCategory === category.id && styles.selectedCategoryChipText,
                ]}
                icon={category.icon}
              >
                {category.name}
              </Chip>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Results */}
      <View style={styles.resultsContainer}>{renderResults()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  searchHeader: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  searchBar: {
    backgroundColor: "#f9fafb",
  },
  filterContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  categoriesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: "#f3f4f6",
  },
  selectedCategoryChip: {
    backgroundColor: "#2563eb",
  },
  categoryChipText: {
    color: "#374151",
  },
  selectedCategoryChipText: {
    color: "#fff",
  },
  resultsContainer: {
    flex: 1,
  },
  resultsList: {
    padding: 16,
  },
  serviceCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  serviceLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
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
  serviceDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
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
  serviceChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  serviceChip: {
    backgroundColor: "#eff6ff",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  callButton: {
    flex: 1,
    backgroundColor: "#2563eb",
  },
  detailsButton: {
    flex: 1,
    borderColor: "#2563eb",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  suggestionText: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
})
