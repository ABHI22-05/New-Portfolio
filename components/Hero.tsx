"use client"

import { useEffect, useRef, useState } from "react"
import { motion, Variants } from "framer-motion"
import ThreeScene from "./ThreeScene"
import { ArrowDown, Briefcase, Layers, Send } from "lucide-react"

// ─── Text Scramble Hook ───────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&"

function useTextScramble(finalText: string, startDelay = 0) {
  const [display, setDisplay] = useState<string[]>(
    Array.from(finalText).map(() => "")
  )
  const [lockedCount, setLockedCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    let rafId: number
    let frame = 0
    const FRAMES_PER_CHAR = 6
    const totalFrames = finalText.replace(/ /g, "").length * FRAMES_PER_CHAR

    const timeout = setTimeout(() => {
      setStarted(true)
      const tick = () => {
        frame++
        const resolved = Math.floor(frame / FRAMES_PER_CHAR)
        setLockedCount(resolved)

        const next = Array.from(finalText).map((char, i) => {
          if (char === " ") return " "
          const charIndex = finalText.slice(0, i + 1).replace(/ /g, "").length - 1
          if (charIndex < resolved) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })

        setDisplay(next)

        if (frame < totalFrames) {
          rafId = requestAnimationFrame(tick)
        } else {
          setDisplay(Array.from(finalText))
          setLockedCount(finalText.length)
        }
      }
      rafId = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafId)
    }
  }, [finalText, startDelay])

  return { display, lockedCount, started }
}

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, startDelay = 0, speed = 42) {
  const [typed, setTyped] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    let interval = setInterval(() => setCursorVisible((v) => !v), 530)
    let i = 0

    const timeout = setTimeout(() => {
      const typeNext = () => {
        if (i <= text.length) {
          setTyped(text.slice(0, i))
          i++
          setTimeout(typeNext, speed + Math.random() * 18)
        } else {
          setTypingDone(true)
          clearInterval(interval)
          setCursorVisible(false)
        }
      }
      typeNext()
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, startDelay, speed])

  return { typed, cursorVisible, typingDone }
}

// ─── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

const pillVariants: Variants = {
  hidden: { opacity: 0, x: -10, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.32, ease: "easeOut", delay: i * 0.05 },
  }),
}

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 10 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22, delay: i * 0.1 },
  }),
}

const metricVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

// ─── Timing (ms) ──────────────────────────────────────────────────────────────
const T_PILL    = 200
const T_NAME    = 450
const T_ROLE    = 1650
const T_DESC    = 2550
const T_PILLS   = 2950
const T_CTA     = 3300
const T_METRICS = 3600

export default function Hero() {
  const [pillVis,    setPillVis]    = useState(false)
  const [nameVis,    setNameVis]    = useState(false)
  const [roleVis,    setRoleVis]    = useState(false)
  const [descVis,    setDescVis]    = useState(false)
  const [techVis,    setTechVis]    = useState(false)
  const [ctaVis,     setCtaVis]     = useState(false)
  const [metricVis,  setMetricVis]  = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPillVis(true),   T_PILL),
      setTimeout(() => setNameVis(true),   T_NAME),
      setTimeout(() => setRoleVis(true),   T_ROLE),
      setTimeout(() => setDescVis(true),   T_DESC),
      setTimeout(() => setTechVis(true),   T_PILLS),
      setTimeout(() => setCtaVis(true),    T_CTA),
      setTimeout(() => setMetricVis(true), T_METRICS),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const { display: scrambled, lockedCount } = useTextScramble("ABHISHEK JENA", T_NAME)
  const { typed, cursorVisible } = useTypewriter(
    "AI-First Full Stack Developer & Co-Founder",
    T_ROLE
  )

  const FINAL_NAME = "ABHISHEK JENA"

  const corePills = [
    "AI Agents", "Java", "Spring Boot", "Next.js",
    "React.js", "TypeScript", "Kafka", "Redis", "Docker", "AWS",
  ]

  const heroMetrics = [
    { label: "Production Exp",   value: "2+ Years", detail: "AI & Full-Stack Systems" },
    { label: "API Latency Cut",  value: "62%",      detail: "Eager Fetch & Caching"  },
    { label: "Concurrent Scale", value: "5K+",      detail: "E-Commerce & Portals"   },
    { label: "Event Pipeline",   value: "50K+",     detail: "Daily Kafka Events"      },
  ]

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
    >
      {/* 3D Portal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeScene />
      </div>

      {/* Atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.12) 35%, rgba(67,20,120,0.07) 65%, transparent 100%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center">

        {/* ① Status pill */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={pillVis ? "visible" : "hidden"}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 backdrop-blur-md mb-7 shadow-inner"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-purple-200 tracking-wide">
            Available for Senior AI &amp; Full-Stack Engineering Roles
          </span>
        </motion.div>

        {/* ② Name — text scramble */}
        <div
          className="mb-4"
          style={{ opacity: nameVis ? 1 : 0, transition: "opacity 0.2s ease" }}
        >
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight select-none leading-none">
            {scrambled.map((char, i) => {
              const locked = char === FINAL_NAME[i] && FINAL_NAME[i] !== " "
              const isSpace = FINAL_NAME[i] === " "
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    color: isSpace
                      ? "transparent"
                      : locked
                      ? "#ffffff"
                      : "rgba(196,181,253,0.75)",
                    textShadow: locked
                      ? "0 0 28px rgba(139,92,246,0.55), 0 0 60px rgba(109,40,217,0.25)"
                      : "0 0 12px rgba(168,85,247,0.35)",
                    transition: "color 0.07s ease, text-shadow 0.12s ease",
                    width: isSpace ? "0.4em" : undefined,
                  }}
                >
                  {isSpace ? "\u00a0" : char || CHARS[0]}
                </span>
              )
            })}
          </h1>
        </div>

        {/* ③ Role — typewriter */}
        <motion.div
          className="mb-7 flex items-center gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: roleVis ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-purple-500" />
          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-300 tracking-tight">
            {typed}
            <span
              className="inline-block w-[2px] h-[0.9em] bg-purple-400 ml-0.5 align-middle rounded-full"
              style={{
                opacity: cursorVisible ? 1 : 0,
                transition: "opacity 0.1s",
              }}
            />
          </h2>
          <div className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-purple-500" />
        </motion.div>

        {/* ④ Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={descVis ? "visible" : "hidden"}
          className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal max-w-3xl mb-8 leading-relaxed"
        >
          Engineering intelligent, high-throughput applications with{" "}
          <strong className="text-white font-semibold">
            Java, Spring Boot, React, Next.js, and autonomous AI agents
          </strong>
          . Co-founder behind real-world production platforms including{" "}
          <strong className="text-purple-300 font-semibold">Artistic Global</strong>,{" "}
          <strong className="text-purple-300 font-semibold">BHEL-MGCPL</strong>, and{" "}
          <strong className="text-purple-300 font-semibold">BMA Content Hub</strong>.
        </motion.p>

        {/* ⑤ Tech pills — cascade left→right */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mb-10">
          {corePills.map((tech, i) => (
            <motion.span
              key={tech}
              variants={pillVariants}
              initial="hidden"
              animate={techVis ? "visible" : "hidden"}
              custom={i}
              className="px-4 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-full border border-purple-400/40 text-xs sm:text-sm text-slate-100 font-medium hover:border-purple-300 hover:bg-purple-900/50 transition-all duration-200 shadow-sm cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* ⑥ CTA buttons — spring pop */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          {[
            {
              label: "Explore Experience",
              icon: <Briefcase className="w-4 h-4" />,
              id: "experience",
              cls: "px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-semibold text-sm shadow-xl border border-purple-400/40 hover:shadow-purple-500/40 hover:shadow-2xl",
            },
            {
              label: "View Projects",
              icon: <Layers className="w-4 h-4" />,
              id: "projects",
              cls: "px-7 py-3.5 rounded-full border border-purple-400/50 bg-slate-900/80 backdrop-blur-sm text-slate-100 hover:text-white hover:bg-purple-900/40 font-semibold text-sm shadow-md",
            },
            {
              label: "Contact Me",
              icon: <Send className="w-4 h-4 text-purple-300" />,
              id: "contact",
              cls: "px-6 py-3.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/15 font-semibold text-sm",
            },
          ].map((btn, i) => (
            <motion.button
              key={btn.label}
              variants={ctaVariants}
              initial="hidden"
              animate={ctaVis ? "visible" : "hidden"}
              custom={i}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo(btn.id)}
              className={`flex items-center gap-2 transition-all duration-200 ${btn.cls}`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </motion.button>
          ))}
        </div>

        {/* ⑦ Metrics bar — slide up */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={metricVis ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950/85 backdrop-blur-xl shadow-2xl"
        >
          {heroMetrics.map((item, idx) => (
            <motion.div
              key={idx}
              variants={metricVariants}
              initial="hidden"
              animate={metricVis ? "visible" : "hidden"}
              custom={idx}
              className="p-5 text-center border-r last:border-r-0 border-purple-500/20 flex flex-col items-center justify-center group hover:bg-purple-950/30 transition-colors duration-300"
            >
              <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-purple-200 transition-colors duration-300">
                {item.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1">{item.label}</div>
              <div className="text-[11px] text-purple-300/80 font-medium mt-0.5">{item.detail}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — appears last */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={metricVis ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-purple-300/50 hover:text-purple-200 flex flex-col items-center gap-1 transition-colors duration-300"
        aria-label="Scroll to About section"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono opacity-60">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}

