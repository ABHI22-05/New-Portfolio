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
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawAnimatedGrid = () => {
      const gridSize = 80

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw vertical lines with wave animation
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const waveOffset = Math.sin(time + x * 0.01) * 20
        const opacity = 0.15 + Math.sin(time * 0.5 + x * 0.005) * 0.1

        ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(x, 0)

        // Create wavy lines
        for (let y = 0; y <= canvas.height; y += 20) {
          const wave = Math.sin(time * 2 + y * 0.01 + x * 0.005) * waveOffset * 0.3
          ctx.lineTo(x + wave, y)
        }
        ctx.stroke()
      }

      // Draw horizontal lines with wave animation
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const waveOffset = Math.cos(time + y * 0.01) * 20
        const opacity = 0.15 + Math.cos(time * 0.5 + y * 0.005) * 0.1

        ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(0, y)

        // Create wavy lines
        for (let x = 0; x <= canvas.width; x += 20) {
          const wave = Math.cos(time * 2 + x * 0.01 + y * 0.005) * waveOffset * 0.3
          ctx.lineTo(x, y + wave)
        }
        ctx.stroke()
      }

      // Add animated intersection points
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          const distance = Math.sqrt((x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2)
          const pulse = Math.sin(time * 3 - distance * 0.01) * 0.5 + 0.5
          const opacity = 0.3 + pulse * 0.4
          const size = 2 + pulse * 2

          // Main dot
          ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()

          // Glow effect
          if (pulse > 0.7) {
            ctx.fillStyle = `rgba(196, 181, 253, ${(pulse - 0.7) * 0.5})`
            ctx.beginPath()
            ctx.arc(x, y, size * 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Add flowing particles
      const particleCount = 5
      for (let i = 0; i < particleCount; i++) {
        const x = ((time * 50 + i * 200) % (canvas.width + 100)) - 50
        const y = canvas.height * 0.2 + Math.sin(time + i) * canvas.height * 0.6
        const opacity = 0.6 + Math.sin(time * 2 + i) * 0.3
        const size = 3 + Math.sin(time * 3 + i) * 2

        // Particle trail
        ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.3})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x - 30, y)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Main particle
        ctx.fillStyle = `rgba(168, 85, 247, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Particle glow
        ctx.fillStyle = `rgba(196, 181, 253, ${opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(x, y, size * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      time += 0.02
      drawAnimatedGrid()
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(30, 27, 75, 0.8) 0%, rgba(15, 15, 35, 0.95) 50%, rgba(0, 0, 0, 1) 100%)",
      }}
    />
  )
}
