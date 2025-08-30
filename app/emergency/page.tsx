"use client"

import { Phone, MapPin, Clock, AlertTriangle, Heart, Ambulance } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const emergencyContacts = [
  {
    name: "National Emergency Services",
    number: "997",
    description: "Police, Fire, and Medical Emergency",
    available: "24/7",
  },
  {
    name: "Blantyre Adventist Hospital",
    number: "+265 1 870 411",
    description: "Emergency Department",
    available: "24/7",
  },
  {
    name: "Queen Elizabeth Central Hospital",
    number: "+265 1 871 911",
    description: "Major Emergency & Trauma Center",
    available: "24/7",
  },
  {
    name: "Mwaiwathu Private Hospital",
    number: "+265 1 820 100",
    description: "Private Emergency Services",
    available: "24/7",
  },
  {
    name: "Malawi Red Cross",
    number: "+265 1 870 054",
    description: "Emergency Response & First Aid",
    available: "24/7",
  },
]

const emergencyTips = [
  {
    title: "Heart Attack",
    symptoms: "Chest pain, shortness of breath, nausea",
    action: "Call 997 immediately. Give aspirin if available and not allergic.",
  },
  {
    title: "Stroke",
    symptoms: "Face drooping, arm weakness, speech difficulty",
    action: "Call 997 immediately. Note time symptoms started.",
  },
  {
    title: "Severe Bleeding",
    symptoms: "Heavy bleeding that won't stop",
    action: "Apply direct pressure with clean cloth. Elevate if possible.",
  },
  {
    title: "Choking",
    symptoms: "Cannot speak, cough, or breathe",
    action: "Perform Heimlich maneuver. Call 997 if unsuccessful.",
  },
]

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">EMERGENCY SERVICES</h1>
                <p className="text-xs text-red-100">Blantyre Health Hub</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-red-100 hover:text-white font-medium">
                Home
              </Link>
              <Link href="/search" className="text-red-100 hover:text-white font-medium">
                Find Providers
              </Link>
              <Link href="/emergency" className="text-white font-medium">
                Emergency
              </Link>
              <Link href="/register" className="text-red-100 hover:text-white font-medium">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Alert */}
        <div className="bg-red-600 text-white rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">Emergency Services</h2>
          </div>
          <p className="text-lg mb-4">
            If you are experiencing a life-threatening emergency, call <strong>997</strong> immediately.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="bg-white text-red-600 hover:bg-red-50"
              onClick={() => window.open("tel:997")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call 997 Now
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        <CardDescription>{contact.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{contact.number}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {contact.available}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => window.open(`tel:${contact.number}`)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Emergency Tips */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency First Aid</h3>
            <div className="space-y-4">
              {emergencyTips.map((tip, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      {tip.title}
                    </CardTitle>
                    <CardDescription>
                      <strong>Symptoms:</strong> {tip.symptoms}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-50 p-3 rounded-md">
                      <strong className="text-red-800">What to do:</strong>
                      <p className="text-red-700 mt-1">{tip.action}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Important Note */}
            <Card className="mt-6 border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> These tips are for guidance only. Always seek professional medical
                      help in emergencies. Call 997 for immediate assistance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              onClick={() => window.open("tel:997")}
            >
              <Phone className="h-8 w-8 text-red-600" />
              <span>Call Emergency</span>
            </Button>

            <Link href="/search">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <MapPin className="h-8 w-8 text-blue-600" />
                <span>Find Nearest Hospital</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              onClick={() => window.open("https://maps.google.com/search/hospitals+near+blantyre+malawi")}
            >
              <Ambulance className="h-8 w-8 text-green-600" />
              <span>Hospital Directions</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
