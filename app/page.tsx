import { Search, Phone, MapPin, Clock, Heart, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Your Healthcare Directory</p>
              </div>
            </div>
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
              <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Quality Healthcare in <span className="text-blue-600">Blantyre</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with trusted healthcare providers, access emergency services, and take control of your health
            journey in Blantyre, Malawi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Find Healthcare Providers
              </Button>
            </Link>
            <Link href="/emergency">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Blantyre Health Hub?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make healthcare accessible and convenient for everyone in Blantyre
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Easy Search</CardTitle>
                <CardDescription>
                  Find healthcare providers by specialty, location, or name with our intuitive search system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Local Focus</CardTitle>
                <CardDescription>
                  Comprehensive directory of healthcare services specifically in Blantyre and surrounding areas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Emergency Ready</CardTitle>
                <CardDescription>
                  Quick access to emergency contacts and services when you need them most
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Healthcare Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Medical Specialties</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Find Your Healthcare Provider?</h3>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of Blantyre residents who trust our platform for their healthcare needs
          </p>
          <Link href="/search">
            <Button size="lg">Get Started Today</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">BLANTYRE HEALTH HUB</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting Blantyre residents with quality healthcare providers and emergency services.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Subscribe to Health Updates</h4>
                <p className="text-sm text-gray-400 mb-3">Get health tips and provider updates</p>
                <Link href="/register">
                  <Button variant="outline" className="w-full bg-transparent">
                    Subscribe Now
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/search" className="hover:text-white">
                    Find Providers
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="hover:text-white">
                    Emergency Services
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency: 997
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Blantyre, Malawi
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  24/7 Support
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Blantyre Health Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
