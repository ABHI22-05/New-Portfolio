"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import {
  Server,
  Database,
  Cpu,
  ShieldCheck,
  Zap,
  Layers,
  GraduationCap,
  Code2,
  Workflow,
  Sparkles,
} from "lucide-react"

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-item",
        { y: 50, opacity: 0 },
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

  const corePillars = [
    {
      icon: Server,
      title: "Backend & Microservices",
      desc: "Architecting scalable Java & Spring Boot microservices with Spring Security, Spring Data JPA, and RESTful API Gateways engineered for low latency and high availability.",
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
    },
    {
      icon: Workflow,
      title: "Event Streaming & Caching",
      desc: "Implementing event-driven pipelines with Apache Kafka and RabbitMQ, combined with Redis multi-level caching strategies to eliminate database bottlenecks under peak load.",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    },
    {
      icon: Database,
      title: "Database Performance Tuning",
      desc: "Profiling slow queries with EXPLAIN plans, creating targeted composite indexes, eradicating N+1 query patterns, and enforcing cursor-based pagination to prevent OOM errors.",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    },
    {
      icon: Code2,
      title: "Full-Stack Frontend & UX",
      desc: "Building intuitive, responsive frontend client applications in React.js, Next.js, and TypeScript, connected seamlessly to backend RESTful services.",
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    },
  ]

  const stats = [
    { number: "2+", label: "Years in Production", detail: "Web & Microservices" },
    { number: "62%", label: "Latency Reduction", detail: "API Optimization" },
    { number: "5K+", label: "Concurrent Scale", detail: "E-Commerce Users" },
    { number: "0", label: "Defect Rate", detail: "Delivered Applications" },
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="about-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile Overview</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-item font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            About Abhishek Jena
          </motion.h2>

          <p className="about-item text-lg text-slate-200 max-w-2xl mx-auto">
            AI-First Full Stack Developer dedicated to building autonomous AI agent integrations, performant backend ecosystems, and mission-critical web applications.
          </p>
        </div>

        {/* Two Column Layout: Journey Narrative & Quick Facts */}
        <div className="grid md:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Main Bio Card */}
          <div className="about-item md:col-span-7 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/15 p-8 flex flex-col justify-between hover:border-purple-400/40 transition-all shadow-xl">
            <div>
              <h3 className="font-heading text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                Engineering Philosophy & Background
              </h3>

              <div className="space-y-4 text-slate-200 leading-relaxed text-sm md:text-base font-normal">
                <p>
                  I am an <strong className="text-white font-semibold">AI-First Full Stack Developer &amp; Co-Founder</strong> with 2+ years of hands-on experience building and scaling production web applications using <strong className="text-white font-semibold">Java, Spring Boot, React.js, Next.js, TypeScript, MySQL, Kafka, Redis, and OpenAI API</strong>.
                </p>
                <p>
                  At <strong className="text-purple-300 font-semibold">Medi Assist</strong>, I specialize in diagnosing complex latency bottlenecks, resolving memory leaks in long-running services, and eliminating N+1 queries. By rewriting data fetch strategies, adding query-matched composite indexing, and introducing cursor-based pagination, I cut critical endpoint response times by up to <strong className="text-emerald-300 font-semibold">62%</strong> and lowered heap usage by <strong className="text-emerald-300 font-semibold">38%</strong>.
                </p>
                <p>
                  As a venture co-founder and lead engineer, I architected and launched 3 live production platforms: <strong className="text-purple-300 font-semibold">Artistic Global</strong> (featuring the Monalisa AI Agent for talent booking), <strong className="text-purple-300 font-semibold">BHEL-MGCPL</strong> (mission-critical infrastructure monitoring and order telemetry portal), and <strong className="text-purple-300 font-semibold">BMA Content Hub</strong> (Africa&apos;s B2B audio-visual media discovery and content licensing marketplace powered by Broadcast Media Africa) — containerized with <strong className="text-white font-semibold">Docker</strong> and maintaining a zero-defect production rollout standard.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">Education:</span>
              <span className="px-3.5 py-1 bg-purple-950/80 border border-purple-400/40 rounded-full text-xs text-white font-medium">
                Master of Computer Applications (MCA) – Lovely Professional University
              </span>
            </div>
          </div>

          {/* Quick Strengths Highlights */}
          <div className="about-item md:col-span-5 grid gap-4">
            {corePillars.map((pillar, index) => {
              const IconComponent = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`p-5 rounded-xl bg-slate-950/80 border border-white/15 backdrop-blur-md transition-all duration-300 shadow-md`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="font-heading font-bold text-white text-base">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Quantified Metrics Showcase */}
        <div className="about-item grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.04, y: -4 }}
              className="p-6 bg-slate-950/80 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all text-center shadow-xl"
            >
              <div className="font-heading text-3xl md:text-4xl font-black text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-bold text-slate-200">{stat.label}</div>
              <div className="text-xs text-purple-300/80 font-medium mt-0.5">{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
