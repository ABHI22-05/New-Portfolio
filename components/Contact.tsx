"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Code2,
  Copy,
  Check,
  Send,
  MapPin,
  Sparkles,
  ExternalLink,
} from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 4000)
  }

  const contactCards = [
    {
      key: "email",
      icon: Mail,
      label: "Email Address",
      value: "abhishekjavafs@gmail.com",
      href: "mailto:abhishekjavafs@gmail.com",
      copyable: true,
    },
    {
      key: "phone",
      icon: Phone,
      label: "Phone Number",
      value: "+91-8458017680",
      href: "tel:+918458017680",
      copyable: true,
    },
    {
      key: "linkedin",
      icon: Linkedin,
      label: "LinkedIn Profile",
      value: "linkedin.com/in/05-abhi",
      href: "https://www.linkedin.com/in/05-abhi",
      copyable: false,
    },
    {
      key: "github",
      icon: Github,
      label: "GitHub Repositories",
      value: "github.com/ABHI22-05",
      href: "https://github.com/ABHI22-05",
      copyable: false,
    },
    {
      key: "leetcode",
      icon: Code2,
      label: "LeetCode Problem Solving",
      value: "leetcode.com (DSA Profile)",
      href: "https://leetcode.com",
      copyable: false,
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Let's Build Something Exceptional
          </motion.h2>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Open to senior engineering roles, microservices architecture discussions, and exciting full-stack opportunities.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <div className="contact-element lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/20 mb-6 shadow-xl">
              <h3 className="font-heading text-xl font-bold text-white mb-2">Abhishek Jena</h3>
              <p className="text-sm text-slate-200 mb-4 leading-relaxed font-normal">
                AI-First Full Stack Developer specialized in autonomous AI agents, Spring Boot, React, Next.js, Kafka, Redis, and high-performance system architecture.
              </p>
              <div className="flex items-center gap-2 text-xs text-purple-300 font-medium">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>India • Available for Remote & Onsite Roles</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            {contactCards.map((card) => {
              const Icon = card.icon
              const isCopied = copiedKey === card.key

              return (
                <div
                  key={card.key}
                  className="p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 hover:border-purple-400/50 transition-all duration-300 flex items-center justify-between group shadow-md"
                >
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3.5 flex-1 min-w-0"
                  >
                    <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 group-hover:text-white group-hover:bg-purple-600 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
                        {card.label}
                      </div>
                      <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                        {card.value}
                      </div>
                    </div>
                  </a>

                  {card.copyable ? (
                    <button
                      onClick={() => copyToClipboard(card.value, card.key)}
                      className="p-2 ml-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-white border border-white/10 transition-all text-xs flex items-center gap-1 shrink-0"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px] text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ) : (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 ml-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-white border border-white/10 transition-all shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column: Send a Message Form */}
          <div className="contact-element lg:col-span-7 bg-slate-950/85 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8 md:p-10 shadow-2xl">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-sm text-slate-200 mb-8 font-normal">
              Leave your details below and I will get back to you promptly.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-purple-950/60 border border-purple-400/50 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-xl font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-200">
                  Thank you for reaching out. I will respond to your email shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 text-sm bg-slate-900 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 text-sm bg-slate-900 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Stack Opportunity / Project Collaboration"
                    className="w-full px-4 py-3 text-sm bg-slate-900 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, system requirements, or project scope..."
                    className="w-full px-4 py-3 text-sm bg-slate-900 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors resize-none shadow-inner"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="contact-element mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} Abhishek Jena. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-medium">
            <a
              href="https://github.com/ABHI22-05"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub: ABHI22-05
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/in/05-abhi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <span>Built with Next.js, Framer Motion & Tailwind</span>
          </div>
        </div>
      </div>
    </section>
  )
}
