import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Malaria Prevention in Blantyre",
      excerpt:
        "Learn about effective malaria prevention strategies and how to protect your family during the rainy season in Malawi.",
      category: "Prevention",
      date: "January 15, 2025",
      readTime: "5 min read",
      image: "/modern-hospital-exterior.png",
    },
    {
      id: 2,
      title: "Nutrition Tips for Healthy Living",
      excerpt:
        "Discover essential nutrition advice tailored for Malawian families to maintain optimal health and wellness.",
      category: "Nutrition",
      date: "January 12, 2025",
      readTime: "7 min read",
      image: "/pharmacy-interior.png",
    },
    {
      id: 3,
      title: "Mental Health Awareness: Breaking the Stigma",
      excerpt: "Understanding mental health challenges and available resources in Blantyre for support and treatment.",
      category: "Mental Health",
      date: "January 10, 2025",
      readTime: "6 min read",
      image: "/modern-clinic-waiting-area.png",
    },
    {
      id: 4,
      title: "Childhood Vaccination Schedule Guide",
      excerpt:
        "Complete guide to childhood vaccinations available in Blantyre and why they're important for your child's health.",
      category: "Child Health",
      date: "January 8, 2025",
      readTime: "8 min read",
      image: "/dental-clinic.png",
    },
    {
      id: 5,
      title: "Managing Diabetes Through Diet",
      excerpt: "Practical dietary advice for managing diabetes with locally available foods in Malawi.",
      category: "Chronic Disease",
      date: "January 5, 2025",
      readTime: "6 min read",
      image: "/optician.png",
    },
    {
      id: 6,
      title: "Staying Active: Exercise Tips for All Ages",
      excerpt: "Simple and effective exercise routines you can do at home or in your community to stay healthy.",
      category: "Fitness",
      date: "January 3, 2025",
      readTime: "5 min read",
      image: "/gym-fitness.png",
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

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Health & Wellness Blog</h1>
          <p className="text-lg">Explore our collection of health articles, tips, and medical insights</p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-100">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 text-sm">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Read Full Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Sidebar */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Browse by Category</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              "General Health",
              "Nutrition",
              "Child Health",
              "Mental Health",
              "Prevention",
              "Chronic Disease",
              "Fitness",
              "Women's Health",
            ].map((category) => (
              <Link key={category} href={`/blog?category=${category.toLowerCase().replace(" ", "-")}`}>
                <div className="p-4 border rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                  <p className="font-medium text-gray-900">{category}</p>
                </div>
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
