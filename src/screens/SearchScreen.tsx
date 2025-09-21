import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Card, Button, Badge, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import analytics from '../services/analytics';
import errorHandler from '../services/errorHandler';
import offlineStorage from '../services/offlineStorage';

// Service data (same as web version)
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
      {
        name: "MediCare Pharmacy",
        rating: 4.6,
        address: "Glyn Jones Road",
        phone: "+265 1 620 456",
        hours: "7AM-10PM",
        services: ["Prescription", "Medical Supplies", "Health Screening"],
      },
    ],
    dentists: [
      {
        name: "Blantyre Dental Clinic",
        rating: 4.7,
        address: "Henderson Street",
        phone: "+265 1 621 789",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Cleaning", "Orthodontics"],
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
    gyms: [
      {
        name: "City Fitness Center",
        rating: 4.4,
        address: "Masauko Chipembere Highway",
        phone: "+265 1 623 678",
        hours: "5AM-10PM",
        services: ["Cardio", "Weights", "Classes"],
      },
    ],
    skincare: [
      {
        name: "Glow Beauty Center",
        rating: 4.6,
        address: "Victoria Avenue",
        phone: "+265 1 624 901",
        hours: "9AM-7PM",
        services: ["Facials", "Products", "Treatments"],
      },
    ],
  },
  Limbe: {
    pharmacies: [
      {
        name: "HealthPlus Pharmacy",
        rating: 4.5,
        address: "Masauko Chipembere Highway",
        phone: "+265 1 640 234",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Consultation"],
      },
      {
        name: "Limbe Medical Supplies",
        rating: 4.3,
        address: "Kamuzu Road",
        phone: "+265 1 640 567",
        hours: "8AM-8PM",
        services: ["Medical Equipment", "Prescription"],
      },
    ],
    dentists: [
      {
        name: "Limbe Dental Care",
        rating: 4.6,
        address: "Kamuzu Road",
        phone: "+265 1 641 890",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Clear Vision Limbe",
        rating: 4.4,
        address: "Masauko Chipembere Highway",
        phone: "+265 1 642 123",
        hours: "8AM-6PM",
        services: ["Eye Tests", "Prescription Glasses"],
      },
    ],
    gyms: [
      {
        name: "FitLife Gym Limbe",
        rating: 4.6,
        address: "Industrial Area",
        phone: "+265 1 643 456",
        hours: "5AM-10PM",
        services: ["Personal Training", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Beauty Essence Limbe",
        rating: 4.8,
        address: "Kamuzu Road",
        phone: "+265 1 644 789",
        hours: "9AM-7PM",
        services: ["Skincare Products", "Beauty Treatments"],
      },
    ],
  },
  Chichiri: {
    pharmacies: [
      {
        name: "Chichiri Pharmacy",
        rating: 4.4,
        address: "Chichiri Shopping Center",
        phone: "+265 1 650 012",
        hours: "8AM-8PM",
        services: ["Prescription", "OTC Medicines"],
      },
    ],
    dentists: [
      {
        name: "Chichiri Dental Clinic",
        rating: 4.5,
        address: "Chichiri Trade Fair Grounds",
        phone: "+265 1 651 345",
        hours: "8AM-5PM",
        services: ["General Dentistry", "Teeth Whitening"],
      },
    ],
    opticians: [
      {
        name: "Specs Appeal Chichiri",
        rating: 4.3,
        address: "Chichiri Shopping Center",
        phone: "+265 1 652 678",
        hours: "9AM-6PM",
        services: ["Eye Exams", "Designer Frames"],
      },
    ],
    gyms: [
      {
        name: "PowerHouse Gym",
        rating: 4.7,
        address: "Chichiri Industrial Area",
        phone: "+265 1 653 901",
        hours: "5AM-11PM",
        services: ["Modern Equipment", "Nutrition Guidance"],
      },
    ],
    skincare: [
      {
        name: "Radiant Skin Chichiri",
        rating: 4.5,
        address: "Chichiri Shopping Center",
        phone: "+265 1 654 234",
        hours: "9AM-6PM",
        services: ["Anti-aging", "Acne Treatment"],
      },
    ],
  },
  Mandala: {
    pharmacies: [
      {
        name: "Mandala Health Pharmacy",
        rating: 4.6,
        address: "Mandala Road",
        phone: "+265 1 660 567",
        hours: "7AM-9PM",
        services: ["Prescription", "Health Screening"],
      },
    ],
    dentists: [
      {
        name: "Mandala Dental Practice",
        rating: 4.8,
        address: "Mandala Heights",
        phone: "+265 1 661 890",
        hours: "8AM-6PM",
        services: ["Orthodontics", "Oral Surgery"],
      },
    ],
    opticians: [
      {
        name: "Eye Care Mandala",
        rating: 4.6,
        address: "Mandala Road",
        phone: "+265 1 662 123",
        hours: "8AM-5PM",
        services: ["Comprehensive Eye Care", "Contact Lenses"],
      },
    ],
    gyms: [
      {
        name: "Elite Fitness Mandala",
        rating: 4.5,
        address: "Mandala Heights",
        phone: "+265 1 663 456",
        hours: "6AM-10PM",
        services: ["Premium Equipment", "Personal Training"],
      },
    ],
    skincare: [
      {
        name: "Luxe Beauty Mandala",
        rating: 4.7,
        address: "Mandala Road",
        phone: "+265 1 664 789",
        hours: "10AM-8PM",
        services: ["Luxury Treatments", "Premium Products"],
      },
    ],
  },
  Ndirande: {
    pharmacies: [
      {
        name: "Community Pharmacy Ndirande",
        rating: 4.2,
        address: "Ndirande Market",
        phone: "+265 1 670 012",
        hours: "7AM-8PM",
        services: ["Affordable Medicines", "Health Advice"],
      },
      {
        name: "Ndirande Health Pharmacy",
        rating: 4.1,
        address: "Ndirande Township",
        phone: "+265 1 670 345",
        hours: "8AM-7PM",
        services: ["Prescription", "Basic Consultation"],
      },
    ],
    dentists: [
      {
        name: "Ndirande Dental Clinic",
        rating: 4.3,
        address: "Ndirande Township",
        phone: "+265 1 671 345",
        hours: "8AM-5PM",
        services: ["Basic Dentistry", "Emergency Care"],
      },
    ],
    opticians: [
      {
        name: "Affordable Vision Ndirande",
        rating: 4.1,
        address: "Ndirande Market",
        phone: "+265 1 672 678",
        hours: "8AM-6PM",
        services: ["Budget Glasses", "Eye Tests"],
      },
    ],
    gyms: [
      {
        name: "Community Fitness Ndirande",
        rating: 4.0,
        address: "Ndirande Community Center",
        phone: "+265 1 673 901",
        hours: "6AM-9PM",
        services: ["Basic Equipment", "Group Classes"],
      },
    ],
    skincare: [
      {
        name: "Natural Beauty Ndirande",
        rating: 4.2,
        address: "Ndirande Market",
        phone: "+265 1 674 234",
        hours: "9AM-6PM",
        services: ["Natural Products", "Basic Treatments"],
      },
    ],
  },
};

const categories = [
  { id: "all", name: "All Services", icon: "search", color: "#2563eb" },
  { id: "pharmacies", name: "Pharmacies", icon: "local-pharmacy", color: "#2563eb" },
  { id: "dentists", name: "Dentists", icon: "mood", color: "#2563eb" },
  { id: "opticians", name: "Opticians", icon: "visibility", color: "#64748b" },
  { id: "gyms", name: "Gyms & Fitness", icon: "fitness-center", color: "#64748b" },
  { id: "skincare", name: "Skincare", icon: "auto-awesome", color: "#2563eb" },
];

interface Service {
  name: string;
  rating: number;
  address: string;
  phone: string;
  hours: string;
  services: string[];
}

interface AreaData {
  pharmacies?: Service[];
  dentists?: Service[];
  opticians?: Service[];
  gyms?: Service[];
  skincare?: Service[];
  [key: string]: Service[] | undefined;
}

type ServiceData = Record<string, AreaData>;

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [results, setResults] = useState<ServiceData>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Track screen view
    analytics.trackScreenView('SearchScreen', 'SearchScreen');
  }, []);

  const handlePhoneCall = async (phone: string) => {
    try {
      await Linking.openURL(`tel:${phone}`);
      await analytics.trackContactAction('Search Result', 'call');
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'SearchScreen',
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
        component: 'SearchScreen',
        action: 'WHATSAPP_MESSAGE',
      });
    }
  };

  const handleSearch = useCallback(async () => {
    setIsLoading(true);

    try {
      // Check cache first
      const cachedResults = await offlineStorage.getCachedHealthcareProviders(searchQuery);
      if (cachedResults) {
        setResults({ [searchQuery]: cachedResults });
        setIsLoading(false);
        await analytics.trackSearch(searchQuery, cachedResults.length);
        return;
      }

      // Simulate API call delay
      setTimeout(async () => {
        try {
          const matchedAreas = Object.keys(serviceData).filter((area) =>
            area.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (matchedAreas.length > 0) {
            const searchResults: ServiceData = {};
            matchedAreas.forEach((area) => {
              searchResults[area] = serviceData[area as keyof typeof serviceData];
            });
            setResults(searchResults);
            
            // Cache the results
            await offlineStorage.cacheHealthcareProviders(
              Object.values(searchResults).flat(),
              searchQuery
            );
            
            await analytics.trackSearch(searchQuery, Object.values(searchResults).flat().length);
          } else {
            setResults({});
            await analytics.trackSearch(searchQuery, 0);
          }
        } catch (error) {
          errorHandler.handleError(error as Error, {
            component: 'SearchScreen',
            action: 'SEARCH',
          });
        } finally {
          setIsLoading(false);
        }
      }, 500);
    } catch (error) {
      errorHandler.handleError(error as Error, {
        component: 'SearchScreen',
        action: 'SEARCH_INITIALIZATION',
      });
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery, selectedCategory, handleSearch]);

  const getFilteredResults = (areaData: AreaData) => {
    if (selectedCategory === "all") {
      return areaData;
    }
    return { [selectedCategory]: areaData[selectedCategory] || [] };
  };

  const getTotalCount = () => {
    let total = 0;
    Object.values(results).forEach((areaData: AreaData) => {
      const filtered = getFilteredResults(areaData);
      Object.values(filtered).forEach((services: Service[] | undefined) => {
        if (Array.isArray(services)) {
          total += services.length;
        }
      });
    });
    return total;
  };

  const popularAreas = [
    "Blantyre", "Limbe", "Chichiri", "Mandala", "Ndirande", "Chilomoni", "Mount Pleasant", "Sunnyside"
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <Text style={styles.title}>Find Healthcare Services</Text>
        <Text style={styles.subtitle}>Search by area to find trusted healthcare providers near you</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter area name (e.g., Blantyre, Limbe, Chichiri...)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={isLoading}
          >
            <Icon name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Category Filter */}
        {Object.keys(results).length > 0 && (
          <View style={styles.filterSection}>
            <View style={styles.filterHeader}>
              <Icon name="filter-list" size={20} color="#64748b" />
              <Text style={styles.filterLabel}>Filter by category:</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  selected={selectedCategory === category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.id && { backgroundColor: category.color }
                  ]}
                  textStyle={[
                    styles.categoryChipText,
                    selectedCategory === category.id && { color: '#ffffff' }
                  ]}
                  icon={() => <Icon name={category.icon} size={16} color={selectedCategory === category.id ? '#ffffff' : category.color} />}
                >
                  {category.name}
                </Chip>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Results Section */}
      <View style={styles.resultsSection}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Icon name="refresh" size={48} color="#2563eb" style={styles.loadingIcon} />
            <Text style={styles.loadingText}>Searching for healthcare services...</Text>
          </View>
        ) : Object.keys(results).length > 0 ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Search Results for "{searchQuery}"</Text>
              <Text style={styles.resultsCount}>
                Found {getTotalCount()} healthcare {getTotalCount() === 1 ? "provider" : "providers"} in{" "}
                {Object.keys(results).length} {Object.keys(results).length === 1 ? "area" : "areas"}
              </Text>
            </View>

            {Object.entries(results).map(([area, areaData]: [string, AreaData]) => {
              const filteredData = getFilteredResults(areaData);
              const hasResults = Object.values(filteredData).some(
                (services: Service[] | undefined) => Array.isArray(services) && services.length > 0
              );

              if (!hasResults) return null;

              return (
                <View key={area} style={styles.areaSection}>
                  <View style={styles.areaHeader}>
                    <Icon name="location-on" size={24} color="#2563eb" />
                    <Text style={styles.areaTitle}>{area}</Text>
                  </View>

                  {Object.entries(filteredData).map(([category, services]: [string, Service[] | undefined]) => {
                    if (!Array.isArray(services) || services.length === 0) return null;

                    const categoryInfo = categories.find((cat) => cat.id === category);

                    return (
                      <View key={category} style={styles.categorySection}>
                        <View style={styles.categoryHeader}>
                          <View style={[styles.categoryIcon, { backgroundColor: categoryInfo?.color + '20' }]}>
                            <Icon name={categoryInfo?.icon || "search"} size={20} color={categoryInfo?.color || "#64748b"} />
                          </View>
                          <Text style={styles.categoryTitle}>
                            {categoryInfo?.name || category}
                          </Text>
                          <Badge style={styles.categoryBadge}>{services.length}</Badge>
                        </View>

                        <View style={styles.servicesList}>
                          {services.map((service: Service, index: number) => (
                            <Card key={index} style={styles.serviceCard} elevation={2}>
                              <Card.Content style={styles.serviceCardContent}>
                                <View style={styles.serviceHeader}>
                                  <View style={styles.serviceInfo}>
                                    <Text style={styles.serviceName}>{service.name}</Text>
                                    <View style={styles.serviceLocation}>
                                      <Icon name="location-on" size={12} color="#64748b" />
                                      <Text style={styles.serviceAddress}>{service.address}</Text>
                                    </View>
                                  </View>
                                  <View style={styles.ratingContainer}>
                                    <Icon name="star" size={16} color="#fbbf24" />
                                    <Text style={styles.rating}>{service.rating}</Text>
                                  </View>
                                </View>

                                <View style={styles.serviceDetails}>
                                  <View style={styles.serviceDetailItem}>
                                    <Icon name="phone" size={16} color="#2563eb" />
                                    <Text style={styles.serviceDetailText}>{service.phone}</Text>
                                  </View>
                                  <View style={styles.serviceDetailItem}>
                                    <Icon name="access-time" size={16} color="#2563eb" />
                                    <Text style={styles.serviceDetailText}>{service.hours}</Text>
                                  </View>
                                </View>

                                <View style={styles.serviceTags}>
                                  {service.services.slice(0, 3).map((svc: string, idx: number) => (
                                    <Badge key={idx} style={styles.serviceTag} variant="outline">
                                      {svc}
                                    </Badge>
                                  ))}
                                </View>

                                <View style={styles.serviceActions}>
                                  <Button
                                    mode="contained"
                                    style={[styles.actionButton, { backgroundColor: '#2563eb' }]}
                                    onPress={() => handlePhoneCall(service.phone)}
                                    compact
                                  >
                                    <Icon name="phone" size={16} color="#ffffff" />
                                    <Text style={styles.actionButtonText}> Call</Text>
                                  </Button>
                                  <Button
                                    mode="contained"
                                    style={[styles.actionButton, { backgroundColor: '#16a34a' }]}
                                    onPress={() => handleWhatsApp(service.phone, service.name)}
                                    compact
                                  >
                                    <Icon name="message" size={16} color="#ffffff" />
                                    <Text style={styles.actionButtonText}> WhatsApp</Text>
                                  </Button>
                                  <Button
                                    mode="outlined"
                                    style={styles.actionButton}
                                    onPress={() => {
                                      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.name + ' ' + service.address)}`;
                                      Linking.openURL(mapUrl);
                                    }}
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
                    );
                  })}
                </View>
              );
            })}
          </>
        ) : searchQuery ? (
          <View style={styles.noResultsContainer}>
            <Icon name="search-off" size={96} color="#9ca3af" />
            <Text style={styles.noResultsTitle}>No results found</Text>
            <Text style={styles.noResultsText}>
              We couldn't find any healthcare services in "{searchQuery}".
            </Text>
            <Text style={styles.noResultsHint}>
              Try searching for areas like: Blantyre, Limbe, Chichiri, Mandala, Ndirande, Chilomoni, or Mount Pleasant
            </Text>
            <Button
              mode="outlined"
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              Clear Search
            </Button>
          </View>
        ) : (
          <View style={styles.startSearchContainer}>
            <Icon name="search" size={96} color="#2563eb" />
            <Text style={styles.startSearchTitle}>Start Your Search</Text>
            <Text style={styles.startSearchText}>Enter an area name above to find healthcare services near you</Text>
            <View style={styles.popularAreas}>
              {popularAreas.map((area) => (
                <Chip
                  key={area}
                  onPress={() => setSearchQuery(area)}
                  style={styles.popularAreaChip}
                  textStyle={styles.popularAreaChipText}
                >
                  {area}
                </Chip>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  searchButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterSection: {
    marginTop: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 12,
  },
  resultsSection: {
    padding: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  loadingIcon: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  resultsHeader: {
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: '#64748b',
  },
  areaSection: {
    marginBottom: 32,
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  areaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#e5e7eb',
  },
  servicesList: {
    gap: 12,
  },
  serviceCard: {
    marginBottom: 12,
  },
  serviceCardContent: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceAddress: {
    fontSize: 12,
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
  serviceDetails: {
    marginBottom: 12,
  },
  serviceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceDetailText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#64748b',
  },
  serviceTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 4,
  },
  serviceTag: {
    marginRight: 4,
    marginBottom: 4,
  },
  serviceActions: {
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
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsHint: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 24,
  },
  clearButton: {
    borderColor: '#2563eb',
  },
  startSearchContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  startSearchTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  startSearchText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  popularAreas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  popularAreaChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  popularAreaChipText: {
    fontSize: 12,
  },
});

export default SearchScreen;

