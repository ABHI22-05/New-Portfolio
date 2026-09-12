"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import {
  Briefcase,
  Zap,
  Database,
  Cpu,
  ShieldCheck,
  TrendingDown,
  Layers,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Terminal,
  Bot,
} from "lucide-react"

interface MetricBadge {
  label: string
  value: string
  sub?: string
}

interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  type: string
  summary: string
  metrics: MetricBadge[]
  achievements: {
    title: string
    description: string
    tech: string[]
    icon: any
    highlightMetric?: string
  }[]
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<string>("medi-assist")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-card",
        { y: 28, opacity: 0, filter: "blur(3px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const experiences: ExperienceItem[] = [
    {
      id: "medi-assist",
      role: "Full Stack Developer",
      company: "Medi Assist",
      location: "India",
      period: "Present",
      type: "Full-Time",
      summary:
        "Driving backend performance, microservices resilience, query optimization, and high-concurrency API stability on enterprise healthcare platforms.",
      metrics: [
        { label: "API Latency Drop", value: "62%", sub: "850ms → 320ms" },
        { label: "DB Round-trips", value: "-70%", sub: "Batch & Cache" },
        { label: "Heap Memory Cut", value: "38%", sub: "Leak Resolution" },
        { label: "Query Speedup", value: "23x", sub: "4.2s → 180ms" },
      ],
      achievements: [
        {
          title: "N+1 Query Resolution & Eager Fetch Strategy",
          description:
            "Diagnosed recurring N+1 query problem on high-traffic endpoints where a single request silently triggered hundreds of extra lazy-loaded queries; rewrote fetch strategy to eager-load related entities in one query, cutting API response time by 62% (from 850ms to 320ms).",
          tech: ["Java", "Spring Data JPA", "Hibernate", "REST APIs"],
          icon: Zap,
          highlightMetric: "-62% API Latency",
        },
        {
          title: "High-Traffic Query Batching & Read Caching",
          description:
            "Identified that a rapidly growing user base caused excessive database queries per request on list/dashboard endpoints; batched queries and introduced caching for repeat reads, reducing average DB round-trips per request by 70% and cutting page load time by 45%.",
          tech: ["Spring Boot", "Redis", "MySQL", "Connection Pooling"],
          icon: Database,
          highlightMetric: "45% Faster Page Load",
        },
        {
          title: "Background Service Memory Leak Resolution",
          description:
            "Traced a memory leak in a long-running background service back to unclosed resources and an unbounded in-memory cache; fixed resource cleanup and added cache eviction limits, bringing heap usage down by 38% and eliminating recurring service restarts.",
          tech: ["Java", "JVM Tuning", "Garbage Collection", "SLF4J"],
          icon: Cpu,
          highlightMetric: "38% Lower Heap Usage",
        },
        {
          title: "Cursor-Based Pagination & OOM Prevention",
          description:
            "Identified missing pagination on an endpoint returning full table scans to the frontend, causing timeouts under load; implemented cursor-based pagination and response size limits, reducing endpoint latency by 55% and preventing OOM errors during peak traffic.",
          tech: ["Spring Boot", "REST APIs", "MySQL", "React.js"],
          icon: Layers,
          highlightMetric: "-55% Latency",
        },
        {
          title: "Slow Query Execution Plan & Composite Indexing",
          description:
            "Analyzed query execution plans (EXPLAIN) behind slow reporting queries flagged by users; designed and added composite indexes matching actual query patterns, slashing query runtime from 4.2s down to 180ms.",
          tech: ["MySQL", "Query Optimization", "Indexing Strategy"],
          icon: Database,
          highlightMetric: "4.2s → 180ms",
        },
        {
          title: "Write-Triggered Cache Invalidation Bug Fix",
          description:
            "Uncovered a stale cache bug causing users to see outdated data after updates; engineered cache invalidation logic to trigger atomically on writes, eliminating the class of reported data-inconsistency bugs.",
          tech: ["Redis", "Spring Cache", "Data Consistency"],
          icon: RefreshIcon,
          highlightMetric: "Zero Stale Reads",
        },
        {
          title: "Root Cause Incident Analysis & MTTR Reduction",
          description:
            "Debugged intermittent production incidents by tracing logs, distributed stack traces, and slow-query plans back to root causes, cutting average incident resolution time (MTTR) by 40%.",
          tech: ["Log4j/SLF4J", "SonarQube", "Production Support"],
          icon: Terminal,
          highlightMetric: "40% Lower MTTR",
        },
        {
          title: "Endpoint Role Checks & RBAC Hardening",
          description:
            "Tightened access control after discovering gaps in role checks on several internal endpoints, hardening authentication and closing unauthorized-access risk down to zero reported incidents.",
          tech: ["Spring Security", "JWT", "RBAC", "API Security"],
          icon: ShieldCheck,
          highlightMetric: "0 Security Incidents",
        },
      ],
    },
    {
      id: "freelance",
      role: "Co-Founder & Lead Engineer",
      company: "Venture Platforms & Co-Founder",
      location: "Remote / Hybrid",
      period: "1.5+ Years",
      type: "Co-Founder & Production Deployments",
      summary:
        "Co-founded and delivered 3 live production systems across AI agents, enterprise infrastructure, and digital media: Artistic Global (AI talent & booking platform), BHEL-MGCPL (heavy engineering monitoring & telemetry system), and BMA Content Hub (Africa's B2B audio-visual content marketplace).",
      metrics: [
        { label: "Live Platforms", value: "3", sub: "Artistic, BHEL, BMA Hub" },
        { label: "Co-Founder Scope", value: "End-to-End", sub: "Architecture to Deploy" },
        { label: "Response Size", value: "-65%", sub: "Payload Filtering" },
        { label: "Critical Defects", value: "0", sub: "Production Rate" },
      ],
      achievements: [
        {
          title: "Artistic Global – AI Talent Marketplace (artistic.global)",
          description:
            "Co-founded and architected full-stack platform featuring the 'Monalisa' AI Agent powered by Artistic AI. Engineered conversational talent booking, rental equipment packages, interactive scheduling calendar, and seamless responsive client workflows.",
          tech: ["Next.js", "React", "AI Agent (Monalisa)", "Tailwind CSS", "Node.js"],
          icon: Bot,
          highlightMetric: "Live at artistic.global",
        },
        {
          title: "BHEL-MGCPL – Industrial Monitoring Portal (bhel.mgcpl.com)",
          description:
            "Co-engineered mission-critical online monitoring and procurement order tracking system for MG Contractors Pvt. Ltd. supporting BHEL projects. Implemented multi-domain authentication, OPV access controls, equipment telemetry, and high-security session handling.",
          tech: ["Next.js", "TypeScript", "RBAC", "Docker", "Order Telemetry"],
          icon: ShieldCheck,
          highlightMetric: "Live at bhel.mgcpl.com",
        },
        {
          title: "BMA Content Hub – B2B Media Marketplace (contenthub.broadcastmediaafrica.com)",
          description:
            "Co-architected Africa's premier audio-visual content discovery and licensing marketplace powered by Broadcast Media Africa. Built multi-genre media discovery, catalogue search, broadcast syndication, partner onboarding, and dynamic licensing inquiry workflows.",
          tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Media Catalogue"],
          icon: Layers,
          highlightMetric: "Live at contenthub.broadcastmediaafrica.com",
        },
        {
          title: "Scalability Discovery & Payload Optimization",
          description:
            "Identified critical scalability bottlenecks during discovery phases; introduced cursor-based pagination and payload filters to prevent high-latency memory bottlenecks under heavy load, cutting response sizes by 65%.",
          tech: ["Spring Boot", "REST APIs", "React", "TypeScript"],
          icon: TrendingDown,
          highlightMetric: "-65% Payload Size",
        },
        {
          title: "Security Audits & Legacy Code Remediation",
          description:
            "Conducted comprehensive security audits on legacy codebases to remediate weak password storage and missing access controls, eliminating 6 critical vulnerabilities before production rollout.",
          tech: ["BCrypt", "JWT", "Spring Security", "OWASP"],
          icon: ShieldCheck,
          highlightMetric: "6 Vulnerabilities Fixed",
        },
        {
          title: "Docker Containerization & Developer Onboarding",
          description:
            "Streamlined client handovers and developer onboarding by containerizing development and runtime environments with Docker, reducing local setup time from 4 hours down to 20 minutes.",
          tech: ["Docker", "Docker Compose", "CI/CD", "Linux"],
          icon: Layers,
          highlightMetric: "4 hrs → 20 mins",
        },
        {
          title: "Stakeholder Leadership & Zero Defect Rate",
          description:
            "Handled post-launch support, technical roadmap, and client deliverables directly with executive stakeholders, maintaining a 0 critical defect rate across all delivered client applications.",
          tech: ["Client Leadership", "Production Monitoring", "Agile"],
          icon: CheckCircle,
          highlightMetric: "0 Critical Defects",
        },
      ],
    },
  ]

  const activeExperience = experiences.find((exp) => exp.id === activeTab) || experiences[0]

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Work Experience & Production Impact
          </h2>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Real-world software engineering with a focus on database optimization, JVM performance tuning,
            microservices resilience, and zero-downtime scaling.
          </p>
        </div>

        {/* Company Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {experiences.map((exp) => {
            const isSelected = activeTab === exp.id
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`relative px-6 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 text-left shadow-md ${
                  isSelected
                    ? "bg-purple-950/90 border border-purple-400 shadow-purple-500/25 text-white"
                    : "bg-slate-950/70 border border-white/15 hover:border-purple-400/50 text-slate-300 hover:text-white"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isSelected ? "bg-purple-400 animate-pulse" : "bg-white/40"
                  }`}
                />
                <div>
                  <div className="font-heading font-bold text-sm text-white">{exp.company}</div>
                  <div className="text-xs text-slate-300">
                    {exp.role} • {exp.period}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Company Card */}
        <motion.div
          key={activeExperience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-950/85 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-10 mb-12 shadow-2xl"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-white">
                  {activeExperience.role}
                </h3>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/50 rounded-full text-xs font-bold text-purple-300">
                  {activeExperience.type}
                </span>
              </div>
              <div className="text-slate-300 font-medium text-sm md:text-base flex items-center gap-2">
                <span className="text-white font-bold">{activeExperience.company}</span>
                <span>•</span>
                <span>{activeExperience.location}</span>
                <span>•</span>
                <span className="text-purple-300 font-semibold">{activeExperience.period}</span>
              </div>
            </div>

            <p className="text-slate-200 text-sm md:max-w-md leading-relaxed font-normal">
              {activeExperience.summary}
            </p>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {activeExperience.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/30 flex flex-col justify-center text-center hover:border-purple-400/60 transition-all shadow-md"
              >
                <span className="font-heading text-2xl md:text-3xl font-black text-white">
                  {metric.value}
                </span>
                <span className="text-xs font-bold text-slate-200 mt-1">{metric.label}</span>
                {metric.sub && <span className="text-[11px] text-purple-300 font-medium mt-0.5">{metric.sub}</span>}
              </div>
            ))}
          </div>

          {/* Detailed Production Impact Grid */}
          <h4 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span>Key Engineering Deliverables & Performance Wins</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeExperience.achievements.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-white/15 hover:border-purple-400/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-purple-950/70 text-purple-300 border border-purple-500/30">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h5 className="font-heading font-bold text-white text-sm md:text-base leading-snug">
                          {item.title}
                        </h5>
                      </div>
                      {item.highlightMetric && (
                        <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold">
                          {item.highlightMetric}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-normal mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-[11px] text-purple-200 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function RefreshIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}
