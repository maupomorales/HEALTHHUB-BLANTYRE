"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, MapPin, Star, Phone, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArea, setSelectedArea] = useState("All Areas")

  const categories = ["All", "Hospital", "Clinic", "Pharmacy", "Dental", "Lab"]
  const areas = ["All Areas", "Blantyre City", "Limbe", "Chichiri", "Mandala"]

  const providers = [
    {
      id: 1,
      name: "Blantyre Adventist Hospital",
      type: "Hospital",
      location: "Blantyre City",
      rating: 4.8,
      reviews: 245,
      phone: "+265 1 870 444",
      hours: "24/7",
      services: ["Emergency Care", "Surgery", "Maternity"],
    },
    {
      id: 2,
      name: "Limbe Leaf Pharmacy",
      type: "Pharmacy",
      location: "Limbe",
      rating: 4.6,
      reviews: 128,
      phone: "+265 1 840 222",
      hours: "8AM-8PM",
      services: ["Prescription", "OTC Medicines"],
    },
    {
      id: 3,
      name: "Chichiri Family Clinic",
      type: "Clinic",
      location: "Chichiri",
      rating: 4.7,
      reviews: 89,
      phone: "+265 999 123 456",
      hours: "8AM-5PM",
      services: ["General Practice", "Pediatrics"],
    },
  ]

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Link href="/search" className="text-blue-600 font-medium">
                Find Providers
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Find Healthcare Providers</h1>
          <p className="text-lg mb-8 text-center">Search from over 50 verified providers in Blantyre</p>

          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex gap-2">
              <Input
                placeholder="Search by name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 text-gray-900"
              />
              <Button size="lg" className="px-8">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
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
              <p className="text-sm font-medium text-gray-700 mb-2">Area</p>
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
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {filteredProviders.length} Provider{filteredProviders.length !== 1 ? "s" : ""} Found
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{provider.name}</CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {provider.location}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{provider.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-lg">{provider.rating}</span>
                      <span className="ml-1 text-gray-600">({provider.reviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {provider.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {provider.phone}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {provider.hours}
                    </div>

                    <Link href={`/provider/${provider.id}`}>
                      <Button className="w-full">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No providers found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
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
    </div>
  )
}
