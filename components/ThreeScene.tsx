"use client"

import { useEffect, useRef } from "react"

// ─── Orb definition ────────────────────────────────────────────────────────────
interface Orb {
  // Lissajous center (normalized 0-1, resolved at runtime)
  cx: number; cy: number
  // Orbital path parameters
  rx: number; ry: number          // orbit radii in px
  freqX: number; freqY: number    // Lissajous frequencies
  phase: number                   // phase offset (radians)
  speed: number                   // angular velocity (rad/frame)
  // Appearance
  radius: number                  // base radius (fraction of min dimension)
  r: number; g: number; b: number // RGB color
  baseOpacity: number             // centre opacity
  pulseAmp: number                // opacity pulse amplitude
  pulseFreq: number               // opacity pulse frequency
  pulseOffset: number             // pulse phase offset
  // Mouse parallax depth (0 = no movement, 1 = full movement)
  depth: number
}

// ─── Star particle ─────────────────────────────────────────────────────────────
interface Star {
  x: number; y: number
  vx: number; vy: number
  size: number; alpha: number
}

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // ── Sizing ────────────────────────────────────────────────────────────────
    let W = 0, H = 0

    const resize = () => {
      const parent = canvas.parentElement
      W = canvas.width  = parent ? parent.clientWidth  : window.innerWidth
      H = canvas.height = parent ? parent.clientHeight : window.innerHeight
    }
    resize()

    // ── Mouse (smooth) ────────────────────────────────────────────────────────
    let targetMX = 0, targetMY = 0   // normalised –1 → 1
    let smoothMX = 0, smoothMY = 0
    const onMouseMove = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth)  * 2 - 1
      targetMY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("mousemove", onMouseMove)

    // ── Orb definitions ───────────────────────────────────────────────────────
    // All radii / orbit distances are defined as fractions; resolved each frame.
    const orbDefs: Orb[] = [
      // Big central violet — the "heart"
      { cx: 0.50, cy: 0.45, rx: 0.06, ry: 0.04, freqX: 2, freqY: 3, phase: 0.0,
        speed: 0.00045, radius: 0.52, r: 139, g: 92,  b: 246,
        baseOpacity: 0.28, pulseAmp: 0.06, pulseFreq: 0.0009, pulseOffset: 0.0,
        depth: 0.12 },
      // Upper-left purple
      { cx: 0.22, cy: 0.30, rx: 0.10, ry: 0.07, freqX: 3, freqY: 2, phase: 1.2,
        speed: 0.00062, radius: 0.40, r: 109, g: 40,  b: 217,
        baseOpacity: 0.22, pulseAmp: 0.05, pulseFreq: 0.0012, pulseOffset: 1.5,
        depth: 0.22 },
      // Right indigo
      { cx: 0.78, cy: 0.55, rx: 0.09, ry: 0.06, freqX: 2, freqY: 3, phase: 2.5,
        speed: 0.00055, radius: 0.38, r: 79,  g: 70,  b: 229,
        baseOpacity: 0.20, pulseAmp: 0.04, pulseFreq: 0.0010, pulseOffset: 2.8,
        depth: 0.18 },
      // Bottom-centre lilac
      { cx: 0.48, cy: 0.70, rx: 0.08, ry: 0.05, freqX: 3, freqY: 4, phase: 4.0,
        speed: 0.00070, radius: 0.28, r: 167, g: 139, b: 250,
        baseOpacity: 0.16, pulseAmp: 0.04, pulseFreq: 0.0014, pulseOffset: 4.2,
        depth: 0.28 },
      // Small accent — deep blue-violet
      { cx: 0.60, cy: 0.20, rx: 0.11, ry: 0.08, freqX: 4, freqY: 3, phase: 3.1,
        speed: 0.00080, radius: 0.24, r: 88,  g: 28,  b: 135,
        baseOpacity: 0.18, pulseAmp: 0.05, pulseFreq: 0.0016, pulseOffset: 0.7,
        depth: 0.32 },
    ]

    // ── Stars ─────────────────────────────────────────────────────────────────
    const STAR_COUNT = 55
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),   // normalised
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      size: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.35 + 0.08,
    }))

    // ── Animation ─────────────────────────────────────────────────────────────
    let t = 0
    let rafId: number

    const render = () => {
      rafId = requestAnimationFrame(render)
      t++

      // Smooth mouse
      smoothMX += (targetMX - smoothMX) * 0.04
      smoothMY += (targetMY - smoothMY) * 0.04

      ctx.clearRect(0, 0, W, H)

      // ── 1. Aurora orbs (screen blend) ───────────────────────────────────────
      ctx.save()
      ctx.globalCompositeOperation = "screen"

      orbDefs.forEach((orb) => {
        const angle = t * orb.speed + orb.phase

        // Lissajous position
        const rawX = orb.cx * W + Math.sin(orb.freqX * angle) * orb.rx * W
        const rawY = orb.cy * H + Math.sin(orb.freqY * angle + orb.phase) * orb.ry * H

        // Mouse parallax (deeper orbs move more)
        const px = smoothMX * orb.depth * W * 0.1
        const py = smoothMY * orb.depth * H * 0.08
        const cx = rawX + px
        const cy = rawY + py

        // Breathing
        const pulse = Math.sin(t * orb.pulseFreq + orb.pulseOffset)
        const opacity   = orb.baseOpacity + pulse * orb.pulseAmp
        const radiusPx  = Math.min(W, H) * orb.radius * (1 + pulse * 0.04)

        // Radial gradient — bright core → transparent edge
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radiusPx)
        grad.addColorStop(0.00, `rgba(${orb.r},${orb.g},${orb.b},${opacity})`)
        grad.addColorStop(0.30, `rgba(${orb.r},${orb.g},${orb.b},${opacity * 0.60})`)
        grad.addColorStop(0.65, `rgba(${orb.r},${orb.g},${orb.b},${opacity * 0.22})`)
        grad.addColorStop(1.00, `rgba(${orb.r},${orb.g},${orb.b},0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(cx, cy, radiusPx, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()

      // ── 2. Star / particle constellation ───────────────────────────────────
      ctx.save()
      ctx.globalCompositeOperation = "screen"

      // Resolve positions
      const resolved = stars.map((s) => {
        s.x += s.vx; s.y += s.vy
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0
        if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0
        return { sx: s.x * W, sy: s.y * H, s }
      })

      // Draw connection lines first (behind dots)
      for (let i = 0; i < resolved.length; i++) {
        for (let j = i + 1; j < resolved.length; j++) {
          const dx = resolved[i].sx - resolved[j].sx
          const dy = resolved[i].sy - resolved[j].sy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const threshold = Math.min(W, H) * 0.14
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.10
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(resolved[i].sx, resolved[i].sy)
            ctx.lineTo(resolved[j].sx, resolved[j].sy)
            ctx.stroke()
          }
        }
      }

      // Draw star dots
      resolved.forEach(({ sx, sy, s }) => {
        const twinkle = Math.sin(t * 0.02 + s.x * 50 + s.y * 30) * 0.15 + 1
        ctx.fillStyle = `rgba(196,181,253,${s.alpha * twinkle})`
        ctx.beginPath()
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
    }

    render()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
