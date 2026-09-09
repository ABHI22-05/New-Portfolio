"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene, Camera & Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 22)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ─────────────────────────────────────────────────────────────
    // GLOW SPRITE TEXTURE — Hot white core → purple → violet edge
    // ─────────────────────────────────────────────────────────────
    const createSparkTexture = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext("2d")!
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, "rgba(255, 255, 255, 1)")
      g.addColorStop(0.15, "rgba(230, 200, 255, 1)")
      g.addColorStop(0.35, "rgba(168, 85, 247, 0.85)")
      g.addColorStop(0.65, "rgba(99, 60, 200, 0.4)")
      g.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(32, 32, 32, 0, Math.PI * 2)
      ctx.fill()
      const tex = new THREE.CanvasTexture(canvas)
      tex.needsUpdate = true
      return tex
    }
    const sparkTex = createSparkTexture()

    // Master group for parallax tilt
    const portalGroup = new THREE.Group()
    scene.add(portalGroup)

    // ─────────────────────────────────────────────────────────────
    // PORTAL PARAMETERS
    // ─────────────────────────────────────────────────────────────
    const RING_RADIUS = 8.5     // core ring radius
    const RING_WIDTH = 1.4      // spread of vortex around the ring

    // ─────────────────────────────────────────────────────────────
    // 1. DENSE VORTEX RING — the bright spinning particle ring
    // ─────────────────────────────────────────────────────────────
    const RING_COUNT = 2000
    const ringGeo = new THREE.BufferGeometry()
    const ringPos = new Float32Array(RING_COUNT * 3)
    const ringCol = new Float32Array(RING_COUNT * 3)
    const ringAngle = new Float32Array(RING_COUNT)
    const ringR = new Float32Array(RING_COUNT)
    const ringZ = new Float32Array(RING_COUNT)
    const ringSpeed = new Float32Array(RING_COUNT)

    // Purple palette: white-hot core → vivid purple → deep violet → indigo fringe
    const cWhite   = new THREE.Color(0xffffff)
    const cLilac   = new THREE.Color(0xe8d5ff)
    const cPurple  = new THREE.Color(0xa855f7)
    const cViolet  = new THREE.Color(0x7c3aed)
    const cIndigo  = new THREE.Color(0x4f46e5)
    const cDarkVio = new THREE.Color(0x3b0764)

    for (let i = 0; i < RING_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radOffset = (Math.random() - 0.5) * RING_WIDTH
      const r = RING_RADIUS + radOffset

      ringAngle[i] = angle
      ringR[i] = r
      ringZ[i] = (Math.random() - 0.5) * 0.8
      ringSpeed[i] = 1.5 + Math.random() * 2.0

      ringPos[i * 3]     = Math.cos(angle) * r
      ringPos[i * 3 + 1] = Math.sin(angle) * r
      ringPos[i * 3 + 2] = ringZ[i]

      // Color temperature: hotter (brighter) particles sit closer to ring edge
      const dist = Math.abs(radOffset) / (RING_WIDTH / 2)
      let c: THREE.Color
      if (dist < 0.15) c = Math.random() < 0.5 ? cWhite : cLilac
      else if (dist < 0.4) c = cPurple
      else if (dist < 0.65) c = cViolet
      else if (dist < 0.82) c = cIndigo
      else c = cDarkVio

      ringCol[i * 3]     = c.r
      ringCol[i * 3 + 1] = c.g
      ringCol[i * 3 + 2] = c.b
    }

    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPos, 3))
    ringGeo.setAttribute("color", new THREE.BufferAttribute(ringCol, 3))

    const ringMat = new THREE.PointsMaterial({
      size: 0.48,
      map: sparkTex,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const ringSystem = new THREE.Points(ringGeo, ringMat)
    portalGroup.add(ringSystem)

    // ─────────────────────────────────────────────────────────────
    // 2. OUTWARD RADIAL SPARK SHOWER — high-velocity sparks flying out
    //    (the "accreting embers" that fan out into the dark void)
    // ─────────────────────────────────────────────────────────────
    const SPRAY_COUNT = 700

    interface SprayParticle {
      x: number; y: number; z: number
      vx: number; vy: number; vz: number
      life: number; maxLife: number
    }

    const sprayGeo = new THREE.BufferGeometry()
    const sprayPos = new Float32Array(SPRAY_COUNT * 3)
    const sprayCol = new Float32Array(SPRAY_COUNT * 3)
    const sprays: SprayParticle[] = []

    const resetSpray = (i: number) => {
      // Spawn exactly ON the ring perimeter
      const angle = Math.random() * Math.PI * 2
      const r = RING_RADIUS + (Math.random() - 0.5) * RING_WIDTH * 0.8
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r
      const z = (Math.random() - 0.5) * 0.6

      sprayPos[i * 3]     = x
      sprayPos[i * 3 + 1] = y
      sprayPos[i * 3 + 2] = z

      // Velocity: mostly radial outward + slight tangential swirl + tiny z scatter
      const speed = 2.0 + Math.random() * 5.5
      const tangentBias = (Math.random() - 0.5) * 0.5
      const vx = Math.cos(angle) * speed + (-Math.sin(angle)) * tangentBias
      const vy = Math.sin(angle) * speed + Math.cos(angle) * tangentBias
      const vz = (Math.random() - 0.5) * 0.8

      const maxLife = 0.5 + Math.random() * 1.4

      sprays[i] = { x, y, z, vx, vy, vz, life: Math.random() * maxLife, maxLife }

      // Color: inner sprays hotter (white-purple), outer sprays cooler (violet/indigo)
      const c = Math.random() < 0.35 ? cLilac : Math.random() < 0.6 ? cPurple : cViolet
      sprayCol[i * 3]     = c.r
      sprayCol[i * 3 + 1] = c.g
      sprayCol[i * 3 + 2] = c.b
    }

    for (let i = 0; i < SPRAY_COUNT; i++) {
      sprays.push({ x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 0, maxLife: 1 })
      resetSpray(i)
    }

    sprayGeo.setAttribute("position", new THREE.BufferAttribute(sprayPos, 3))
    sprayGeo.setAttribute("color", new THREE.BufferAttribute(sprayCol, 3))

    const sprayMat = new THREE.PointsMaterial({
      size: 0.38,
      map: sparkTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const spraySystem = new THREE.Points(sprayGeo, sprayMat)
    portalGroup.add(spraySystem)

    // ─────────────────────────────────────────────────────────────
    // 3. BRIGHT GLOWING RING EDGE — hot inner boundary glow
    //    Simulates the intensely lit edge of the portal
    // ─────────────────────────────────────────────────────────────
    const GLOW_COUNT = 500
    const glowGeo = new THREE.BufferGeometry()
    const glowPos = new Float32Array(GLOW_COUNT * 3)
    const glowCol = new Float32Array(GLOW_COUNT * 3)
    const glowAngles = new Float32Array(GLOW_COUNT)
    const glowSpeeds = new Float32Array(GLOW_COUNT)

    for (let i = 0; i < GLOW_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      glowAngles[i] = angle
      glowSpeeds[i] = 0.8 + Math.random() * 1.0
      const r = RING_RADIUS + (Math.random() - 0.5) * 0.3
      glowPos[i * 3]     = Math.cos(angle) * r
      glowPos[i * 3 + 1] = Math.sin(angle) * r
      glowPos[i * 3 + 2] = (Math.random() - 0.5) * 0.2

      // Bright white-violet for maximum luminance at the ring edge
      const c = Math.random() < 0.6 ? cWhite : cLilac
      glowCol[i * 3]     = c.r
      glowCol[i * 3 + 1] = c.g
      glowCol[i * 3 + 2] = c.b
    }

    glowGeo.setAttribute("position", new THREE.BufferAttribute(glowPos, 3))
    glowGeo.setAttribute("color", new THREE.BufferAttribute(glowCol, 3))

    const glowMat = new THREE.PointsMaterial({
      size: 0.62,
      map: sparkTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const glowSystem = new THREE.Points(glowGeo, glowMat)
    portalGroup.add(glowSystem)

    // ─────────────────────────────────────────────────────────────
    // 4. AMBIENT DEEP-FIELD EMBERS — very sparse particles far from ring
    //    Like floating cosmic dust beyond the portal boundary
    // ─────────────────────────────────────────────────────────────
    const EMBER_COUNT = 120
    const emberGeo = new THREE.BufferGeometry()
    const emberPos = new Float32Array(EMBER_COUNT * 3)
    const emberCol = new Float32Array(EMBER_COUNT * 3)
    const emberOrigY = new Float32Array(EMBER_COUNT)
    const emberSpd = new Float32Array(EMBER_COUNT)

    for (let i = 0; i < EMBER_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      // Only outside the ring radius so they frame, not clutter
      const r = RING_RADIUS + 1.5 + Math.random() * 10
      const x = Math.cos(angle) * r
      const y = (Math.random() - 0.5) * 18
      const z = (Math.random() - 0.5) * 8
      emberPos[i * 3]     = x
      emberPos[i * 3 + 1] = y
      emberPos[i * 3 + 2] = z
      emberOrigY[i] = y
      emberSpd[i] = 0.3 + Math.random() * 0.6

      const c = Math.random() < 0.5 ? cViolet : Math.random() < 0.7 ? cIndigo : cPurple
      emberCol[i * 3]     = c.r
      emberCol[i * 3 + 1] = c.g
      emberCol[i * 3 + 2] = c.b
    }

    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3))
    emberGeo.setAttribute("color", new THREE.BufferAttribute(emberCol, 3))

    const emberMat = new THREE.PointsMaterial({
      size: 0.32,
      map: sparkTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const emberSystem = new THREE.Points(emberGeo, emberMat)
    scene.add(emberSystem)

    // ─────────────────────────────────────────────────────────────
    // 5. INTERACTION: Mouse parallax + portal acceleration
    // ─────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, prevTx: 0, prevTy: 0, speed: 0 }

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1
      const dx = mouse.tx - mouse.prevTx
      const dy = mouse.ty - mouse.prevTy
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 15, 5)
      mouse.prevTx = mouse.tx
      mouse.prevTy = mouse.ty
    }

    window.addEventListener("mousemove", onMouseMove)

    let rafId: number
    const clock = new THREE.Clock()
    let spinMult = 1.0

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.getElapsedTime()

      // Smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      mouse.speed *= 0.92

      // Spellcast speed burst from mouse gestures
      spinMult += ((1.0 + mouse.speed * 1.8) - spinMult) * 0.08

      // Subtle 3D parallax tilt
      portalGroup.rotation.y = mouse.x * 0.22
      portalGroup.rotation.x = -mouse.y * 0.18

      // ── Ring vortex spin ──
      const ringPosAttr = ringGeo.attributes.position as THREE.BufferAttribute
      const ringPosArr = ringPosAttr.array as Float32Array
      for (let i = 0; i < RING_COUNT; i++) {
        ringAngle[i] += ringSpeed[i] * spinMult * dt
        const pulse = Math.sin(ringAngle[i] * 6 + t * 4) * 0.12
        const r = ringR[i] + pulse
        ringPosArr[i * 3]     = Math.cos(ringAngle[i]) * r
        ringPosArr[i * 3 + 1] = Math.sin(ringAngle[i]) * r
        ringPosArr[i * 3 + 2] = ringZ[i] + Math.sin(t * 3 + ringAngle[i]) * 0.15
      }
      ringPosAttr.needsUpdate = true

      // ── Glow edge spin (faster for inner bright ring) ──
      const glowPosAttr = glowGeo.attributes.position as THREE.BufferAttribute
      const glowPosArr = glowPosAttr.array as Float32Array
      for (let i = 0; i < GLOW_COUNT; i++) {
        glowAngles[i] += glowSpeeds[i] * spinMult * 1.6 * dt
        const r = RING_RADIUS + (Math.sin(glowAngles[i] * 8 + t) * 0.15)
        glowPosArr[i * 3]     = Math.cos(glowAngles[i]) * r
        glowPosArr[i * 3 + 1] = Math.sin(glowAngles[i]) * r
        glowPosArr[i * 3 + 2] = (Math.sin(glowAngles[i] * 3 + t)) * 0.12
      }
      glowPosAttr.needsUpdate = true

      // ── Radial spray physics ──
      const sprayPosAttr = sprayGeo.attributes.position as THREE.BufferAttribute
      const sprayPosArr = sprayPosAttr.array as Float32Array
      for (let i = 0; i < SPRAY_COUNT; i++) {
        const s = sprays[i]
        s.life += dt
        if (s.life >= s.maxLife) {
          resetSpray(i)
          sprayPosArr[i * 3]     = sprays[i].x
          sprayPosArr[i * 3 + 1] = sprays[i].y
          sprayPosArr[i * 3 + 2] = sprays[i].z
        } else {
          const fade = 1 - s.life / s.maxLife
          sprayPosArr[i * 3]     += s.vx * spinMult * dt * fade
          sprayPosArr[i * 3 + 1] += s.vy * spinMult * dt * fade
          sprayPosArr[i * 3 + 2] += s.vz * dt
          s.vx *= 0.98
          s.vy *= 0.98
        }
      }
      sprayPosAttr.needsUpdate = true

      // ── Ambient ember gentle float ──
      const embPosAttr = emberGeo.attributes.position as THREE.BufferAttribute
      const embPosArr = embPosAttr.array as Float32Array
      for (let i = 0; i < EMBER_COUNT; i++) {
        embPosArr[i * 3 + 1] = emberOrigY[i] + Math.sin(t * emberSpd[i] + i * 0.7) * 0.6
      }
      embPosAttr.needsUpdate = true
      emberSystem.rotation.y = t * 0.015 + mouse.x * 0.08

      // Camera subtle parallax
      camera.position.x = mouse.x * 1.2
      camera.position.y = mouse.y * 0.9
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // ─────────────────────────────────────────────────────────────
    // 6. RESIZE & CLEANUP
    // ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
      if (mount?.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      ringGeo.dispose(); ringMat.dispose()
      sprayGeo.dispose(); sprayMat.dispose()
      glowGeo.dispose(); glowMat.dispose()
      emberGeo.dispose(); emberMat.dispose()
      sparkTex.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  )
}
