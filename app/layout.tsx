import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Abhishek Jena | AI-First Full Stack Developer & Co-Founder | Spring Boot, React, AI Agents",
  description:
    "Portfolio of Abhishek Jena, AI-First Full Stack Developer & Co-Founder with 2+ years of production experience building autonomous AI agents, Spring Boot microservices, React/Next.js platforms, Kafka, Redis, and high-performance distributed systems.",
  keywords: [
    "Abhishek Jena",
    "AI-First Full Stack Developer",
    "Co-Founder",
    "AI Agents",
    "Monalisa AI",
    "Spring Boot Developer",
    "React.js Developer",
    "Next.js Developer",
    "Kafka",
    "Redis",
    "Microservices",
    "Artistic Global",
    "BHEL-MGCPL",
    "BMA Content Hub",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Abhishek Jena", url: "https://github.com/ABHI22-05" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Abhishek Jena | AI-First Full Stack Developer & Co-Founder",
    description:
      "AI-First Full Stack Developer & Co-Founder specialized in autonomous AI agents, Spring Boot, React, Next.js, Kafka, Redis, and high-throughput microservices architecture.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}
