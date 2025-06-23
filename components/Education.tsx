"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".education-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
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

  const education = [
    {
      degree: "Master in Computer Application (MCA)",
      institution: "Lovely Professional University",
      period: "2022-2024",
      description:
        "Comprehensive program covering advanced computer science concepts, software development, and system design.",
      color: "from-purple-500 to-pink-500",
    },
    {
      degree: "Bachelor of Science in Chemistry",
      institution: "Jagannath Jew Mahavidyalaya",
      period: "2017-2020",
      description: "Strong foundation in analytical thinking and problem-solving methodologies.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      degree: "Higher Secondary Education",
      institution: "Pingua Degree College",
      period: "2015-2017",
      description: "Council of Higher Secondary Education certification with focus on science subjects.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section id="education" ref={sectionRef} className="relative py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
        >
          Education
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                className="education-item relative flex items-start space-x-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeline dot */}
                <div
                  className={`relative z-10 w-4 h-4 bg-gradient-to-r ${edu.color} rounded-full border-4 border-black flex-shrink-0 mt-6`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${edu.color} rounded-full animate-ping opacity-20`}
                  ></div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                      {edu.degree}
                    </h3>
                    <span className="text-white/60 text-sm font-medium mt-1 md:mt-0">{edu.period}</span>
                  </div>

                  <h4 className="text-lg font-semibold text-white/90 mb-3">{edu.institution}</h4>

                  <p className="text-white/70 leading-relaxed">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
