"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight, Terminal, Sparkles } from "lucide-react"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 140

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-lg border-b border-purple-500/20"
    >
      <div className="container mx-auto px-6 py-3.5">
        <div className="flex justify-between items-center">
          {/* Brand Name - No Logo Icon */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-left group transition-all py-1"
          >
            <span className="font-heading text-xl font-bold text-white group-hover:text-purple-300 transition-colors block tracking-tight">
              Abhishek Jena
            </span>
            <span className="text-[10px] font-mono text-purple-300/80 uppercase tracking-wider block font-medium">
              AI-First Full Stack Developer &amp; Co-Founder
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "text-purple-300 bg-purple-950/40 border border-purple-500/30"
                    : "text-purple-200/70 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition-all"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-purple-500/20 text-purple-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-black/95 border-b border-purple-500/20 px-6 py-4 space-y-2 backdrop-blur-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                  activeSection === item.id
                    ? "text-purple-300 bg-purple-900/30 border border-purple-500/30"
                    : "text-purple-200/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                )}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
