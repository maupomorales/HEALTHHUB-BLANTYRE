"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    healthInterests: [] as string[],
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    medications: '',
    allergies: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const healthInterestOptions = [
    'General Health',
    'Mental Health',
    'Maternal Health',
    'Child Health',
    'Chronic Disease Management',
    'Preventive Care',
    'Dental Care',
    'Eye Care'
  ]

  const areas = [
    'Blantyre City', 'Limbe', 'Chichiri', 'Mandala', 'Nyambadwe', 
    'Soche', 'Ginnery Corner', 'Chirimba'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleHealthInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      healthInterests: prev.healthInterests.includes(interest)
        ? prev.healthInterests.filter(i => i !== interest)
        : [...prev.healthInterests, interest]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
            <CardDescription>
              Thank you for joining Blantyre Health Hub. You'll receive health updates and provider information via email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full">
                  Return to Home
                </Button>
              </Link>
              <Link href="/search">
                <Button variant="outline" className="w-full bg-transparent">
                  Find Healthcare Providers
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BLANTYRE HEALTH HUB</h1>
                <p className="text-xs text-gray-600">Register for Updates</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Find Providers
              \
