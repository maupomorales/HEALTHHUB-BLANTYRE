"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, Star, ArrowLeft, Mail, Globe, Calendar, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function ProviderDetailPage() {
  const params = useParams()
  const id = params.id

  // Mock data - in a real app, this would come from an API
  const providers: { [key: string]: any } = {
    "1": {
      id: 1,
      name: "Blantyre Adventist Hospital",
      type: "Hospital",
      location: "Blantyre City",
      address: "Malamulo Road, Blantyre City",
      rating: 4.8,
      reviews: 245,
      phone: "+265 1 870 411",
      email: "info@adventisthospital.mw",
      website: "www.adventisthospital.mw",
      hours: "24/7",
      services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "Cardiology", "Orthopedics"],
      image: "/modern-hospital-exterior.png",
      description:
        "Blantyre Adventist Hospital is a leading private healthcare facility providing comprehensive medical services with state-of-the-art equipment and experienced medical professionals.",
      specialties: [
        "Emergency Medicine",
        "General Surgery",
        "Obstetrics & Gynecology",
        "Pediatrics",
        "Internal Medicine",
        "Cardiology",
      ],
      facilities: [
        "24/7 Emergency Department",
        "Modern Operating Theaters",
        "ICU & CCU",
        "Laboratory Services",
        "Radiology & Imaging",
        "Pharmacy",
        "Ambulance Services",
      ],
      doctors: [
        { name: "Dr. John Banda", specialty: "Cardiology", experience: "15 years" },
        { name: "Dr. Mary Phiri", specialty: "Pediatrics", experience: "12 years" },
        { name: "Dr. James Mwale", specialty: "Surgery", experience: "18 years" },
      ],
    },
    "2": {
      id: 2,
      name: "Limbe Leaf Pharmacy",
      type: "Pharmacy",
      location: "Limbe",
      address: "Kamuzu Highway, Limbe",
      rating: 4.6,
      reviews: 128,
      phone: "+265 1 640 123",
      email: "info@limbeleaf.mw",
      hours: "8:00 AM - 8:00 PM",
      services: ["Prescription Medicines", "OTC Medicines", "Health Consultation", "Home Delivery", "Health Screening"],
      image: "/pharmacy-interior.png",
      description:
        "Your trusted neighborhood pharmacy providing quality pharmaceutical care with expert consultation and convenient services.",
      specialties: ["Prescription Dispensing", "Health Consultations", "Medication Management", "Health Screening"],
      facilities: [
        "Modern Dispensing Area",
        "Consultation Room",
        "Health Screening Equipment",
        "Cold Chain Storage",
        "Home Delivery Service",
      ],
    },
  }

  const provider = providers[id as string]

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Provider Not Found</CardTitle>
            <CardDescription>The healthcare provider you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/search">
              <Button>Back to Search</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`
  }

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`
  }

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
                <p className="text-xs text-gray-600">Provider Details</p>
              </div>
            </Link>
            <Link href="/search">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Provider Hero */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <div className="aspect-video md:aspect-square relative">
                  <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-cover" />
                </div>
              </div>
              <div className="md:w-3/5 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{provider.name}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{provider.address}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-lg">{provider.rating}</span>
                      <span className="ml-1 text-gray-600">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {provider.type}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-6">{provider.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{provider.hours}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{provider.phone}</span>
                  </div>
                  {provider.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>{provider.email}</span>
                    </div>
                  )}
                  {provider.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-5 w-5 mr-2" />
                      <span>{provider.website}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => handleCall(provider.phone)} className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  {provider.email && (
                    <Button onClick={() => handleEmail(provider.email)} variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  )}
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Services & Specialties */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
                <CardDescription>Comprehensive healthcare services available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {provider.services.map((service: string, index: number) => (
                    <Badge key={index} variant="outline" className="justify-center p-3">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Specialties</CardTitle>
                <CardDescription>Areas of medical expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {provider.specialties.map((specialty: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Heart className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities & Doctors */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Facilities & Equipment</CardTitle>
                <CardDescription>Modern healthcare facilities available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {provider.facilities.map((facility: string, index: number) => (
                    <div key={index} className="flex items-center p-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Doctors (if available) */}
            {provider.doctors && (
              <Card>
                <CardHeader>
                  <CardTitle>Medical Staff</CardTitle>
                  <CardDescription>Experienced healthcare professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {provider.doctors.map((doctor: any, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                        <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                        <p className="text-gray-600 text-sm">{doctor.experience} experience</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Contact & Location</CardTitle>
              <CardDescription>Get in touch or visit us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <span>{provider.phone}</span>
                    </div>
                    {provider.email && (
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 mr-3" />
                        <span>{provider.email}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                      <span>{provider.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-3" />
                      <span>{provider.hours}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <Button onClick={() => handleCall(provider.phone)} className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Call {provider.phone}
                    </Button>
                    {provider.email && (
                      <Button
                        onClick={() => handleEmail(provider.email)}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    )}
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
