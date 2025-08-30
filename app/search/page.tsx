"use client"

import { useState } from "react"
import { Search, MapPin, Phone, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Healthcare providers data
const providers = [
  {
    id: 1,
    name: "Dr. Sarah Banda",
    specialty: "General Practitioner",
    location: "Limbe",
    phone: "+265 1 640 411",
    hours: "Mon-Fri: 8AM-5PM",
    rating: 4.8,
    reviews: 124,
    description: "Experienced family doctor providing comprehensive primary care services.",
  },
  {
    id: 2,
    name: "Blantyre Adventist Hospital",
    specialty: "General Hospital",
    location: "Blantyre City",
    phone: "+265 1 870 411",
    hours: "24/7 Emergency",
    rating: 4.6,
    reviews: 89,
    description: "Full-service hospital with emergency care, surgery, and specialized departments.",
  },
  {
    id: 3,
    name: "Dr. James Phiri",
    specialty: "Pediatrician",
    location: "Chichiri",
    phone: "+265 1 671 200",
    hours: "Mon-Sat: 9AM-4PM",
    rating: 4.9,
    reviews: 156,
    description: "Specialist in children's health and development with over 15 years experience.",
  },
  {
    id: 4,
    name: "Malawi Eye Care Centre",
    specialty: "Ophthalmology",
    location: "Mandala",
    phone: "+265 1 820 344",
    hours: "Mon-Fri: 8AM-5PM",
    rating: 4.7,
    reviews: 78,
    description: "Comprehensive eye care services including surgery and vision correction.",
  },
  {
    id: 5,
    name: "Dr. Grace Mwale",
    specialty: "Gynecologist",
    location: "Limbe",
    phone: "+265 1 640 500",
    hours: "Mon-Fri: 9AM-4PM",
    rating: 4.8,
    reviews: 92,
    description: "Women's health specialist providing prenatal care and gynecological services.",
  },
  {
    id: 6,
    name: "Pilirani Judo",
    specialty: "Optometrist",
    location: "Blantyre City Center",
    phone: "+265 999 123 456",
    hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
    rating: 4.9,
    reviews: 67,
    description:
      "Professional eye care services including comprehensive eye exams, contact lens fittings, and vision therapy.",
  },
]

const areas = ["Blantyre City", "Limbe", "Chichiri", "Mandala", "Nyambadwe", "Soche", "Ginnery Corner", "Chirimba"]

const specialties = [
  "General Practitioner",
  "Pediatrician",
  "Gynecologist",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Ophthalmology",
  "Dentist",
  "Psychiatrist",
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = !selectedArea || provider.location === selectedArea
    const matchesSpecialty = !selectedSpecialty || provider.specialty === selectedSpecialty

    return matchesSearch && matchesArea && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Find Healthcare Providers</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/search" className="text-blue-600 font-medium">
                Find Providers
              </Link>
              <Link href="/emergency" className="text-gray-700 hover:text-blue-600 font-medium">
                Emergency
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Healthcare Providers</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search by name or specialty</label>
              <Input
                type="text"
                placeholder="e.g., Dr. Smith or Cardiologist"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Areas</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              {filteredProviders.length} Provider{filteredProviders.length !== 1 ? "s" : ""} Found
            </h3>
          </div>

          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-blue-600">{provider.name}</CardTitle>
                    <CardDescription className="text-lg font-medium text-gray-700">
                      {provider.specialty}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-gray-500">({provider.reviews} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{provider.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {provider.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {provider.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {provider.hours}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link href={`/provider/${provider.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                  <Button>Contact Provider</Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredProviders.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse all providers.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
