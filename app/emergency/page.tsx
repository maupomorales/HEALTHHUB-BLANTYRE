"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, AlertTriangle, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const emergencyContacts = [
    {
      name: "National Emergency Services",
      phone: "997",
      type: "General Emergency",
      description: "Police, Fire, and Medical emergencies",
      available: "24/7",
      priority: "high",
    },
    {
      name: "Blantyre Adventist Hospital",
      phone: "+265 1 870 411",
      type: "Hospital Emergency",
      description: "Private hospital with 24/7 emergency services",
      location: "Blantyre City",
      available: "24/7",
      priority: "high",
    },
    {
      name: "Queen Elizabeth Central Hospital",
      phone: "+265 1 871 911",
      type: "Public Hospital",
      description: "Main government hospital emergency department",
      location: "Blantyre City",
      available: "24/7",
      priority: "high",
    },
  ]

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Emergency Contacts</p>
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

      {/* Emergency Alert */}
      <section className="py-6 px-4 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 mr-3" />
            <div className="text-center">
              <h2 className="text-2xl font-bold">Emergency Services Available 24/7</h2>
              <p className="text-lg">For life-threatening emergencies, call 997 immediately</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency Contacts</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick access to essential emergency services in Blantyre. Save these numbers in your phone for immediate
              access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {emergencyContacts.map((contact, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-lg transition-shadow ${
                  contact.priority === "high" ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        {contact.location && (
                          <>
                            <MapPin className="h-4 w-4 mr-1" />
                            {contact.location}
                          </>
                        )}
                      </CardDescription>
                    </div>
                    <Badge variant={contact.priority === "high" ? "destructive" : "secondary"}>{contact.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{contact.description}</p>

                  <div className="flex items-center mb-4 text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    Available: {contact.available}
                  </div>

                  <Button
                    onClick={() => handleCall(contact.phone)}
                    className={`w-full ${
                      contact.priority === "high" ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700"
                    }`}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call {contact.phone}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Dial Section */}
          <Card className="mb-12 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Heart className="h-6 w-6 mr-3" />
                Quick Emergency Dial
              </CardTitle>
              <CardDescription className="text-red-700">For immediate life-threatening emergencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleCall("997")}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white h-16 text-xl"
                >
                  <Phone className="h-6 w-6 mr-2" />
                  997 - Emergency
                </Button>
                <Button
                  onClick={() => handleCall("+265 1 870 411")}
                  size="lg"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100 h-16"
                >
                  <Heart className="h-6 w-6 mr-2" />
                  Adventist Hospital
                </Button>
                <Button
                  onClick={() => handleCall("+265 1 871 911")}
                  size="lg"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100 h-16"
                >
                  <Phone className="h-6 w-6 mr-2" />
                  Queen Elizabeth
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
