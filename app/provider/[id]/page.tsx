"use client"

import { MapPin, Phone, Clock, Star, Heart, Eye, Stethoscope, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { notFound } from "next/navigation"

// Provider data
const providers = {
  1: {
    id: 1,
    name: "Dr. Sarah Banda",
    specialty: "General Practitioner",
    location: "Limbe",
    address: "123 Independence Drive, Limbe, Blantyre",
    phone: "+265 1 640 411",
    email: "dr.banda@healthcenter.mw",
    hours: "Monday-Friday: 8:00 AM - 5:00 PM",
    rating: 4.8,
    reviews: 124,
    description:
      "Dr. Sarah Banda is an experienced family doctor with over 12 years of practice in Blantyre. She provides comprehensive primary care services including preventive care, chronic disease management, and health screenings.",
    services: [
      "General Health Checkups",
      "Chronic Disease Management",
      "Preventive Care",
      "Health Screenings",
      "Vaccinations",
      "Minor Procedures",
    ],
    education: ["MD - University of Malawi College of Medicine", "Residency - Kamuzu Central Hospital"],
    languages: ["English", "Chichewa"],
    insurance: ["National Health Insurance", "Private Insurance", "Cash Payment"],
  },
  6: {
    id: 6,
    name: "Pilirani Judo",
    specialty: "Optometrist",
    location: "Blantyre City Center",
    address: "456 Victoria Avenue, Blantyre City Center",
    phone: "+265 999 123 456",
    email: "pilirani.judo@eyecare.mw",
    hours: "Monday-Friday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 2:00 PM",
    rating: 4.9,
    reviews: 67,
    description:
      "Pilirani Judo is a certified optometrist specializing in comprehensive eye care services. With state-of-the-art equipment and years of experience, Pilirani provides thorough eye examinations, contact lens fittings, and vision therapy for patients of all ages.",
    services: [
      "Comprehensive Eye Exams",
      "Contact Lens Fittings",
      "Vision Therapy",
      "Glaucoma Screening",
      "Diabetic Eye Exams",
      "Pediatric Eye Care",
      "Low Vision Rehabilitation",
      "Eye Infection Treatment",
    ],
    education: ["Doctor of Optometry - University of Cape Town", "Specialized Training in Pediatric Optometry"],
    languages: ["English", "Chichewa", "Tumbuka"],
    insurance: ["National Health Insurance", "Private Insurance", "Cash Payment", "Medical Aid Schemes"],
  },
}

export default function ProviderPage({ params }: { params: { id: string } }) {
  const providerId = Number.parseInt(params.id)
  const provider = providers[providerId as keyof typeof providers]

  if (!provider) {
    notFound()
  }

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case "optometrist":
      case "ophthalmology":
        return <Eye className="h-6 w-6" />
      case "general practitioner":
        return <Stethoscope className="h-6 w-6" />
      default:
        return <Heart className="h-6 w-6" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                {getSpecialtyIcon(provider.specialty)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Provider Details</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
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
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/search" className="hover:text-blue-600">
                Search
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{provider.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl text-blue-600 mb-2">{provider.name}</CardTitle>
                    <CardDescription className="text-xl font-medium text-gray-700 mb-4">
                      {provider.specialty}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-lg">{provider.rating}</span>
                        <span className="ml-1">({provider.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    {getSpecialtyIcon(provider.specialty)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{provider.description}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {provider.services.map((service, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education & Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Education & Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {provider.education.map((edu, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{edu}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{provider.location}</p>
                    <p className="text-sm text-gray-600">{provider.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{provider.phone}</p>
                    <p className="text-sm text-gray-600">Primary Contact</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Office Hours</p>
                    <p className="text-sm text-gray-600">{provider.hours}</p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button className="w-full" onClick={() => window.open(`tel:${provider.phone}`)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() =>
                      window.open(`https://maps.google.com/search/${encodeURIComponent(provider.address)}`)
                    }
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Languages Spoken</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((lang, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Insurance Accepted</h4>
                  <div className="space-y-1">
                    {provider.insurance.map((ins, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {ins}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Note */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-800">
                      <strong>Emergency:</strong> For life-threatening emergencies, call 997 immediately instead of
                      contacting the provider directly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Search */}
        <div className="mt-8 text-center">
          <Link href="/search">
            <Button variant="outline">← Back to Search Results</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
