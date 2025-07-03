import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Pill,
  Eye,
  Smile,
  Dumbbell,
  Sparkles,
  Search,
  Star,
  ArrowRight,
  Globe,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Health Hub MW Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blantyre Health Hub</h1>
              <p className="text-xs text-gray-600">Your Complete Health Directory</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Services
            </Link>
            <Link href="#directory" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Directory
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700">Find Services</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            🏥 Blantyre's Premier Health Directory
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Complete
            <span className="text-blue-600"> Health Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find and connect with verified healthcare providers instantly through our website. Our platform gives you
            direct access to trusted professionals across pharmacy, dental, optical, and skincare services.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form
              action="/search"
              method="GET"
              className="flex flex-col sm:flex-row gap-4 bg-white rounded-full shadow-lg p-2"
            >
              <div className="flex-1 flex items-center px-4">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <Input
                  name="q"
                  placeholder="Search by area (e.g., City Centre, Limbe, Chichiri...)"
                  className="border-0 focus:ring-0 text-lg"
                />
              </div>
              <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full px-8">
                Search <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" /> Blantyre, Malawi
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" /> 24/7 Directory
            </span>
            <span className="flex items-center">
              <Star className="h-4 w-4 mr-1" /> Verified Providers
            </span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Health Services Directory</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find trusted healthcare providers and wellness services across Blantyre
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pharmacies */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Pill className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Pharmacies</CardTitle>
                <CardDescription>
                  Licensed pharmacies with prescription and over-the-counter medications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Prescription medications</li>
                  <li>• Health consultations</li>
                  <li>• Medical supplies</li>
                  <li>• Emergency services</li>
                </ul>
                <Link href="/search?q=&category=pharmacies">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    View Pharmacies
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Opticians */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-slate-600" />
                </div>
                <CardTitle className="text-xl">Opticians</CardTitle>
                <CardDescription>Professional eye care services and quality eyewear solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Eye examinations</li>
                  <li>• Prescription glasses</li>
                  <li>• Contact lenses</li>
                  <li>• Vision therapy</li>
                </ul>
                <Link href="/search?q=&category=opticians">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    View Opticians
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Dentists */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smile className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Dentists</CardTitle>
                <CardDescription>Comprehensive dental care for healthy smiles and oral hygiene</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• General dentistry</li>
                  <li>• Teeth cleaning</li>
                  <li>• Orthodontics</li>
                  <li>• Emergency dental care</li>
                </ul>
                <Link href="/search?q=&category=dentists">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    View Dentists
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Gyms */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="h-8 w-8 text-slate-600" />
                </div>
                <CardTitle className="text-xl">Gyms & Fitness</CardTitle>
                <CardDescription>Modern fitness facilities and personal training services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Modern equipment</li>
                  <li>• Personal training</li>
                  <li>• Group classes</li>
                  <li>• Nutrition guidance</li>
                </ul>
                <Link href="/search?q=&category=gyms">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    View Gyms
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Skincare */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Skincare Products</CardTitle>
                <CardDescription>Premium skincare products and beauty treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Skincare products</li>
                  <li>• Beauty treatments</li>
                  <li>• Dermatology services</li>
                  <li>• Cosmetic procedures</li>
                </ul>
                <Link href="/search?q=&category=skincare">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    View Products
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Emergency Services */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-red-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl text-red-700">Emergency Services</CardTitle>
                <CardDescription>24/7 emergency healthcare contacts and locations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Emergency contacts</li>
                  <li>• Hospital locations</li>
                  <li>• Ambulance services</li>
                  <li>• First aid centers</li>
                </ul>
                <Button className="w-full bg-red-600 hover:bg-red-700">Emergency Info</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section id="directory" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Health Providers</h2>
            <p className="text-xl text-gray-600">Top-rated healthcare services in Blantyre</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Provider Cards */}
            {[
              { name: "Central Pharmacy", type: "Pharmacy", rating: 4.8, location: "City Centre", hours: "24/7" },
              { name: "Vision Care Opticians", type: "Optician", rating: 4.9, location: "Limbe", hours: "8AM-6PM" },
              { name: "Smile Dental Clinic", type: "Dentist", rating: 4.7, location: "Mandala", hours: "8AM-5PM" },
              { name: "FitLife Gym", type: "Gym", rating: 4.6, location: "Chichiri", hours: "5AM-10PM" },
              { name: "Glow Skincare", type: "Skincare", rating: 4.8, location: "Limbe", hours: "9AM-7PM" },
              { name: "HealthPlus Pharmacy", type: "Pharmacy", rating: 4.5, location: "Ndirande", hours: "7AM-9PM" },
            ].map((provider, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {provider.type}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{provider.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {provider.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {provider.hours}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Blantyre Health Hub</h2>
              <p className="text-lg text-gray-600 mb-6">
                Blantyre Health Hub is your comprehensive directory for all healthcare and wellness services in
                Blantyre. We connect residents with trusted healthcare providers, making it easier to find quality care
                when you need it most.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">Healthcare Providers</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-600">5</div>
                  <div className="text-sm text-gray-600">Service Categories</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Directory Access</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-600">100%</div>
                  <div className="text-sm text-gray-600">Verified Listings</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-slate-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need to List Your Service?</h3>
              <p className="mb-6">
                Join our directory and connect with thousands of potential patients and clients in Blantyre.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Increase your visibility
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Reach more patients
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Build trust with reviews
                </li>
              </ul>
              <Button variant="secondary" size="lg" className="w-full">
                List Your Business
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Blantyre Health Hub</h2>
            <p className="text-xl text-gray-600">Get in touch with us for any inquiries or support</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Phone className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600">+265 897976524</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">healthhubconnect071@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Website</h4>
                      <Link
                        href="https://www.healthhubconnectMW.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        www.healthhubconnectMW.com
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-gray-600">Blantyre, Malawi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Directory Hours</h4>
                      <p className="text-gray-600">24/7 Online Access</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                  <Link href="#" className="hover:text-white transition-colors">
                    Pharmacies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Opticians
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Dentists
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Gyms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Skincare
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    List Your Business
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Emergency Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <div className="space-y-2 text-sm">
                <p className="text-red-400 font-semibold">Emergency: 997</p>
                <p className="text-gray-400">Police: 990</p>
                <p className="text-gray-400">Fire: 998</p>
                <p className="text-gray-400">Ambulance: 998</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Blantyre Health Hub. All rights reserved. | Serving Blantyre, Malawi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
