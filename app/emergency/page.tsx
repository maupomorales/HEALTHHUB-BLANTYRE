"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, AlertTriangle, Heart, ArrowLeft, Ambulance } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
    {
      name: "Malawi Red Cross",
      phone: "+265 1 870 054",
      type: "Emergency Response",
      description: "Disaster response and emergency assistance",
      available: "24/7",
      priority: "medium",
    },
    {
      name: "Poison Control Center",
      phone: "+265 1 871 911",
      type: "Poison Emergency",
      description: "Immediate assistance for poisoning cases",
      available: "24/7",
      priority: "high",
    },
    {
      name: "Mental Health Crisis Line",
      phone: "+265 888 123 456",
      type: "Mental Health",
      description: "Crisis counseling and mental health support",
      available: "24/7",
      priority: "medium",
    },
  ]

  const firstAidTips = [
    {
      title: "Heart Attack",
      steps: [
        "Call 997 immediately",
        "Help the person sit down and rest",
        "Give aspirin if available and not allergic",
        "Stay with the person until help arrives",
      ],
    },
    {
      title: "Severe Bleeding",
      steps: [
        "Apply direct pressure to the wound",
        "Elevate the injured area if possible",
        "Use clean cloth or bandage",
        "Call for medical help if bleeding doesn't stop",
      ],
    },
    {
      title: "Choking",
      steps: [
        "Encourage coughing if person is conscious",
        "Give 5 back blows between shoulder blades",
        "Give 5 abdominal thrusts (Heimlich maneuver)",
        "Call 997 if object doesn't dislodge",
      ],
    },
    {
      title: "Burns",
      steps: [
        "Cool the burn with cold water for 10-20 minutes",
        "Remove jewelry before swelling occurs",
        "Cover with clean, dry cloth",
        "Seek medical attention for severe burns",
      ],
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
              <Image src="/logo.png" alt="Health Hub Logo" width={40} height={40} className="object-contain" />
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
                <Ambulance className="h-6 w-6 mr-3" />
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
                  <Ambulance className="h-6 w-6 mr-2" />
                  Queen Elizabeth
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* First Aid Tips */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Basic First Aid Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {firstAidTips.map((tip, index) => (
                <Card key={index} className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    This information is for emergency reference only and does not replace professional medical advice.
                    In case of serious medical emergencies, always call 997 or go to the nearest hospital immediately.
                    Keep this page bookmarked for quick access during emergencies.
                  </p>
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
