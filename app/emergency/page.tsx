import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MapPin, Clock, AlertCircle, Heart } from "lucide-react"
import Link from "next/link"

export default function EmergencyPage() {
  const emergencyContacts = [
    {
      id: 1,
      name: "National Ambulance Service",
      type: "Ambulance",
      phone: "998",
      phone2: "+265 1 870 911",
      description: "24/7 Emergency medical response and ambulance services",
      priority: "critical",
    },
    {
      id: 2,
      name: "Queen Elizabeth Central Hospital",
      type: "Emergency Department",
      phone: "+265 1 874 333",
      location: "Blantyre City",
      description: "Major trauma center with 24/7 emergency care",
      priority: "critical",
    },
    {
      id: 3,
      name: "Blantyre Adventist Hospital",
      type: "Emergency Department",
      phone: "+265 1 870 222",
      location: "Blantyre City",
      description: "24/7 emergency services, trauma care, and critical care",
      priority: "high",
    },
    {
      id: 4,
      name: "Malawi Police Service",
      type: "Police",
      phone: "997",
      phone2: "+265 1 870 400",
      description: "Emergency police assistance and security",
      priority: "high",
    },
    {
      id: 5,
      name: "Fire Brigade",
      type: "Fire & Rescue",
      phone: "999",
      phone2: "+265 1 870 222",
      description: "Fire emergency and rescue services",
      priority: "high",
    },
    {
      id: 6,
      name: "Malawi Red Cross",
      type: "Emergency Support",
      phone: "+265 1 820 044",
      description: "Disaster response and emergency medical assistance",
      priority: "medium",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-50 border-red-200"
      case "high":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-blue-50 border-blue-200"
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
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Find Providers
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Emergency Alert */}
      <section className="py-8 px-4 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">Emergency Contacts</h1>
          </div>
          <p className="text-center text-lg">
            In case of life-threatening emergency, call 998 for immediate ambulance assistance
          </p>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">When to call emergency services:</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Severe chest pain or difficulty breathing</li>
                  <li>• Unconsciousness or severe bleeding</li>
                  <li>• Serious injuries from accidents</li>
                  <li>• Signs of stroke or heart attack</li>
                  <li>• Poisoning or severe allergic reactions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className={`${getPriorityColor(contact.priority)} border-2`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{contact.name}</CardTitle>
                      <CardDescription className="mt-1 font-medium">{contact.type}</CardDescription>
                    </div>
                    {contact.priority === "critical" && (
                      <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">CRITICAL</div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">{contact.description}</p>

                    <div className="space-y-2">
                      <a href={`tel:${contact.phone}`} className="block">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                          <Phone className="h-5 w-5 mr-2" />
                          Call {contact.phone}
                        </Button>
                      </a>

                      {contact.phone2 && (
                        <a href={`tel:${contact.phone2}`} className="block">
                          <Button variant="outline" className="w-full bg-transparent" size="lg">
                            <Phone className="h-5 w-5 mr-2" />
                            Alternative: {contact.phone2}
                          </Button>
                        </a>
                      )}
                    </div>

                    {contact.location && (
                      <div className="flex items-center text-sm text-gray-600 pt-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        {contact.location}
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Available 24/7
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Resources */}
          <Card className="mt-8 bg-blue-50 border-blue-200 border-2">
            <CardHeader>
              <CardTitle>Emergency Preparedness</CardTitle>
              <CardDescription>Important information to keep handy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Before an Emergency</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Keep emergency numbers saved in your phone</li>
                    <li>• Know the nearest hospital location</li>
                    <li>• Keep a first aid kit at home</li>
                    <li>• Have important medical documents ready</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">During an Emergency</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Stay calm and assess the situation</li>
                    <li>• Call emergency services immediately</li>
                    <li>• Provide clear location information</li>
                    <li>• Follow dispatcher instructions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
