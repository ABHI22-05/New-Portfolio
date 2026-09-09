"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import {
  ShoppingCart,
  Sparkles,
  Bot,
  Activity,
  Layers,
  Database,
  Server,
  Zap,
  ExternalLink,
  Github,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Tv,
  Globe,
  Film,
} from "lucide-react"

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "ai" | "kafka" | "stack">("overview")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-element",
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

  const sneakerheadHighlights = [
    {
      metric: "5K+",
      label: "Concurrent Users",
      desc: "Supported across catalog, checkout & cart services",
    },
    {
      metric: "50K+",
      label: "Daily Events",
      desc: "Asynchronously processed via Apache Kafka",
    },
    {
      metric: "40%",
      label: "API Latency Cut",
      desc: "Achieved through Redis caching & MySQL index tuning",
    },
    {
      metric: "Vector Search",
      label: "AI Recommendation",
      desc: "OpenAI embeddings & cosine similarity rankings",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Flagship Project & System Architecture
          </motion.h2>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Deep dive into end-to-end distributed system implementations featuring event streaming, AI embeddings, and database performance optimizations.
          </p>
        </div>

        {/* FLAGSHIP PROJECT: SNEAKERHEAD */}
        <div className="project-element bg-slate-950/85 backdrop-blur-xl rounded-3xl border border-purple-500/40 p-8 md:p-12 shadow-2xl mb-12">
          {/* Top Bar / Meta */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/50 text-xs font-bold text-purple-300 uppercase tracking-wide">
                  Flagship Architecture
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-xs font-bold text-emerald-300">
                  Production Ready
                </span>
              </div>
              <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Sneakerhead – AI-Powered E-Commerce Platform
              </h3>
              <p className="text-slate-200 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
                A scalable, distributed full-stack e-commerce ecosystem built with Spring Boot microservices, React.js, Apache Kafka, Redis, and OpenAI vector embeddings.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ABHI22-05"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/20 hover:border-purple-400/60 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/30 transition-all"
              >
                <span>Request Demo</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {sneakerheadHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-center flex flex-col justify-center shadow-md"
              >
                <span className="font-heading text-2xl md:text-3xl font-black text-white">
                  {item.metric}
                </span>
                <span className="text-xs font-bold text-slate-200 mt-1">{item.label}</span>
                <span className="text-[11px] text-purple-300 font-medium mt-0.5">{item.desc}</span>
              </div>
            ))}
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
            {[
              { id: "overview", label: "Core Microservices", icon: Layers },
              { id: "ai", label: "AI Recommendations & Chatbot", icon: Bot },
              { id: "kafka", label: "Kafka Events & Redis Caching", icon: Activity },
              { id: "stack", label: "Full Architecture Stack", icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon
              const isSelected = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-slate-900/80 text-slate-200 hover:text-white hover:bg-slate-800 border border-white/15"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="min-h-[220px]">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Scalable Microservices Architecture</span>
                  </h4>
                  <p className="text-sm text-purple-100/80 leading-relaxed">
                    Designed and built a modular distributed platform with dedicated services for product catalog, shopping cart, order placement, payments, and real-time inventory management, capable of supporting <strong>5K+ concurrent users</strong>.
                  </p>
                  <ul className="space-y-2 text-xs text-purple-200/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>RESTful APIs with Spring Boot, Spring Security, and JWT stateless authentication.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Idempotent payment and order settlement endpoints preventing duplicate transactions.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/20 flex flex-col justify-center">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2">
                    Key Infrastructure Metrics
                  </span>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                      <span className="text-purple-200/70">Target Concurrency</span>
                      <span className="text-white font-semibold">5,000+ Concurrent Sessions</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                      <span className="text-purple-200/70">Database Engine</span>
                      <span className="text-white font-semibold">MySQL with Connection Pooling</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                      <span className="text-purple-200/70">Containerization</span>
                      <span className="text-white font-semibold">Docker & Docker Compose on AWS</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-200/70">Frontend</span>
                      <span className="text-white font-semibold">React.js, Tailwind CSS, Responsive UI</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "ai" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span>OpenAI Embeddings & Vector Search</span>
                  </h4>
                  <p className="text-sm text-purple-100/80 leading-relaxed">
                    Integrated an intelligent recommendation engine powered by OpenAI text embeddings and vector similarity calculations. Customers receive context-aware shoe recommendations based on semantic product preferences rather than simple keyword matches.
                  </p>
                  <ul className="space-y-2 text-xs text-purple-200/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Vector similarity search mapping complex user preferences to catalog items.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Conversational AI chatbot assisting users with live order tracking and product Q&A.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/20">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-3 block">
                    AI Capabilities Highlights
                  </span>
                  <div className="space-y-2 text-xs text-purple-100/80">
                    <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20">
                      <strong className="text-white block mb-0.5">Semantic Vector Embeddings</strong>
                      OpenAI text-embedding models convert catalog attributes into dense vector spaces.
                    </div>
                    <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20">
                      <strong className="text-white block mb-0.5">Natural Language Order Assistant</strong>
                      Fine-tuned prompt engineering handles queries like "where is my sneaker order from Tuesday?".
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "kafka" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    <span>Event-Driven Kafka Architecture & Redis</span>
                  </h4>
                  <p className="text-sm text-purple-100/80 leading-relaxed">
                    Designed an asynchronous event-driven workflow using <strong>Apache Kafka</strong> to decouple order ingestion from inventory decrementing and billing. Combined with Redis multi-level caching, this reduced API latency by <strong>40%</strong> while processing <strong>50,000+ events daily</strong>.
                  </p>
                  <ul className="space-y-2 text-xs text-purple-200/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Non-blocking message queues preventing checkout thread starvation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Redis caching layer with write-through invalidation for sub-10ms catalog reads.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/20 flex flex-col justify-center">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2">
                    Pipeline Performance Metrics
                  </span>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                      <span className="text-purple-200/70">Daily Event Throughput</span>
                      <span className="text-emerald-300 font-semibold">50,000+ Events/Day</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                      <span className="text-purple-200/70">API Latency Improvement</span>
                      <span className="text-emerald-300 font-semibold">-40% Latency Drop</span>
                    </div>
                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                      <span className="text-purple-200/70">Broker Architecture</span>
                      <span className="text-white font-semibold">Kafka Topic Partitions with Consumer Groups</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-200/70">Cache Layer</span>
                      <span className="text-white font-semibold">Redis Cluster with TTL Eviction</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "stack" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { title: "Backend Core", items: ["Java 17", "Spring Boot", "Spring Data JPA", "Hibernate"] },
                  { title: "Event & Cache", items: ["Apache Kafka", "Redis", "Message Queues", "Async Workers"] },
                  { title: "Frontend & AI", items: ["React.js", "Tailwind CSS", "OpenAI Embeddings", "Chatbot LLM"] },
                  { title: "Cloud & Data", items: ["MySQL 8.0", "Docker", "AWS EC2 / S3", "Swagger / OpenAPI"] },
                ].map((col, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/40 border border-purple-500/20">
                    <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
                      {col.title}
                    </h5>
                    <ul className="space-y-1.5">
                      {col.items.map((item) => (
                        <li key={item} className="text-xs text-white/80 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Tech Badges Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-purple-300/80 font-semibold mr-2">Technologies:</span>
              {[
                "Spring Boot",
                "React.js",
                "MySQL",
                "Redis",
                "Kafka",
                "Docker",
                "AWS",
                "OpenAI API",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-purple-950/50 border border-purple-500/30 rounded-lg text-xs text-purple-200 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="text-xs text-purple-300/60 font-mono">
              Architecture ID: SNK-PROD-2024
            </span>
          </div>
        </div>

        {/* Real-World Co-Founded Production Deployments */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/70 border border-indigo-400/40 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Co-Founded Ventures &amp; Production Deployments</span>
          </div>
          <h4 className="font-heading text-2xl md:text-3xl font-black text-white tracking-tight">
            Client Production Systems &amp; Co-Founded Platforms
          </h4>
          <p className="text-sm md:text-base text-slate-200 mt-1 max-w-3xl">
            Live enterprise and consumer web applications co-founded, architected, and delivered into production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* Card 1: Artistic Global */}
          <motion.div
            whileHover={{ y: -6 }}
            className="project-element p-7 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-purple-500/35 hover:border-purple-400/70 transition-all duration-300 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Platform
                </span>
                <span className="text-[11px] font-mono text-purple-300/90 font-bold px-2 py-0.5 rounded bg-purple-950/70 border border-purple-500/30">
                  Co-Founder &amp; AI Lead
                </span>
              </div>

              <h4 className="font-heading text-xl md:text-2xl font-black text-white mb-2 leading-tight">
                Artistic Global – AI Talent Marketplace
              </h4>

              <p className="text-xs md:text-sm text-slate-200 leading-relaxed mb-5">
                Full-stack marketplace connecting event creators with elite artists, rental equipment packages, booking calendar, and an autonomous AI Agent named <strong>Monalisa</strong> (powered by Artistic AI).
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30">
                  <div className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                    <span>Monalisa AI</span>
                  </div>
                  <div className="text-[11px] text-purple-300/80 mt-0.5">Autonomous Agent</div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live Booking</span>
                  </div>
                  <div className="text-[11px] text-purple-300/80 mt-0.5">Calendar &amp; Rent</div>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Integrated Monalisa AI for natural language talent matching &amp; queries.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Engineered interactive booking scheduler and rental equipment packages.</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-5">
                {["Next.js", "React", "AI Agent", "Tailwind", "Calendar API"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-[11px] text-purple-200 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="https://artistic.global/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all group"
              >
                <span>Visit artistic.global</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: BHEL-MGCPL */}
          <motion.div
            whileHover={{ y: -6 }}
            className="project-element p-7 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-blue-500/35 hover:border-blue-400/70 transition-all duration-300 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Enterprise Portal
                </span>
                <span className="text-[11px] font-mono text-blue-300/90 font-bold px-2 py-0.5 rounded bg-blue-950/70 border border-blue-500/30">
                  Co-Founder &amp; Architect
                </span>
              </div>

              <h4 className="font-heading text-xl md:text-2xl font-black text-white mb-2 leading-tight">
                BHEL-MGCPL – Industrial Monitoring System
              </h4>

              <p className="text-xs md:text-sm text-slate-200 leading-relaxed mb-5">
                Mission-critical enterprise monitoring, procurement, and order management platform built for <strong>MG Contractors Pvt. Ltd.</strong> for <strong>BHEL</strong> infrastructure projects with multi-domain authentication.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-500/30">
                  <div className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>RBAC &amp; OPV</span>
                  </div>
                  <div className="text-[11px] text-blue-300/80 mt-0.5">Strict Domain Auth</div>
                </div>

                <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-500/30">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Telemetry</span>
                  </div>
                  <div className="text-[11px] text-blue-300/80 mt-0.5">Order Tracking</div>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Real-time tracking of contractor orders, project milestones &amp; heavy equipment.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Zero-vulnerability credential validation and session token encryption.</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-5">
                {["Next.js Turbopack", "TypeScript", "RBAC", "Telemetry", "Docker"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-blue-950/60 border border-blue-500/30 text-[11px] text-blue-200 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="https://bhel.mgcpl.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all group"
              >
                <span>Visit bhel.mgcpl.com</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 3: BMA Content Hub */}
          <motion.div
            whileHover={{ y: -6 }}
            className="project-element p-7 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-amber-500/35 hover:border-amber-400/70 transition-all duration-300 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  B2B Marketplace
                </span>
                <span className="text-[11px] font-mono text-amber-300/90 font-bold px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/30">
                  Co-Founder &amp; Architect
                </span>
              </div>

              <h4 className="font-heading text-xl md:text-2xl font-black text-white mb-2 leading-tight">
                BMA Content Hub – Media Discovery &amp; Licensing
              </h4>

              <p className="text-xs md:text-sm text-slate-200 leading-relaxed mb-5">
                Africa&apos;s B2B audio-visual marketplace powered by <strong>Broadcast Media Africa</strong> for discovering, licensing, and syndicating premium television, film, and news content.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/30">
                  <div className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>Media Catalogue</span>
                  </div>
                  <div className="text-[11px] text-amber-300/80 mt-0.5">Search &amp; Filter Engine</div>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/30">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Licensing Hub</span>
                  </div>
                  <div className="text-[11px] text-amber-300/80 mt-0.5">Pan-African B2B</div>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Multi-parameter media discovery by genre, country of origin, and distribution rights.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>B2B listing submissions, broadcaster partnership portals, and theme switching.</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-5">
                {["Next.js App Router", "React", "TypeScript", "Tailwind CSS", "Licensing Engine"].map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/30 text-[11px] text-amber-200 font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="https://contenthub.broadcastmediaafrica.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition-all group"
              >
                <span>Visit contenthub.broadcastmediaafrica.com</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
