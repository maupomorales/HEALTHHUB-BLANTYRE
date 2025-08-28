import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Blantyre Health Hub',
    short_name: 'HealthHub',
    description: 'Your complete health directory for Blantyre, Malawi',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/health-hub-logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}


