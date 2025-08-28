import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: {
    default: 'Blantyre Health Hub',
    template: '%s · Blantyre Health Hub',
  },
  applicationName: 'Blantyre Health Hub',
  description: 'Your complete health directory for Blantyre, Malawi',
  generator: 'v0.dev',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  icons: {
    icon: [
      { url: '/health-hub-logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' }
    ],
    apple: [
      { url: '/health-hub-logo.svg', type: 'image/svg+xml' },
      { url: '/logo.png' }
    ],
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Blantyre Health Hub',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <SonnerToaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
