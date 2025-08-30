import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Blantyre Health Hub - Your Healthcare Directory",
  description: "Find healthcare providers, emergency services, and health resources in Blantyre, Malawi",
  keywords: "healthcare, Blantyre, Malawi, doctors, hospitals, emergency services",
  authors: [{ name: "Blantyre Health Hub" }],
  openGraph: {
    title: "Blantyre Health Hub",
    description: "Your trusted healthcare directory in Blantyre, Malawi",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
