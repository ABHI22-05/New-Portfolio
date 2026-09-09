"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only activate for fine pointer devices (desktop with mouse)
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Check for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[role='button']") ||
        target?.closest("input") ||
        target?.closest("textarea")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousemove", handleElementHover)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousemove", handleElementHover)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Sleek precision follower aura that glides smoothly around the native cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - (isHovering ? 22 : 14),
          y: mousePos.y - (isHovering ? 22 : 14),
          scale: isClicking ? 0.8 : isHovering ? 1.4 : 1,
          opacity: isHovering ? 0.85 : 0.45,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
          mass: 0.2,
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering
              ? "w-11 h-11 border border-purple-400 bg-purple-500/15 backdrop-blur-[1px] shadow-lg shadow-purple-500/30"
              : "w-7 h-7 border border-purple-400/60 bg-purple-400/10 shadow-sm shadow-purple-500/20"
          }`}
        />
      </motion.div>

      {/* Tiny inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 2,
          y: mousePos.y - 2,
          opacity: isHovering ? 0.3 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 35,
        }}
      >
        <div className="w-1 h-1 rounded-full bg-purple-300" />
      </motion.div>
    </>
  )
}
