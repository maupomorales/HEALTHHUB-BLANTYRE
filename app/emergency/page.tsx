"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Shield,
  Flame,
  Truck,
  Cross,
  Stethoscope,
  Siren,
  Navigation,
  Info,
  Users,
  Activity,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const emergencyContacts = [
  {
    service: "General Emergency",
    number: "997",
    description: "All emergencies - Police, Fire, Medical",
    icon: AlertTriangle,
    color: "bg-red-600",
    priority: "critical",
  },
  {
    service: "Police Emergency",
    number: "990",
    description: "Crime, accidents, security emergencies",
    icon: Shield,
    color: "bg-blue-600",
    priority: "critical",
  },
  {
    service: "Fire & Rescue",
    number: "998",
    description: "Fire emergencies, rescue operations",
    icon: Flame,
    color: "bg-orange-600",
    priority: "critical",
  },
  {
    service: "Ambulance Service",
    number: "998",
    description: "Medical emergencies, patient transport",
    icon: Truck,
    color: "bg-green-600",
    priority: "critical",
  },
]

const hospitals = [
  {
    name: "Queen Elizabeth Central Hospital",
    type: "Government Hospital",
    address: "Masauko Chipembere Highway, Blantyre",
    phone: "+265 1 871 911",
    services: ["Emergency Room", "Trauma Center", "ICU", "Surgery"],
    hours: "24/7",
    rating: 4.2,
    coordinates: "Emergency Ward - Ground Floor",
  },
  {
    name: "Blantyre Adventist Hospital",
    type: "Private Hospital",
    address: "Nyambadwe, Blantyre",
    phone: "+265 1 870 444",
    services: ["Emergency Care", "Specialist Services", "Laboratory"],
    hours: "24/7",
    rating: 4.5,
    coordinates: "Main Reception",
  },
  {
    name: "Mwaiwathu Private Hospital",
    type: "Private Hospital",
    address: "Area 43, Lilongwe Road, Blantyre",
    phone: "+265 1 820 266",
    services: ["Emergency Room", "Cardiac Care", "Maternity"],
    hours: "24/7",
    rating: 4.6,
    coordinates: "Emergency Department",
  },
  {
    name: "Blantyre Baptist Hospital",
    type: "Mission Hospital",
    address: "Mandala, Blantyre",
    phone: "+265 1 870 077",
    services: ["General Emergency", "Pediatrics", "Surgery"],
    hours: "24/7",
    rating: 4.3,
    coordinates: "Casualty Department",
  },
]

const clinics = [
  {
    name: "Limbe Health Center",
    address: "Kamuzu Road, Limbe",
    phone: "+265 1 640 299",
    hours: "24/7",
    services: ["Emergency Care", "Maternity", "Outpatient"],
  },
  {
    name: "Ndirande Health Center",
    address: "Ndirande Township",
    phone: "+265 1 670 188",
    hours: "24/7",
    services: ["Emergency Care", "Child Health", "HIV Testing"],
  },
  {
    name: "Chilomoni Health Center",
    address: "Chilomoni Township",
    phone: "+265 1 740 266",
    hours: "24/7",
    services: ["Emergency Care", "Family Planning", "TB Treatment"],
  },
  {
    name: "Bangwe Health Center",
    address: "Bangwe Township",
    phone: "+265 1 910 455",
    hours: "24/7",
    services: ["Emergency Care", "Immunization", "Antenatal Care"],
  },
]

const emergencyTips = [
  {
    title: "Medical Emergency",
    icon: Heart,
    tips: [
      "Call 997 or 998 immediately",
      "Stay calm and speak clearly",
      "Provide exact location",
      "Don't move injured person unless necessary",
      "Apply pressure to bleeding wounds",
    ],
  },
  {
    title: "Fire Emergency",
    icon: Flame,
    tips: [
      "Call 998 immediately",
      "Evacuate the building",
      "Stay low to avoid smoke",
      "Don't use elevators",
      "Meet at designated assembly point",
    ],
  },
  {
    title: "Crime/Security",
    icon: Shield,
    tips: [
      "Call 990 for police",
      "Don't resist if being robbed",
      "Try to remember suspect details",
      "Preserve crime scene if safe",
      "Report to nearest police station",
    ],
  },
  {
    title: "Road Accident",
    icon: Truck,
    tips: [
      "Call 997 immediately",
      "Secure the accident scene",
      "Don't move seriously injured",
      "Take photos if safe to do so",
      "Exchange insurance details",
    ],
  },
]

const pharmacies24h = [
  {
    name: "Central Pharmacy Blantyre",
    address: "Victoria Avenue, Blantyre",
    phone: "+265 1 620 123",
    services: ["Emergency Medicines", "First Aid Supplies"],
  },
  {
    name: "HealthPlus Pharmacy Limbe",
    address: "Masauko Chipembere Highway, Limbe",
    phone: "+265 1 640 234",
    services: ["Prescription Medicines", "Medical Equipment"],
  },
  {
    name: "Mandala Health Pharmacy",
    address: "Mandala Road, Mandala",
    phone: "+265 1 660 567",
    services: ["Emergency Drugs", "Health Consultation"],
  },
]

export default function EmergencyPage() {
  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, "_self")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Health Hub MW Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blantyre Health Hub</h1>
              <p className="text-xs text-gray-600">Emergency Services Directory</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
              Search
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Siren className="h-12 w-12 mr-4 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold">Emergency Services</h1>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Quick access to emergency contacts, hospitals, and life-saving information for Blantyre residents
          </p>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
            <Clock className="h-5 w-5 mr-2" />
            Available 24/7
          </Badge>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Emergency Hotlines</h2>
            <p className="text-xl text-gray-600">Critical emergency numbers - Save these contacts now</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {emergencyContacts.map((contact, index) => {
              const Icon = contact.icon
              return (
                <Card key={index} className="border-2 border-red-200 hover:border-red-400 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.service}</h3>
                    <div className="text-3xl font-bold text-red-600 mb-3">{contact.number}</div>
                    <p className="text-sm text-gray-600 mb-4">{contact.description}</p>
                    <Button
                      onClick={() => handleEmergencyCall(contact.number)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      size="lg"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-center mb-2">
              <Info className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800">Important Notice</h3>
            </div>
            <p className="text-red-700">
              <strong>997</strong> is the universal emergency number in Malawi. Use it for all life-threatening
              emergencies. Calls are free from all networks.
            </p>
          </div>
        </div>
      </section>

      {/* Hospitals */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Emergency Hospitals</h2>
            <p className="text-xl text-gray-600">24/7 emergency medical facilities in Blantyre</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {hospitals.map((hospital, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-900">{hospital.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {hospital.type}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm">{hospital.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm">{hospital.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm font-medium text-green-600">{hospital.hours}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Navigation className="h-4 w-4 mr-2 text-red-600" />
                      <span className="text-sm">{hospital.coordinates}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Emergency Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.services.map((service, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleEmergencyCall(hospital.phone)}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <MapPin className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Centers */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">24/7 Health Centers</h2>
            <p className="text-xl text-gray-600">Community health centers with emergency services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinics.map((clinic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Cross className="h-6 w-6 text-red-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{clinic.name}</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-2" />
                      {clinic.address}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-2" />
                      {clinic.phone}
                    </div>
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <Clock className="h-3 w-3 mr-2" />
                      {clinic.hours}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {clinic.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleEmergencyCall(clinic.phone)}
                    variant="outline"
                    size="sm"
                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-600"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Pharmacies */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">24/7 Emergency Pharmacies</h2>
            <p className="text-xl text-gray-600">Round-the-clock access to emergency medications</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pharmacies24h.map((pharmacy, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Stethoscope className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{pharmacy.name}</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-3 w-3 mr-2" />
                      {pharmacy.address}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-2" />
                      {pharmacy.phone}
                    </div>
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <Clock className="h-3 w-3 mr-2" />
                      24/7 Open
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Available:</p>
                    <div className="flex flex-wrap gap-1">
                      {pharmacy.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleEmergencyCall(pharmacy.phone)}
                    variant="outline"
                    size="sm"
                    className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Tips */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Emergency Response Tips</h2>
            <p className="text-xl text-gray-600">Essential knowledge that could save lives</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <Icon className="h-5 w-5 text-red-600" />
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tip.tips.map((tipItem, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {tipItem}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-red-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">In Case of Emergency</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Stay Calm</h3>
              <p className="text-red-100">Keep yourself and others calm. Panic can make situations worse.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Phone className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Call for Help</h3>
              <p className="text-red-100">Dial 997 immediately. Provide clear location and situation details.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Provide Aid</h3>
              <p className="text-red-100">Give first aid if trained. Don't move seriously injured persons.</p>
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={() => handleEmergencyCall("997")}
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 text-xl px-8 py-4"
            >
              <Phone className="h-6 w-6 mr-2" />
              Emergency Call 997
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo.png" alt="Health Hub MW Logo" width={32} height={32} className="object-contain" />
                <div>
                  <h3 className="text-lg font-bold">Blantyre Health Hub</h3>
                  <p className="text-xs text-gray-400">Emergency Services</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted source for emergency contacts and healthcare information in Blantyre.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency Numbers</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="text-red-400 font-semibold">Emergency: 997</li>
                <li>Police: 990</li>
                <li>Fire: 998</li>
                <li>Ambulance: 998</li>
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
                  <Link href="/search" className="hover:text-white transition-colors">
                    Find Services
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Important</h4>
              <div className="space-y-2 text-sm">
                <p className="text-red-400 font-semibold">Save Emergency Contacts</p>
                <p className="text-gray-400">Keep this page bookmarked</p>
                <p className="text-gray-400">Share with family & friends</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Blantyre Health Hub. Emergency Services Directory | Serving Blantyre, Malawi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
