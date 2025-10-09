import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Phone, MapPin, Clock, AlertCircle, Ambulance, Shield } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const emergencyContacts = [
    {
      id: 1,
      name: "Blantyre Adventist Hospital Emergency",
      type: "Hospital Emergency",
      phone: "+265 1 870 444",
      location: "Blantyre City",
      priority: "high",
      availability: "24/7 Emergency Services",
      services: ["Trauma", "Cardiac Care", "ICU", "Emergency Surgery"],
    },
    {
      id: 2,
      name: "Queen Elizabeth Central Hospital A&E",
      type: "Hospital Emergency",
      phone: "+265 1 871 911",
      location: "Blantyre City",
      priority: "high",
      availability: "24/7 Emergency Services",
      services: ["Major Trauma", "Burns Unit", "Emergency Ward"],
    },
    {
      id: 3,
      name: "Mwaiwathu Private Hospital Emergency",
      type: "Hospital Emergency",
      phone: "+265 1 820 255",
      location: "Blantyre City",
      priority: "high",
      availability: "24/7 Emergency Services",
      services: ["Emergency Care", "ICU", "Ambulance"],
    },
    {
      id: 4,
      name: "Malawi Ambulance Service",
      type: "Ambulance",
      phone: "998",
      location: "Blantyre",
      priority: "critical",
      availability: "24/7 Emergency Response",
      services: ["Emergency Transport", "Paramedic Services"],
    },
    {
      id: 5,
      name: "Malawi Police Emergency",
      type: "Police",
      phone: "997",
      location: "Nationwide",
      priority: "critical",
      availability: "24/7 Emergency Line",
      services: ["Emergency Police Response", "Medical Emergencies"],
    },
    {
      id: 6,
      name: "Malawi Fire Services",
      type: "Fire Department",
      phone: "999",
      location: "Nationwide",
      priority: "critical",
      availability: "24/7 Emergency Response",
      services: ["Fire Emergencies", "Rescue Operations"],
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
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
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Find Providers
              </Link>
              <Link href="/emergency" className="text-blue-600 font-medium">
                Emergency
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Emergency Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-16 w-16 mr-4" />
            <h1 className="text-5xl font-bold">Emergency Contacts</h1>
          </div>
          <p className="text-xl mb-4">Quick access to emergency healthcare services in Blantyre</p>
          <div className="bg-white/20 backdrop-blur rounded-lg p-4 inline-block">
            <p className="text-lg font-semibold">
              <Phone className="inline h-5 w-5 mr-2" />
              In case of emergency, call 998 for ambulance
            </p>
          </div>
        </div>
      </section>

      {/* Quick Dial Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Dial Emergency Numbers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                  <Ambulance className="h-6 w-6 mr-2" />
                  Ambulance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:998">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-2xl py-6">Call 998</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-600 flex items-center">
                  <Shield className="h-6 w-6 mr-2" />
                  Police
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:997">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-2xl py-6">Call 997</Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-600 flex items-center">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  Fire Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:999">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-2xl py-6">Call 999</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contacts List */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Hospital Emergency Departments</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className={`border-2 ${getPriorityColor(contact.priority)}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{contact.name}</CardTitle>
                      <CardDescription className="flex items-center mt-2 text-gray-700">
                        <MapPin className="h-4 w-4 mr-1" />
                        {contact.location}
                      </CardDescription>
                    </div>
                    <Badge className={getPriorityColor(contact.priority)}>{contact.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-2 text-green-600" />
                      <span className="font-medium">{contact.availability}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {contact.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-6">
                        <Phone className="h-5 w-5 mr-2" />
                        Call {contact.phone}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-12 px-4 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-6 w-6 mr-2 text-yellow-600" />
              When to Call Emergency Services
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span>Severe chest pain or difficulty breathing</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span>Unconsciousness or severe head injury</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span>Severe bleeding that won't stop</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span>Suspected heart attack or stroke</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span>Severe allergic reaction</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span>Major trauma or serious injury</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">&copy; 2025 Blantyre Health Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
