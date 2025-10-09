import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Star, Phone, Clock, Mail, Globe, ArrowLeft, Calendar, DollarSign, Users } from "lucide-react"
import Link from "next/link"

export default function ProviderDetailPage() {
  const provider = {
    id: 1,
    name: "Blantyre Adventist Hospital",
    type: "Hospital",
    location: "Blantyre City",
    address: "Along Glyn Jones Road, Blantyre, Malawi",
    rating: 4.8,
    reviews: 245,
    phone: "+265 1 870 444",
    email: "info@bah.mw",
    website: "www.bah.mw",
    hours: "24/7 Emergency Services",
    description:
      "Blantyre Adventist Hospital is a leading healthcare institution in Blantyre, offering comprehensive medical services with state-of-the-art facilities and experienced healthcare professionals. We are committed to providing quality healthcare to all our patients.",
    services: [
      "Emergency Care",
      "Surgery",
      "Maternity",
      "Laboratory",
      "Radiology",
      "Pediatrics",
      "Internal Medicine",
      "Dental Care",
      "Physiotherapy",
      "Pharmacy",
    ],
    facilities: [
      "24/7 Emergency Department",
      "Operating Theatres",
      "ICU",
      "Laboratory",
      "Pharmacy",
      "Ambulance Service",
    ],
    insurance: ["Medical Aid Society of Malawi (MASM)", "Prime Insurance", "Old Mutual", "Cash Payments"],
    doctors: [
      { name: "Dr. John Banda", specialty: "General Surgery" },
      { name: "Dr. Grace Phiri", specialty: "Pediatrics" },
      { name: "Dr. James Mwale", specialty: "Internal Medicine" },
    ],
  }

  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service and very professional staff. The emergency department was quick and efficient.",
    },
    {
      id: 2,
      author: "Peter K.",
      rating: 5,
      date: "1 month ago",
      comment: "Great hospital with modern facilities. The doctors are very knowledgeable and caring.",
    },
    {
      id: 3,
      author: "Mary L.",
      rating: 4,
      date: "2 months ago",
      comment: "Good overall experience. The waiting time was a bit long but the care was excellent.",
    },
  ]

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

      {/* Breadcrumb */}
      <section className="py-4 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <Link href="/search" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Link>
        </div>
      </section>

      {/* Provider Header */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                <Badge variant="secondary" className="text-sm">
                  {provider.type}
                </Badge>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{provider.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold text-lg">{provider.rating}</span>
                  <span className="ml-1 text-gray-600">({provider.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a href={`tel:${provider.phone.replace(/\s/g, "")}`}>
                <Button size="lg" className="w-full md:w-auto">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
              </a>
              <Button size="lg" variant="outline" className="w-full md:w-auto bg-transparent">
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About {provider.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{provider.description}</p>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                  <CardDescription>Comprehensive healthcare services available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {provider.services.map((service) => (
                      <div key={service} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{service}</span>
                      </div>
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
                  <div className="grid md:grid-cols-2 gap-3">
                    {provider.facilities.map((facility) => (
                      <div key={facility} className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Doctors */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Medical Team</CardTitle>
                  <CardDescription>Experienced healthcare professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {provider.doctors.map((doctor) => (
                      <div key={doctor.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{doctor.name}</p>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                  <CardDescription>{provider.reviews} total reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 font-semibold text-gray-900">{review.author}</span>
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact & Details */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a href={`tel:${provider.phone.replace(/\s/g, "")}`} className="text-blue-600 hover:underline">
                        {provider.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href={`mailto:${provider.email}`} className="text-blue-600 hover:underline">
                        {provider.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a
                        href={`https://${provider.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {provider.website}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-900">{provider.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Operating Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Operating Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{provider.hours}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance */}
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Accepted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {provider.insurance.map((insurance) => (
                      <div key={insurance} className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-gray-700">{insurance}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-blue-50 to-green-50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Star className="h-4 w-4 mr-2" />
                    Write a Review
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Save Provider
                  </Button>
                </CardContent>
              </Card>
            </div>
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
