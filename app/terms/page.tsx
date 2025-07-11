"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Shield,
  FileText,
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Info,
  Scale,
  Lock,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Health Hub MW Logo" width={50} height={50} className="object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Blantyre Health Hub</h1>
              <p className="text-xs text-gray-600">Terms and Conditions</p>
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
            <Scale className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms and Conditions</h1>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Please read these terms carefully before using Blantyre Health Hub services
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              <Calendar className="h-5 w-5 mr-2" />
              Effective: 06/7/2025
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              <FileText className="h-5 w-5 mr-2" />
              Last Updated: 07/11/2025
            </Badge>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Introduction */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                Welcome to Blantyre Health Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using our website and service, you agree to comply with and be bound by these Terms and
                Conditions. Please review them carefully. If you do not agree to these Terms, please do not use this
                website.
              </p>
            </CardContent>
          </Card>

          {/* Section 1: Acceptance of Terms */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                1. Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using this health hub platform, you acknowledge that you have read, understood, and
                agree to be bound by these Terms and Conditions. If you are using Health Hub on behalf of an
                organization, you represent and warrant that you have the authority to bind that organization to these
                Terms.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                <p className="text-blue-800 font-medium">
                  If you do not agree to these Terms, please discontinue use of the Platform immediately. Thank you!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Platform Description */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-6 w-6 text-blue-600 mr-3" />
                2. Platform Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Platform serves as a comprehensive health information hub providing access to various
                health-related services, resources, and educational content. The Platform connects users with healthcare
                information, services, and qualified healthcare providers across multiple health disciplines.
              </p>
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500 mb-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="font-semibold text-yellow-800">Important Medical Disclaimer</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always
                  seek the advice of your physician or other qualified health provider with any questions you may have
                  regarding a medical condition.
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="font-semibold text-red-800">Emergency Notice</span>
                </div>
                <p className="text-red-700 text-sm">
                  <strong>No emergency services</strong> - the Platform is "NOT for medical emergencies". In an
                  emergency, contact local emergency services immediately. Emergency numbers are available on the
                  homepage for such purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Medical Disclaimer */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 text-orange-600 mr-3" />
                3. Medical Disclaimer and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The information provided on this Platform is for educational and informational purposes only and does
                  not constitute medical advice, diagnosis, or treatment. The Platform does not replace professional
                  medical consultation, examination, or treatment.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Users should always consult with qualified healthcare professionals before making any health-related
                  decisions or changes to their treatment plans.
                </p>
                <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-orange-800 font-medium">
                    The Platform makes no representations or warranties regarding the accuracy, completeness, or
                    reliability of any health information provided. Individual results may vary, and the Platform
                    disclaims any liability for decisions made based on information obtained through the Platform.{" "}
                    <strong>You expressly agree that your use of this website is at your sole risk.</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Intellectual Property */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-6 w-6 text-purple-600 mr-3" />
                5. Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All content, design, graphics, logos, and software on the Service are the property of Health Hub or
                  its licensors, and are protected by copyright, trademark, and other intellectual property laws. You
                  may not use our trademarks without prior written permission.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Its content suppliers and is protected by international copyright laws. Users may not reproduce,
                  distribute, modify, or create derivative works of any Platform content without explicit written
                  permission.
                </p>
                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-purple-800">
                    Limited use of Platform content for personal, non-commercial purposes is permitted provided that all
                    proprietary notices remain intact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: User Responsibilities */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 text-green-600 mr-3" />
                6. User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    You are responsible for ensuring that any information you provide on this website is accurate,
                    complete, and up-to-date.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    You agree to use this website only for lawful purposes and in a manner that does not infringe the
                    rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    You agree not to use the website to transmit any material that is defamatory, offensive, or
                    otherwise objectionable, or that infringes the rights of others.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Privacy and Data Protection */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-6 w-6 text-blue-600 mr-3" />
                7. Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                User privacy is paramount to our operations. We collect, process, and store personal information in
                accordance with our Privacy Policy, which forms an integral part of these Terms. By using the Platform,
                you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Section 12: Termination & Indemnification */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                12. Termination & Indemnification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Termination</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Either party may terminate the user's access to the Platform at any time, with or without cause or
                    notice. Upon termination, your right to use the Platform ceases immediately. Provisions of these
                    Terms that by their nature should survive termination shall remain in effect after termination.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Indemnification</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Users agree to indemnify, defend, and hold harmless the Platform and its operators from and against
                    any claims, damages, losses, costs, and expenses arising from or relating to your use of the
                    Platform, violation of these Terms, or infringement of any rights of another party.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 13: Limitation of Liability */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 text-gray-600 mr-3" />
                13. Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  To the fullest extent permitted by applicable law, the Platform and its operators shall not be liable
                  for any indirect, incidental, special, consequential, or punitive damages arising from your use of the
                  Platform. This includes, but is not limited to, damages for loss of profits, data, or other intangible
                  losses.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-500">
                  <p className="text-gray-800 font-medium">
                    Our total liability for any claims arising from or relating to the Platform shall not exceed the
                    amount paid by you, if any, for accessing the Platform during the twelve months preceding the claim.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-blue-600 to-slate-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Phone className="h-6 w-6 mr-3" />
                13. Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 mb-4">If you have any questions about these Terms, please contact us at:</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-200" />
                  <div>
                    <p className="font-medium">HealthHub Support</p>
                    <p className="text-blue-100">healthhubconnect071@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-200" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-blue-100">+265 897976524</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Agreement */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms and Conditions constitute the entire agreement between you and the Platform regarding your
                  use of the services and supersede all prior agreements and understandings.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="outline" className="text-sm px-4 py-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    Last Updated: 07/11/2025
                  </Badge>
                </div>
              </div>
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
                  <p className="text-xs text-gray-400">Your Health Directory</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting Blantyre residents with trusted healthcare providers and wellness services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Medical Disclaimer
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
                  <Link href="/search" className="hover:text-white transition-colors">
                    Search Services
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
