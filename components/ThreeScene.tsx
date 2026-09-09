"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 28

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Generate circular glow sprite programmatically
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext("2d")
      if (!ctx) return new THREE.Texture()

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.2, "rgba(168, 85, 247, 0.9)")
      gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.4)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(32, 32, 32, 0, Math.PI * 2)
      ctx.fill()

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    }

    const glowTexture = createGlowTexture()

    // 1. NEURAL PARTICLE CLOUD (Points)
    const particleCount = 1400
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    // Palette: Purple, Indigo, Cyan, Soft Pink-White
    const colorA = new THREE.Color(0xa855f7) // vibrant purple
    const colorB = new THREE.Color(0x6366f1) // electric indigo
    const colorC = new THREE.Color(0x38bdf8) // cyan highlight
    const colorD = new THREE.Color(0xf472b6) // magenta accent

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere + spiral galaxy distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi

      const radius = 10 + (Math.random() - 0.5) * 5.5
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = (radius * Math.sin(theta) * Math.sin(phi)) * 0.75
      const z = radius * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      // Color variation across the neural field
      const rand = Math.random()
      const selectedColor =
        rand < 0.45 ? colorA : rand < 0.75 ? colorB : rand < 0.9 ? colorC : colorD

      colors[i * 3] = selectedColor.r
      colors[i * 3 + 1] = selectedColor.g
      colors[i * 3 + 2] = selectedColor.b

      scales[i] = 1.2 + Math.random() * 2.2
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.55,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 2. NEURAL SYNAPSE CONNECTIONS (LineSegments)
    // Connect nodes that are within proximity
    const connectionCount = 140
    const linePositions: number[] = []
    const lineColors: number[] = []

    for (let i = 0; i < connectionCount; i++) {
      for (let j = i + 1; j < connectionCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < 3.8) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          )

          const alpha = 0.25 * (1 - dist / 3.8)
          lineColors.push(0.65, 0.35, 0.95, alpha)
          lineColors.push(0.38, 0.4, 0.95, alpha)
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    )

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // 3. INNER PULSING CORE (Subtle holographic torus)
    const coreGeometry = new THREE.TorusGeometry(5, 0.08, 16, 100)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    })
    const coreTorus = new THREE.Mesh(coreGeometry, coreMaterial)
    coreTorus.rotation.x = Math.PI / 3
    scene.add(coreTorus)

    // Interactivity state
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onMouseMove = (e: MouseEvent) => {
      // Normalized coordinates -1 to 1
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", onMouseMove)

    // Animation loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Gentle global rotation
      particleSystem.rotation.y = elapsedTime * 0.06 + mouse.x * 0.4
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.04) * 0.15 - mouse.y * 0.3

      lines.rotation.y = particleSystem.rotation.y
      lines.rotation.x = particleSystem.rotation.x

      coreTorus.rotation.z = elapsedTime * 0.1
      coreTorus.rotation.y = elapsedTime * 0.08 + mouse.x * 0.3

      // Dynamic wave & pulse in particle positions
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const ox = originalPositions[i3]
        const oy = originalPositions[i3 + 1]
        const oz = originalPositions[i3 + 2]

        // Harmonious sine wave ripple
        const wave = Math.sin(elapsedTime * 1.5 + ox * 0.2 + oz * 0.2) * 0.28
        posArray[i3] = ox + (ox / 12) * wave
        posArray[i3 + 1] = oy + (oy / 12) * wave
        posArray[i3 + 2] = oz + wave * 0.5
      }
      posAttr.needsUpdate = true

      // Camera parallax tilt
      camera.position.x = mouse.x * 2.5
      camera.position.y = mouse.y * 2
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Responsive resize handler
    const handleResize = () => {
      if (!mount) return
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", handleResize)

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }

      particleGeometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
      glowTexture.dispose()
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
