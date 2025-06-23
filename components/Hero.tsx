"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import ThreeScene from "./ThreeScene"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10">
        <ThreeScene />
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-text mb-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            ABHISHEK JENA
          </h1>
        </motion.div>

        <div className="hero-text text-xl md:text-2xl text-purple-100 mb-8 font-light">
          Full-Stack Developer
        </div>

        <div className="hero-text flex flex-wrap justify-center gap-4 mb-12">
          {["Java", "React", "Node.js", "C++", "Next js"].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="px-4 py-2 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-500/30 text-sm text-purple-200 hover:border-purple-400/50 hover:bg-purple-800/30 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="hero-text flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
              backgroundColor: "rgba(147, 51, 234, 0.9)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full font-semibold transition-all duration-300 text-white shadow-lg"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(147, 51, 234, 0.1)",
              borderColor: "rgba(147, 51, 234, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-purple-500/40 rounded-full font-semibold transition-all duration-300 text-purple-200 hover:text-white"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-purple-400/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
