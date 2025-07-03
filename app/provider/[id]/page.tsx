"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Clock,
  Eye,
  Star,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle,
  User,
  Stethoscope,
  Shield,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Provider data - in a real app, this would come from a database
const providerData: { [key: string]: any } = {
  "pilirani-judo": {
    id: "pilirani-judo",
    name: "Dr. Pilirani Judo",
    title: "Optometrist/Optician",
    clinicName: "Crystal Clear Vision Center",
    category: "Optometry & Vision Care",
    rating: 4.7,
    reviewCount: 28,
    phone: "+265997813198",
    whatsapp: "+265997813198",
    address: "Nancholi CI, Blantyre City",
    area: "Nancholi",
    hours: {
      weekdays: "Monday - Friday: 08:00 AM - 5:00 PM",
      weekends: "Saturday - Sunday: 08:00 AM - 1:00 PM",
      emergency: "Available for emergency consultations by appointment",
    },
    services: {
      comprehensive: [
        "Complete eye examinations and vision assessments",
        "Prescription eyewear consultation and fitting",
        "Contact lens fitting and training",
        "Vision correction solutions",
        "Eye health screenings",
      ],
      specialized: [
        "Prescription glasses (single vision, progressive, bifocals)",
        "Contact lens services (soft, hard, specialty lenses)",
        "Frame selection and styling consultation",
        "Lens replacement and repairs",
      ],
    },
    motto: "Your vision is our priority - providing quality eye care with professional excellence.",
    qualifications: ["Licensed Optometrist", "Vision Care Specialist", "Contact Lens Fitting Certified"],
    languages: ["English", "Chichewa"],
    experience: "5+ years",
    specialties: ["Vision Correction", "Eye Health", "Contact Lenses", "Prescription Eyewear"],
  },
}

export default function ProviderPage() {
  const params = useParams()
  const providerId = params?.id as string
  const provider = providerData[providerId]

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h1>
          <Link href="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Function to handle phone calls
  const handleCall = () => {
    window.location.href = `tel:${provider.phone}`
  }

  // Function to handle WhatsApp chat (general)
  const handleWhatsApp = () => {
    const phoneNumber = provider.whatsapp.replace(/[^0-9]/g, "")
    const message = encodeURIComponent(
      `Hello Dr. ${provider.name.split(" ").pop()}, I found your contact through Blantyre Health Hub. I would like to inquire about your eye care services.`,
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  // Function to handle appointment booking via WhatsApp
  const handleBookAppointment = () => {
    const phoneNumber = provider.whatsapp.replace(/[^0-9]/g, "")
    const message = encodeURIComponent("I want to book an appointment")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Health Hub MW Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blantyre Health Hub</h1>
              <p className="text-xs text-gray-600">Provider Profile</p>
            </div>
          </Link>
          <Link href="/search">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>
      </header>

      {/* Provider Profile */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Provider Header */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Profile Image Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-slate-700 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-white" />
                  </div>
                </div>

                {/* Provider Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{provider.name}</h1>
                      <p className="text-xl text-blue-600 font-medium mb-2">{provider.title}</p>
                      <p className="text-lg text-gray-700 mb-4">{provider.clinicName}</p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="text-lg font-semibold ml-1">{provider.rating}</span>
                          <span className="text-gray-600 ml-2">({provider.reviewCount} reviews)</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {provider.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{provider.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          <span>{provider.experience} experience</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:ml-8">
                      <Button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700 text-white" size="lg">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        onClick={handleCall}
                        variant="outline"
                        size="lg"
                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 bg-transparent"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call Now
                      </Button>
                      <Button
                        onClick={handleBookAppointment}
                        variant="outline"
                        size="lg"
                        className="hover:bg-green-50 hover:text-green-600 hover:border-green-600 bg-transparent"
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  </div>

                  {/* Motto */}
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <p className="text-blue-800 font-medium italic">"{provider.motto}"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Operating Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-6 w-6 text-blue-600 mr-3" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Weekdays</span>
                      <span className="text-gray-900">{provider.hours.weekdays.split(": ")[1]}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Weekends</span>
                      <span className="text-gray-900">{provider.hours.weekends.split(": ")[1]}</span>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 mt-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-orange-800 text-sm font-medium">Emergency Services</span>
                      </div>
                      <p className="text-orange-700 text-sm mt-1">{provider.hours.emergency}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Offered */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-6 w-6 text-blue-600 mr-3" />
                    Services Offered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Comprehensive Eye Care */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Stethoscope className="h-5 w-5 text-blue-600 mr-2" />
                        Comprehensive Eye Care
                      </h4>
                      <div className="grid gap-3">
                        {provider.services.comprehensive.map((service: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialized Services */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        Specialized Services
                      </h4>
                      <div className="grid gap-3">
                        {provider.services.specialized.map((service: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-6 w-6 text-blue-600 mr-3" />
                    Areas of Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-sm py-2 px-3">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{provider.phone}</p>
                      <p className="text-sm text-gray-600">Primary Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp Available</p>
                      <p className="text-sm text-gray-600">Preferred Communication</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{provider.address}</p>
                      <p className="text-sm text-gray-600">Clinic Location</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Info */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Qualifications</h4>
                    <div className="space-y-1">
                      {provider.qualifications.map((qual: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <Award className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">{qual}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {provider.languages.map((lang: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-slate-700 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ready to Schedule?</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Book your appointment today for professional eye care services.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={handleBookAppointment}
                      variant="secondary"
                      className="w-full bg-green-600 text-white hover:bg-green-700"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button
                      onClick={handleWhatsApp}
                      variant="secondary"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message on WhatsApp
                    </Button>
                    <Button
                      onClick={handleCall}
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="Health Hub MW Logo" width={32} height={32} className="object-contain" />
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
                  <Link href="#" className="hover:text-white transition-colors">
                    Pharmacies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Opticians
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Dentists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Gyms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Skincare
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <div className="space-y-2 text-sm">
                <p className="text-red-400 font-semibold">Emergency: 997</p>
                <p className="text-gray-400">Police: 990</p>
                <p className="text-gray-400">Fire: 998</p>
                <p className="text-gray-400">Ambulance: 998</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Blantyre Health Hub. All rights reserved. | Serving Blantyre, Malawi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
