"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TrailParticle {
  x: number
  y: number
  char: string
  opacity: number
  scale: number
  color: string
  vx: number
  vy: number
  life: number
  maxLife: number
}

const HACKER_CHARS = ["0", "1", "0x", ">_", "::", "λ", "7F", "FF", "4A", "SYS", "NULL", "⌘"]
const HACKER_COLORS = ["#a855f7", "#c084fc", "#06b6d4", "#38bdf8", "#ec4899"]

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 })
  const [targetType, setTargetType] = useState<string | null>(null)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([])

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<TrailParticle[]>([])
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    // Only activate for mouse-enabled desktop displays
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle animation loop
    let lastSpawn = 0
    const renderLoop = (time: number) => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const particles = particlesRef.current
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.life++
          p.opacity = (1 - p.life / p.maxLife) * 0.7

          if (p.life >= p.maxLife) {
            particles.splice(i, 1)
            continue
          }

          ctx.save()
          ctx.font = `600 ${Math.max(8, 11 * p.scale)}px "JetBrains Mono", monospace`
          ctx.fillStyle = p.color
          ctx.globalAlpha = Math.max(0, p.opacity)
          ctx.shadowBlur = 6
          ctx.shadowColor = p.color
          ctx.fillText(p.char, p.x, p.y)
          ctx.restore()
        }
      }
      animFrameRef.current = requestAnimationFrame(renderLoop)
    }
    animFrameRef.current = requestAnimationFrame(renderLoop)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const dx = e.clientX - lastMousePosRef.current.x
      const dy = e.clientY - lastMousePosRef.current.y
      const dist = Math.hypot(dx, dy)

      // Drop matrix trail glyphs when cursor moves
      const now = performance.now()
      if (dist > 8 && now - lastSpawn > 24) {
        lastSpawn = now
        const char = HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)]
        const color = HACKER_COLORS[Math.floor(Math.random() * HACKER_COLORS.length)]
        particlesRef.current.push({
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          char,
          opacity: 0.85,
          scale: 0.8 + Math.random() * 0.4,
          color,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.4 - Math.random() * 0.8,
          life: 0,
          maxLife: 22 + Math.random() * 12,
        })

        // Limit active particles for high 60fps performance
        if (particlesRef.current.length > 35) {
          particlesRef.current.shift()
        }
      }

      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      const id = Date.now() + Math.random()
      setClicks((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id))
      }, 500)
    }

    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const interactive = target?.closest("button, a, [role='button'], input, textarea, .interactive-hover")
      if (interactive) {
        const tagName = interactive.tagName.toLowerCase()
        if (tagName === "a") setTargetType("LINK")
        else if (tagName === "button" || interactive.getAttribute("role") === "button") setTargetType("EXEC")
        else if (tagName === "input" || tagName === "textarea") setTargetType("INPUT")
        else setTargetType("TARGET")
      } else {
        setTargetType(null)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousemove", handleElementHover)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousemove", handleElementHover)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isVisible])

  if (!isVisible) return null

  const isHovering = !!targetType

  return (
    <>
      {/* Matrix code particle trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        aria-hidden="true"
      />

      {/* Cyber Reticle / Corner brackets */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - (isHovering ? 20 : 14),
          y: mousePos.y - (isHovering ? 20 : 14),
          scale: isClicking ? 0.85 : isHovering ? 1.25 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 550,
          damping: 28,
          mass: 0.15,
        }}
      >
        <div
          className={`relative transition-all duration-150 ${
            isHovering ? "w-10 h-10" : "w-7 h-7"
          }`}
        >
          {/* Top-Left Corner */}
          <span
            className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-150 ${
              isHovering ? "border-cyan-400 shadow-[0_0_8px_#22d3ee]" : "border-purple-400/80"
            }`}
          />
          {/* Top-Right Corner */}
          <span
            className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-150 ${
              isHovering ? "border-cyan-400 shadow-[0_0_8px_#22d3ee]" : "border-purple-400/80"
            }`}
          />
          {/* Bottom-Left Corner */}
          <span
            className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-150 ${
              isHovering ? "border-cyan-400 shadow-[0_0_8px_#22d3ee]" : "border-purple-400/80"
            }`}
          />
          {/* Bottom-Right Corner */}
          <span
            className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-150 ${
              isHovering ? "border-cyan-400 shadow-[0_0_8px_#22d3ee]" : "border-purple-400/80"
            }`}
          />

          {/* Central Target Crosshair dot */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ${
              isHovering
                ? "w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                : "w-1.5 h-1.5 bg-purple-300/90"
            }`}
          />
        </div>
      </motion.div>

      {/* Futuristic Telemetry HUD & Coordinate Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x + 18,
          y: mousePos.y + 14,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 38,
          mass: 0.1,
        }}
      >
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-black/75 border border-purple-500/30 backdrop-blur-sm text-[9px] font-mono leading-tight tracking-wider select-none">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isHovering
                ? "bg-cyan-400 animate-ping"
                : "bg-purple-400/60"
            }`}
          />
          {isHovering ? (
            <span className="text-cyan-300 font-bold tracking-widest uppercase">
              [{targetType}]
            </span>
          ) : (
            <span className="text-purple-300/70">
              X:{String(Math.max(0, mousePos.x)).padStart(4, "0")} Y:{String(Math.max(0, mousePos.y)).padStart(4, "0")}
            </span>
          )}
        </div>
      </motion.div>

      {/* Cyber Shockwave on Click */}
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            className="fixed pointer-events-none z-[9996] rounded-full border border-cyan-400/80"
            initial={{
              x: click.x - 12,
              y: click.y - 12,
              width: 24,
              height: 24,
              opacity: 1,
              scale: 0.6,
            }}
            animate={{
              width: 60,
              height: 60,
              x: click.x - 30,
              y: click.y - 30,
              opacity: 0,
              scale: 1.8,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

