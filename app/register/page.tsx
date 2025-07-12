"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  interests: string[]
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    interests: [],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const healthInterests = [
    "Pharmacy",
    "Dental Care",
    "Eye Care",
    "Fitness & Wellness",
    "Skincare & Beauty",
    "Mental Health",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Registration successful! Welcome to Blantyre Health Hub. You'll receive updates about healthcare services in your area.",
        })
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          city: "",
          interests: [],
        })
      } else {
        setMessage({
          type: "error",
          text: result.error || "Registration failed. Please try again.",
        })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Health Hub MW Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blantyre Health Hub</h1>
              <p className="text-xs text-gray-600">Subscribe to Health Updates</p>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-slate-700 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <UserPlus className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Subscribe to Health Hub</h1>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of Blantyre residents who stay informed about healthcare services, wellness tips, and health
            updates in their area
          </p>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
            <CheckCircle className="h-5 w-5 mr-2" />
            Free Registration
          </Badge>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Success/Error Message */}
          {message && (
            <Card className={`mb-8 border-0 shadow-lg ${message.type === "success" ? "bg-green-50" : "bg-red-50"}`}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  {message.type === "success" ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                  )}
                  <p className={message.type === "success" ? "text-green-800" : "text-red-800"}>{message.text}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <User className="h-6 w-6 text-blue-600 mr-3" />
                Create Your Health Hub Account
              </CardTitle>
              <p className="text-gray-600">
                Get personalized health updates, find nearby healthcare providers, and stay informed about wellness
                opportunities in Blantyre.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+265 xxx xxx xxx"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Date of Birth
                      </label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Address
                      </label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Your street address"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City/Area *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g., Blantyre, Limbe, Chichiri"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Health Interests */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Interests</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Select the health topics you're interested in to receive relevant updates:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {healthInterests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    By registering, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                      Terms and Conditions
                    </Link>{" "}
                    and consent to receive health-related updates and information from Blantyre Health Hub.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Subscribe to Health Hub
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
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
                  <p className="text-xs text-gray-400">Your Health Hub</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting Blantyre residents with trusted healthcare providers and wellness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Health</h4>
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
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
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
