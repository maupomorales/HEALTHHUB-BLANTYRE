import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Phone, MapPin, Clock, Star, Users, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const providers = [
    {
      id: 1,
      name: "Blantyre Adventist Hospital",
      type: "Hospital",
      location: "Blantyre City",
      rating: 4.8,
      reviews: 245,
      services: ["Emergency Care", "Surgery", "Maternity"],
    },
    {
      id: 2,
      name: "Limbe Leaf Pharmacy",
      type: "Pharmacy",
      location: "Limbe",
      rating: 4.6,
      reviews: 128,
      services: ["Prescription", "OTC Medicines", "Health Consultation"],
    },
    {
      id: 3,
      name: "Chichiri Family Clinic",
      type: "Clinic",
      location: "Chichiri",
      rating: 4.7,
      reviews: 89,
      services: ["General Practice", "Pediatrics", "Vaccinations"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Your Trusted Healthcare Directory</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Find Providers
              </Link>
              <Link href="/emergency" className="text-gray-700 hover:text-blue-600 font-medium">
                Emergency
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-16 w-16 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold">Your Health, Our Priority</h1>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Find trusted healthcare providers, pharmacies, and wellness services in Blantyre. Connect with quality care
            in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Search className="h-5 w-5 mr-2" />
                Find Healthcare Providers
              </Button>
            </Link>
            <Link href="/emergency">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent"
              >
                <Phone className="h-5 w-5 mr-2" />
                Emergency Contacts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Healthcare Providers</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">8</h3>
              <p className="text-gray-600">Areas Covered</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
              <p className="text-gray-600">Emergency Support</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">100%</h3>
              <p className="text-gray-600">Verified Providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Healthcare Providers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover top-rated healthcare providers in Blantyre, trusted by thousands of patients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {provider.location}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{provider.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{provider.rating}</span>
                      <span className="ml-1 text-gray-600">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.services.slice(0, 2).map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {provider.services.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{provider.services.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <Link href={`/provider/${provider.id}`}>
                    <Button className="w-full">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/search">
              <Button size="lg" variant="outline">
                View All Providers
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected with Your Health</h2>
          <p className="text-xl mb-8">
            Subscribe to receive health tips, provider updates, and wellness information for Blantyre.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Subscribe Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
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
