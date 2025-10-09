"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Phone, Clock, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArea, setSelectedArea] = useState("All Areas")

  const categories = ["All", "Hospital", "Clinic", "Pharmacy", "Dental", "Eye Care", "Lab"]
  const areas = ["All Areas", "Blantyre City", "Limbe", "Chichiri", "Mandala", "Chirimba", "Ndirande"]

  const providers = [
    {
      id: 1,
      name: "Blantyre Adventist Hospital",
      type: "Hospital",
      location: "Blantyre City",
      rating: 4.8,
      reviews: 245,
      phone: "+265 1 870 222",
      hours: "24/7",
      services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics"],
      distance: "2.3 km",
    },
    {
      id: 2,
      name: "Limbe Leaf Pharmacy",
      type: "Pharmacy",
      location: "Limbe",
      rating: 4.6,
      reviews: 128,
      phone: "+265 1 844 555",
      hours: "8:00 AM - 8:00 PM",
      services: ["Prescription", "OTC Medicines", "Health Consultation"],
      distance: "3.1 km",
    },
    {
      id: 3,
      name: "Chichiri Family Clinic",
      type: "Clinic",
      location: "Chichiri",
      rating: 4.7,
      reviews: 89,
      phone: "+265 1 876 333",
      hours: "8:00 AM - 6:00 PM",
      services: ["General Practice", "Pediatrics", "Vaccinations"],
      distance: "1.5 km",
    },
    {
      id: 4,
      name: "Smile Dental Care",
      type: "Dental",
      location: "Mandala",
      rating: 4.9,
      reviews: 156,
      phone: "+265 1 822 444",
      hours: "9:00 AM - 5:00 PM",
      services: ["General Dentistry", "Orthodontics", "Cosmetic"],
      distance: "2.8 km",
    },
    {
      id: 5,
      name: "Vision Plus Opticians",
      type: "Eye Care",
      location: "Blantyre City",
      rating: 4.5,
      reviews: 67,
      phone: "+265 1 820 666",
      hours: "8:30 AM - 5:30 PM",
      services: ["Eye Tests", "Glasses", "Contact Lenses"],
      distance: "2.0 km",
    },
    {
      id: 6,
      name: "HealthLab Diagnostics",
      type: "Lab",
      location: "Limbe",
      rating: 4.6,
      reviews: 94,
      phone: "+265 1 845 777",
      hours: "7:00 AM - 4:00 PM",
      services: ["Blood Tests", "X-Ray", "Ultrasound"],
      distance: "3.5 km",
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Your Trusted Healthcare Directory</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/emergency" className="text-gray-700 hover:text-blue-600 font-medium">
                Emergency
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Find Healthcare Providers</h1>
          <p className="text-lg mb-6">Search for trusted healthcare services in Blantyre</p>

          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by name or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Area</h3>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <Button
                    key={area}
                    variant={selectedArea === area ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedArea(area)}
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{filteredProviders.length} Providers Found</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{provider.type}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {provider.distance}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {provider.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{provider.rating}</span>
                        <span className="text-gray-600 ml-1">({provider.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {provider.phone}
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {provider.hours}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {provider.services.slice(0, 3).map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <Link href={`/provider/${provider.id}`}>
                        <Button className="w-full mt-4">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
