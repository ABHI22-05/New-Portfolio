"use client"

import { useEffect, useRef } from "react"

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Stardust particles
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.05,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    }))

    let time = 0

    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // 1. Sleek Cyber Grid with Distance Fade
      const gridSize = 72
      const gridOpacity = 0.045

      ctx.strokeStyle = `rgba(168, 85, 247, ${gridOpacity})`
      ctx.lineWidth = 1

      // Subtle vertical grid lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Subtle horizontal grid lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // 2. Micro-Glowing Grid Intersections
      for (let x = 0; x <= width; x += gridSize * 2) {
        for (let y = 0; y <= height; y += gridSize * 2) {
          const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5
          if (pulse > 0.4) {
            ctx.fillStyle = `rgba(192, 132, 252, ${pulse * 0.15})`
            ctx.beginPath()
            ctx.arc(x, y, 1.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // 3. Ambient Stardust Particles
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around screen
        if (p.y < 0) {
          p.y = height
          p.x = Math.random() * width
        }
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0

        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.3 + 0.7
        const currentAlpha = p.alpha * pulse

        ctx.fillStyle = `rgba(196, 181, 253, ${currentAlpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic ambient radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(88, 28, 135, 0.22) 0%, rgba(15, 10, 30, 0.6) 45%, rgba(4, 4, 10, 0.98) 100%)",
        }}
      />
      {/* Gentle bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(67, 56, 202, 0.12) 0%, transparent 80%)",
        }}
      />
      {/* Animated canvas layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
