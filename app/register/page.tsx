"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Heart, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const interests = [
    "General Health Tips",
    "Child Health",
    "Women's Health",
    "Mental Health",
    "Nutrition & Diet",
    "Fitness & Exercise",
    "Chronic Disease Management",
    "Preventive Care",
  ]

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Successfully Subscribed!</CardTitle>
            <CardDescription>
              Thank you for subscribing to Blantyre Health Hub. We'll send health updates and tips to your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Find Providers
              </Link>
              <Link href="/emergency" className="text-gray-700 hover:text-blue-600 font-medium">
                Emergency
              </Link>
              <Link href="/register" className="text-blue-600 font-medium">
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Registration Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Stay Informed About Your Health</h1>
            <p className="text-lg text-gray-600">
              Subscribe to receive health tips, provider updates, and wellness information tailored for Blantyre
              residents.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subscribe to Health Updates</CardTitle>
              <CardDescription>Fill in your details to receive personalized health information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+265 xxx xxx xxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Health Topics of Interest</Label>
                  <p className="text-sm text-gray-600">Select topics you'd like to receive updates about</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">What You'll Receive:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Weekly health tips and wellness advice</li>
                    <li>• Updates about new healthcare providers</li>
                    <li>• Information about health campaigns</li>
                    <li>• Emergency health alerts when needed</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Subscribe to Health Updates
                </Button>

                <p className="text-xs text-gray-600 text-center">
                  By subscribing, you agree to receive health updates and information. You can unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">&copy; 2025 Blantyre Health Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
