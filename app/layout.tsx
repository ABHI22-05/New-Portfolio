import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://abhishekjena.in'
const FULL_NAME = 'Abhishek Jena'
const TITLE = 'Abhishek Jena | AI-First Full Stack Developer & Co-Founder'
const DESCRIPTION =
  'Portfolio of Abhishek Jena — AI-First Full Stack Developer & Co-Founder with 2+ years of production experience building autonomous AI agents, Spring Boot microservices, React/Next.js platforms, Kafka event pipelines, Redis caching, and high-performance distributed systems. Open to senior engineering roles.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },

  description: DESCRIPTION,

  keywords: [
    'Abhishek Jena',
    'AI-First Full Stack Developer',
    'Full Stack Developer India',
    'Java Spring Boot Developer',
    'React Next.js Developer',
    'Co-Founder AI Platform',
    'AI Agent Developer',
    'Monalisa AI Agent',
    'Artistic Global',
    'BHEL MGCPL Portal',
    'BMA Content Hub',
    'Medi Assist Developer',
    'Kafka Microservices',
    'Redis Caching',
    'Docker AWS DevOps',
    'MCA LPU Graduate',
    'Software Engineer Portfolio',
    'Hire Full Stack Developer',
    'Senior Software Engineer India',
    'abhishekjena.in',
  ],

  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,

  // Canonical & robots
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: FULL_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — AI-First Full Stack Developer`,
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
    creator: '@abhishekjena',
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },

  // Web manifest
  manifest: '/site.webmanifest',

  // Verification (add your Search Console token here)
  // verification: { google: 'YOUR_GSC_VERIFICATION_TOKEN' },
}

// JSON-LD — Person schema (biggest SEO win for personal portfolios)
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: FULL_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: 'AI-First Full Stack Developer & Co-Founder',
  description: DESCRIPTION,
  email: 'abhishekjavafs@gmail.com',
  telephone: '+91-8458017680',
  nationality: 'Indian',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Lovely Professional University',
    url: 'https://www.lpu.in',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Medi Assist',
    url: 'https://www.mediassist.in',
  },
  sameAs: [
    'https://github.com/ABHI22-05',
    'https://www.linkedin.com/in/05-abhi',
    SITE_URL,
  ],
  knowsAbout: [
    'Java', 'Spring Boot', 'React.js', 'Next.js', 'TypeScript',
    'AI Agents', 'Kafka', 'Redis', 'Docker', 'AWS',
    'Microservices Architecture', 'Database Optimization',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Theme colour for mobile browsers */}
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="color-scheme" content="dark" />

        {/* Geo tags for India-based searches */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}
