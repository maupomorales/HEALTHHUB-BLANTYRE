import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Clock, ArrowLeft, Share2, BookmarkPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPostPage() {
  const post = {
    id: 1,
    title: "Understanding Malaria Prevention in Blantyre",
    category: "Prevention",
    date: "January 15, 2025",
    readTime: "5 min read",
    author: "Dr. Sarah Banda",
    image: "/modern-hospital-exterior.png",
    content: `
      <p>Malaria remains one of the most significant health challenges in Blantyre and throughout Malawi. Understanding how to prevent malaria is crucial for protecting yourself and your family, especially during the rainy season when mosquito populations increase dramatically.</p>

      <h2>Why Malaria Prevention Matters</h2>
      <p>Malaria is caused by parasites transmitted through the bites of infected female Anopheles mosquitoes. In Blantyre, the disease affects thousands of people annually, particularly children under five and pregnant women who are most vulnerable to severe complications.</p>

      <h2>Key Prevention Strategies</h2>
      
      <h3>1. Sleep Under Insecticide-Treated Nets (ITNs)</h3>
      <p>Sleeping under an insecticide-treated mosquito net is one of the most effective ways to prevent malaria. These nets create a protective barrier and kill mosquitoes that come into contact with them. Ensure every member of your family has their own net, and replace nets every 2-3 years or when they develop holes.</p>

      <h3>2. Indoor Residual Spraying (IRS)</h3>
      <p>Indoor residual spraying involves applying insecticides to the walls and ceilings of homes. This method provides protection for several months and is often conducted by health authorities in high-risk areas. Contact your local health center to find out when IRS is scheduled in your area.</p>

      <h3>3. Eliminate Standing Water</h3>
      <p>Mosquitoes breed in standing water. Regularly check your compound for containers that collect water, such as buckets, old tires, and blocked gutters. Empty or cover these containers to prevent mosquitoes from laying eggs.</p>

      <h3>4. Use Mosquito Repellents</h3>
      <p>Apply mosquito repellent to exposed skin, especially during dawn and dusk when mosquitoes are most active. Products containing DEET, picaridin, or IR3535 are most effective. Reapply according to the product instructions.</p>

      <h3>5. Wear Protective Clothing</h3>
      <p>When outdoors during peak mosquito hours, wear long-sleeved shirts and long trousers. Light-colored clothing is preferable as mosquitoes are attracted to dark colors.</p>

      <h2>Recognizing Malaria Symptoms</h2>
      <p>Early detection and treatment are crucial. Common symptoms include:</p>
      <ul>
        <li>High fever and chills</li>
        <li>Severe headache</li>
        <li>Body aches and fatigue</li>
        <li>Nausea and vomiting</li>
        <li>Sweating</li>
      </ul>

      <p>If you or a family member experiences these symptoms, seek medical attention immediately. Malaria can be effectively treated if diagnosed early.</p>

      <h2>Where to Get Help in Blantyre</h2>
      <p>Several healthcare facilities in Blantyre provide malaria testing and treatment:</p>
      <ul>
        <li>Queen Elizabeth Central Hospital - 24/7 emergency services</li>
        <li>Blantyre Adventist Hospital - Comprehensive malaria care</li>
        <li>Local health centers in your area - Free testing and treatment</li>
      </ul>

      <h2>Community Responsibility</h2>
      <p>Malaria prevention is a community effort. Work with your neighbors to maintain clean surroundings, participate in community spraying programs, and share prevention knowledge with others. Together, we can reduce malaria cases in Blantyre.</p>

      <h2>Conclusion</h2>
      <p>By following these prevention strategies consistently, you can significantly reduce your risk of contracting malaria. Remember, prevention is always better than treatment. Stay vigilant, especially during the rainy season, and encourage your family and neighbors to adopt these protective measures.</p>
    `,
  }

  const relatedPosts = [
    { id: 2, title: "Nutrition Tips for Healthy Living", category: "Nutrition" },
    { id: 3, title: "Mental Health Awareness", category: "Mental Health" },
    { id: 4, title: "Childhood Vaccination Guide", category: "Child Health" },
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
                <p className="text-xs text-gray-600">Health Information & Resources</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/blog" className="text-blue-600 font-medium">
                Blog
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="py-4 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.readTime}
            </div>
            <div>By {post.author}</div>
          </div>

          <div className="flex gap-3 mb-8">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <BookmarkPlus className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-sm">Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                This article is for informational purposes only and does not constitute medical advice. Always consult
                with a qualified healthcare professional for medical concerns. If you experience severe symptoms, seek
                immediate medical attention.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <Badge variant="secondary" className="mb-2">
                      {relatedPost.category}
                    </Badge>
                    <CardTitle className="text-base">{relatedPost.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
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
