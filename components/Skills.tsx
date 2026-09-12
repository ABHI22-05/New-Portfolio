"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import {
  Code,
  Server,
  Layout,
  Database,
  Shield,
  Cloud,
  CheckSquare,
  Cpu,
  Search,
  Sparkles,
} from "lucide-react"

interface SkillGroup {
  title: string
  category: "all" | "backend" | "frontend" | "database" | "devops" | "arch"
  icon: any
  skills: string[]
  color: string
  gradient: string
  description: string
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { y: 24, opacity: 0, filter: "blur(3px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.65,
          stagger: 0.08,
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

  const skillCategories: SkillGroup[] = [
    {
      title: "Programming Languages",
      category: "backend",
      icon: Code,
      skills: ["Java", "JavaScript", "TypeScript", "SQL"],
      color: "border-amber-500/40 text-amber-300",
      gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
      description: "Core languages used for backend services, scripting, type safety, and relational querying.",
    },
    {
      title: "Backend & Microservices",
      category: "backend",
      icon: Server,
      skills: [
        "Spring Boot",
        "Spring MVC",
        "Spring Security",
        "Spring Data JPA",
        "Hibernate",
        "RESTful APIs",
        "Microservices",
        "API Gateway",
        "Kafka",
        "RabbitMQ",
      ],
      color: "border-purple-500/40 text-purple-300",
      gradient: "from-purple-500/15 via-purple-500/5 to-transparent",
      description: "Robust enterprise service architecture, event streaming, and API gateways.",
    },
    {
      title: "Frontend Engineering",
      category: "frontend",
      icon: Layout,
      skills: [
        "React.js",
        "Next.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Responsive UI",
        "Component Architecture",
      ],
      color: "border-blue-500/40 text-blue-300",
      gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
      description: "Responsive, component-driven client applications with modern styling and state handling.",
    },
    {
      title: "Databases & Caching",
      category: "database",
      icon: Database,
      skills: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Elasticsearch",
        "Database Design",
        "Indexing",
        "Query Optimization",
        "Transactions",
        "Connection Pooling",
      ],
      color: "border-emerald-500/40 text-emerald-300",
      gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      description: "Relational and NoSQL data stores, distributed caching, and execution plan optimization.",
    },
    {
      title: "Security & Authentication",
      category: "devops",
      icon: Shield,
      skills: [
        "Spring Security",
        "JWT",
        "OAuth 2.0",
        "RBAC",
        "Password Hashing (BCrypt)",
        "API Security",
      ],
      color: "border-rose-500/40 text-rose-300",
      gradient: "from-rose-500/15 via-rose-500/5 to-transparent",
      description: "Defense-in-depth API protection, role-based access control, and cryptographic standards.",
    },
    {
      title: "DevOps, Cloud & Infrastructure",
      category: "devops",
      icon: Cloud,
      skills: [
        "Git",
        "GitHub",
        "Docker",
        "Docker Compose",
        "Kubernetes",
        "Jenkins",
        "CI/CD",
        "Linux",
        "Nginx",
        "AWS (EC2, S3, RDS)",
      ],
      color: "border-cyan-500/40 text-cyan-300",
      gradient: "from-cyan-500/15 via-cyan-500/5 to-transparent",
      description: "Containerization, automated build pipelines, cloud hosting, and reverse proxies.",
    },
    {
      title: "Testing & Monitoring Tools",
      category: "backend",
      icon: CheckSquare,
      skills: [
        "JUnit 5",
        "Mockito",
        "Postman",
        "Swagger / OpenAPI",
        "Integration Testing",
        "SonarQube",
        "Log4j / SLF4J",
      ],
      color: "border-violet-500/40 text-violet-300",
      gradient: "from-violet-500/15 via-violet-500/5 to-transparent",
      description: "Automated test coverage, static code analysis, and structured observability.",
    },
    {
      title: "Architecture & System Design",
      category: "arch",
      icon: Cpu,
      skills: [
        "System Design",
        "LLD",
        "HLD",
        "Design Patterns",
        "OOP",
        "SOLID",
        "Multithreading",
        "Concurrency",
        "DSA",
      ],
      color: "border-indigo-500/40 text-indigo-300",
      gradient: "from-indigo-500/15 via-indigo-500/5 to-transparent",
      description: "High- and low-level architectural design, object-oriented principles, and thread-safe operations.",
    },
  ]

  const categoryFilters = [
    { id: "all", label: "All Skills" },
    { id: "backend", label: "Backend & Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "database", label: "Databases & Caching" },
    { id: "devops", label: "DevOps & Security" },
    { id: "arch", label: "System Design & Core" },
  ]

  const filteredCategories = skillCategories.filter((cat) => {
    const matchesCategory =
      selectedCategory === "all" || cat.category === selectedCategory
    const matchesQuery =
      searchQuery.trim() === "" ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesQuery
  })

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Stack & Architecture</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical Skills & Tech Stack
          </h2>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-8">
            Categorized technical stack matching enterprise production standards across backend services, distributed systems, and modern web applications.
          </p>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categoryFilters.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === tab.id
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "bg-slate-900/80 text-slate-200 hover:text-white hover:bg-slate-800 border border-white/15"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills (e.g. Kafka)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900/90 border border-purple-500/30 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCategories.map((group, groupIdx) => {
            const Icon = group.icon
            return (
              <div
                key={group.title}
                className={`skill-card p-6 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 hover:border-purple-400/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-xl`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                        {group.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-tight">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {group.skills.map((skill) => {
                      const isHighlighted =
                        searchQuery.trim() !== "" &&
                        skill.toLowerCase().includes(searchQuery.toLowerCase())

                      return (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.04 }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                      isHighlighted
                        ? "bg-purple-600 text-white border-purple-300 shadow-md shadow-purple-500/40"
                        : "bg-slate-900/90 border-white/15 text-slate-100 hover:border-purple-400/60 hover:text-white"
                    }`}
                  >
                          {skill}
                  </motion.span>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
