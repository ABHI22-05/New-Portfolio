"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import ThreeScene from "./ThreeScene"
import {
  ArrowDown,
  Briefcase,
  Layers,
  Sparkles,
  Send,
  Zap,
  CheckCircle,
} from "lucide-react"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out" }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const corePills = [
    "AI Agents",
    "Java",
    "Spring Boot",
    "Next.js",
    "React.js",
    "TypeScript",
    "Kafka",
    "Redis",
    "Docker",
    "AWS",
  ]

  const heroMetrics = [
    { label: "Production Exp", value: "2+ Years", detail: "AI & Full-Stack Systems" },
    { label: "API Latency Cut", value: "62%", detail: "Eager Fetch & Caching" },
    { label: "Concurrent Scale", value: "5K+", detail: "E-Commerce & Portals" },
    { label: "Event Pipeline", value: "50K+", detail: "Daily Kafka Events" },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
    >
      {/* 3D Interactive Neural Particle Matrix */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
        <ThreeScene />
      </div>

      {/* Atmospheric lighting gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-700/20 via-indigo-600/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="hero-element inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 backdrop-blur-md mb-6 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-purple-200 tracking-wide">
            Available for Senior AI & Full-Stack Engineering Roles
          </span>
        </motion.div>

        {/* Main Name Heading */}
        <div className="hero-element mb-4">
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-sm">
            ABHISHEK JENA
          </h1>
        </div>

        {/* Role & Title */}
        <div className="hero-element mb-6 flex items-center gap-3 justify-center">
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-purple-400" />
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-300 tracking-tight">
            AI-First Full Stack Developer &amp; Co-Founder
          </h2>
          <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-purple-400" />
        </div>

        {/* Narrative Description */}
        <p className="hero-element text-base sm:text-lg lg:text-xl text-slate-200 font-normal max-w-3xl mb-8 leading-relaxed">
          Engineering intelligent, high-throughput applications with <strong className="text-white font-semibold">Java, Spring Boot, React, Next.js, and autonomous AI agents</strong>. Co-founder behind real-world production platforms including <strong className="text-purple-300 font-semibold">Artistic Global</strong>, <strong className="text-purple-300 font-semibold">BHEL-MGCPL</strong>, and <strong className="text-purple-300 font-semibold">BMA Content Hub</strong>, with expertise in Kafka streaming, Redis caching, and database performance tuning.
        </p>

        {/* Core Tech Stack Badges */}
        <div className="hero-element flex flex-wrap justify-center gap-2.5 max-w-2xl mb-10">
          {corePills.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-purple-400/40 text-xs sm:text-sm text-slate-100 font-medium hover:border-purple-300 hover:bg-purple-900/50 transition-all duration-200 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Call to Actions */}
        <div className="hero-element flex flex-wrap items-center justify-center gap-4 mb-14">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToSection("experience")}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-semibold text-sm shadow-xl flex items-center gap-2 border border-purple-400/40"
          >
            <Briefcase className="w-4 h-4" />
            <span>Explore Experience</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "rgba(147, 51, 234, 0.25)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToSection("projects")}
            className="px-7 py-3.5 rounded-full border border-purple-400/50 bg-slate-900/80 backdrop-blur-sm text-slate-100 hover:text-white font-semibold text-sm flex items-center gap-2 shadow-md"
          >
            <Layers className="w-4 h-4" />
            <span>View Projects</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollToSection("contact")}
            className="px-6 py-3.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-purple-300" />
            <span>Contact Me</span>
          </motion.button>
        </div>

        {/* Quantified Metrics Quick Bar - High Contrast */}
        <div className="hero-element w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-950/85 border border-purple-500/30 backdrop-blur-xl shadow-2xl">
          {heroMetrics.map((item, idx) => (
            <div
              key={idx}
              className="p-3 text-center border-r last:border-r-0 border-purple-500/20 flex flex-col items-center justify-center"
            >
              <div className="font-heading text-2xl sm:text-3xl font-black text-white">
                {item.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1">{item.label}</div>
              <div className="text-[11px] text-purple-300/80 font-medium mt-0.5">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Down arrow scroll indicator */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-purple-300/60 hover:text-purple-200 flex flex-col items-center gap-1 transition-colors"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  )
}
