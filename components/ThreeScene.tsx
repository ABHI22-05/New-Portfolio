"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create interactive geometric shapes
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.SphereGeometry(1.9, 20, 32),
      new THREE.ConeGeometry(1.2, 2.5, 8),
      new THREE.OctahedronGeometry(1.8),
    ]

    // Purple-themed materials with different opacities
    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      }),
      new THREE.MeshBasicMaterial({
        color: 0xb99dd3,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      }),
    ]

    const meshes: THREE.Mesh[] = []
    const originalPositions: THREE.Vector3[] = []

    // Create fewer, more interactive objects
    for (let i = 0; i < 4; i++) {
      const geometry = geometries[i % geometries.length]
      const material = materials[i % materials.length]
      const mesh = new THREE.Mesh(geometry, material)

      // Position objects in a more organized way
      const angle = (i / 4) * Math.PI * 2
      const radius = 6
      mesh.position.x = Math.cos(angle) * radius
      mesh.position.y = Math.sin(angle) * 3
      mesh.position.z = -2 + i * 1

      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI

      // Store original position for mouse interaction
      originalPositions.push(mesh.position.clone())

      scene.add(mesh)
      meshes.push(mesh)
    }

    // Camera positioning
    camera.position.z = 12
    camera.position.y = 0

    // Mouse interaction with faster response
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

      setMousePosition({ x: mouseX, y: mouseY })

      // Make objects react to mouse with immediate response
      meshes.forEach((mesh, index) => {
        const originalPos = originalPositions[index]
        const influence = 1.2 + index * 0.3 // Increased influence

        mesh.position.x = originalPos.x + mouseX * influence
        mesh.position.y = originalPos.y + mouseY * influence

        // Scale effect on hover
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY)
        const scale = 1 + (1 - distance) * 0.5 // Increased scale effect
        mesh.scale.setScalar(scale)

        // Faster rotation speed based on mouse position
        mesh.userData.rotationSpeedX = 0.003 + Math.abs(mouseX) * 0.008
        mesh.userData.rotationSpeedY = 0.003 + Math.abs(mouseY) * 0.008
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop with slower movement
    const animate = () => {
      requestAnimationFrame(animate)

      meshes.forEach((mesh, index) => {
        // Very slow base rotation
        const baseSpeedX = mesh.userData.rotationSpeedX || 0.002
        const baseSpeedY = mesh.userData.rotationSpeedY || 0.002

        mesh.rotation.x += baseSpeedX
        mesh.rotation.y += baseSpeedY

        // Gentle floating motion
        const time = Date.now() * 0.0003
        mesh.position.y += Math.sin(time + index) * 0.0005
        mesh.position.z += Math.cos(time * 0.7 + index) * 0.0003
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
