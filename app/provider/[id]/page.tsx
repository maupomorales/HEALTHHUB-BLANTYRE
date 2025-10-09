import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Phone, Clock, Star, Mail, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProviderDetailPage() {
  // In a real app, you'd fetch this data based on the ID
  const provider = {
    id: 1,
    name: "Blantyre Adventist Hospital",
    type: "Hospital",
    location: "Blantyre City",
    address: "Makata Road, P.O. Box 31, Blantyre",
    rating: 4.8,
    reviews: 245,
    phone: "+265 1 870 222",
    email: "info@adventisthospital.org",
    website: "www.adventisthospital.org",
    hours: "24/7",
    description:
      "Blantyre Adventist Hospital is a leading healthcare facility providing comprehensive medical services to the community. We offer state-of-the-art equipment and experienced medical professionals dedicated to your health.",
    services: [
      "Emergency Care",
      "Surgery",
      "Maternity",
      "Pediatrics",
      "Laboratory Services",
      "Radiology",
      "Pharmacy",
      "Outpatient Services",
    ],
    specialties: ["Cardiology", "Orthopedics", "Neurology", "General Surgery"],
    facilities: ["ICU", "Operating Theaters", "X-Ray", "Ultrasound", "CT Scan", "Blood Bank"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
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
              <Link href="/emergency" className="text-gray-700 hover:text-blue-600 font-medium">
                Emergency
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Provider Details */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/search">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl mb-2">{provider.name}</CardTitle>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-sm">
                          {provider.type}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-semibold">{provider.rating}</span>
                          <span className="ml-1 text-gray-600">({provider.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {provider.address}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{provider.description}</p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2">
                    {provider.services.map((service) => (
                      <div key={service} className="flex items-center p-2 bg-blue-50 rounded">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Facilities & Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-2">
                    {provider.facilities.map((facility) => (
                      <div key={facility} className="flex items-center p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                        <span className="text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Phone className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a href={`tel:${provider.phone}`} className="font-medium hover:text-blue-600">
                          {provider.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <Mail className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a href={`mailto:${provider.email}`} className="font-medium hover:text-blue-600">
                          {provider.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <Globe className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <a
                          href={`https://${provider.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-blue-600"
                        >
                          {provider.website}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{provider.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Hours</p>
                        <p className="font-medium">{provider.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <a href={`tel:${provider.phone}`}>
                      <Button className="w-full" size="lg">
                        <Phone className="h-5 w-5 mr-2" />
                        Call Now
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      <MapPin className="h-5 w-5 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{provider.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium">{provider.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reviews:</span>
                    <span className="font-medium">{provider.reviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Services:</span>
                    <span className="font-medium">{provider.services.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
