"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Phone, Clock, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArea, setSelectedArea] = useState("All Areas")

  const categories = ["All", "Hospital", "Clinic", "Pharmacy", "Dental", "Eye Care", "Gym", "Skincare"]
  const areas = ["All Areas", "Blantyre City", "Limbe", "Chichiri", "Mandala", "Nyambadwe", "Soche"]

  const providers = [
    {
      id: 1,
      name: "Blantyre Adventist Hospital",
      type: "Hospital",
      location: "Blantyre City",
      rating: 4.8,
      reviews: 245,
      phone: "+265 1 870 411",
      hours: "24/7",
      services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics"],
      image: "/modern-hospital-exterior.png",
      description: "Leading private hospital providing comprehensive healthcare services.",
    },
    {
      id: 2,
      name: "Limbe Leaf Pharmacy",
      type: "Pharmacy",
      location: "Limbe",
      rating: 4.6,
      reviews: 128,
      phone: "+265 1 640 123",
      hours: "8:00 AM - 8:00 PM",
      services: ["Prescription", "OTC Medicines", "Health Consultation", "Delivery"],
      image: "/pharmacy-interior.png",
      description: "Your trusted neighborhood pharmacy with expert pharmaceutical care.",
    },
    {
      id: 3,
      name: "Chichiri Family Clinic",
      type: "Clinic",
      location: "Chichiri",
      rating: 4.7,
      reviews: 89,
      phone: "+265 1 876 543",
      hours: "7:00 AM - 6:00 PM",
      services: ["General Practice", "Pediatrics", "Vaccinations", "Health Checkups"],
      image: "/modern-clinic-waiting-area.png",
      description: "Comprehensive family healthcare in a comfortable environment.",
    },
    {
      id: 4,
      name: "Mandala Dental Care",
      type: "Dental",
      location: "Mandala",
      rating: 4.9,
      reviews: 156,
      phone: "+265 1 822 456",
      hours: "8:00 AM - 5:00 PM",
      services: ["General Dentistry", "Orthodontics", "Teeth Cleaning", "Emergency Dental"],
      image: "/dental-clinic.png",
      description: "Modern dental care with the latest technology and techniques.",
    },
    {
      id: 5,
      name: "Vision Plus Opticians",
      type: "Eye Care",
      location: "Blantyre City",
      rating: 4.5,
      reviews: 73,
      phone: "+265 1 834 789",
      hours: "9:00 AM - 6:00 PM",
      services: ["Eye Exams", "Glasses", "Contact Lenses", "Eye Surgery Referrals"],
      image: "/optician.png",
      description: "Complete eye care services with experienced optometrists.",
    },
    {
      id: 6,
      name: "FitLife Gym Limbe",
      type: "Gym",
      location: "Limbe",
      rating: 4.4,
      reviews: 92,
      phone: "+265 1 645 321",
      hours: "5:00 AM - 10:00 PM",
      services: ["Fitness Training", "Group Classes", "Personal Training", "Nutrition Counseling"],
      image: "/gym-fitness.png",
      description: "Modern fitness facility with professional trainers and equipment.",
    },
  ]

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || provider.type === selectedCategory
    const matchesArea = selectedArea === "All Areas" || provider.location === selectedArea

    return matchesSearch && matchesCategory && matchesArea
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Health Hub Logo" width={40} height={40} className="object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Find Healthcare Providers</p>
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Healthcare Providers</h1>
            <p className="text-gray-600">Search for trusted healthcare services in Blantyre</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search providers, services, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="md:w-auto w-full">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProviders.length} Provider{filteredProviders.length !== 1 ? "s" : ""} Found
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Sort by: Relevance</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-square relative">
                      <Image
                        src={provider.image || "/placeholder.svg"}
                        alt={provider.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {provider.location}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{provider.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-semibold">{provider.rating}</span>
                          <span className="ml-1 text-gray-600 text-sm">({provider.reviews} reviews)</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{provider.description}</p>

                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {provider.phone}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {provider.hours}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.services.slice(0, 3).map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {provider.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{provider.services.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Link href={`/provider/${provider.id}`}>
                        <Button className="w-full">View Details & Contact</Button>
                      </Link>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all providers.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSelectedArea("All Areas")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="Health Hub Logo" width={32} height={32} className="object-contain" />
                <div>
                  <h3 className="text-lg font-bold">Blantyre Health Hub</h3>
                  <p className="text-xs text-gray-400">Your Health Directory</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting Blantyre residents with trusted healthcare providers and wellness services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/search" className="hover:text-white transition-colors">
                    Find Providers
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-white transition-colors">
                    Emergency Contacts
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Health Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Areas</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Blantyre City</li>
                <li>Limbe</li>
                <li>Chichiri</li>
                <li>Mandala</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <p className="text-blue-400">healthhubconnect071@gmail.com</p>
                <p className="text-gray-400">+265 897976524</p>
                <p className="text-gray-400">Blantyre, Malawi</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Blantyre Health Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
