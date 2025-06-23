"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-category",
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

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "Tailwind CSS"],
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "Backend Development",
      skills: ["Java", "Node.js", "Express.js", "C++", "Python"],
      color: "from-purple-400 to-pink-400",
    },
    {
      title: "Database",
      skills: ["MySQL", "MongoDB"],
      color: "from-green-400 to-emerald-400",
    },
    {
      title: "Programming Languages",
      skills: ["C++", "Java", "Python", "JavaScript", "TypeScript"],
      color: "from-orange-400 to-red-400",
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                className={`text-xl font-semibold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
              >
                {category.title}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-lg border border-white/20 text-center text-sm font-medium hover:border-white/40 transition-all duration-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-white/90">Course Work</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {["Data Structure and Algorithm", "Java Full-stack Development"].map((course, index) => (
              <motion.div
                key={course}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg border border-white/10"
              >
                <div className="text-lg font-medium text-white/90">{course}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
