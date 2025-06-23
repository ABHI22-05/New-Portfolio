"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const interests = ["Adventure Sports Enthusiast", "Film Buff and Critic", "Comedy Enthusiast"]

  return (
    <section id="about" ref={sectionRef} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-item text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="about-item">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">My Journey</h3>
            <p className="text-lg text-purple-100/80 leading-relaxed mb-6">
              I'm a passionate Full-Stack Developer with a Master's in Computer Application (MCA) from Lovely
              Professional University. My journey in technology began with a Bachelor's in Chemistry, which taught me
              analytical thinking and problem-solving skills that I now apply to software development.
            </p>
            <p className="text-lg text-purple-100/80 leading-relaxed">
              I specialize in creating robust web applications using modern technologies like Java, React, Node.js, and
              C++. My experience spans from building digital banking platforms to cricket scorecard applications, always
              focusing on user experience and scalable solutions.
            </p>
          </div>

          <div className="about-item">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Interests & Hobbies</h3>
            <div className="grid gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-4 bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                  <span className="text-purple-100/90">{interest}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="about-item mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "10+", label: "Projects Completed" },
              { number: "5+", label: "Technologies" },
              { number: "100%", label: "Dedication" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-purple-200/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
