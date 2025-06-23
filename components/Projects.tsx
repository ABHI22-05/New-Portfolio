"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
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

  const projects = [
    {
      title: "Digital Bank Web Application",
      description:
        "A comprehensive online banking platform developed using Java technologies. The application offers a range of banking services and features to customers, providing secure and efficient banking services.",
      technologies: ["Java", "Spring Boot", "MySQL", "HTML/CSS"],
      features: [
        "Secure online banking services",
        "Account management",
        "Transaction processing",
        "Customer dashboard",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Cricket Scorecard Application",
      description:
        "A web application where users can view live cricket scores, scorecards, match statistics, and other related information. Built with React frontend and Node.js backend.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      features: ["Live cricket scores", "Match statistics", "Scorecard management", "Community engagement"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Food Wastage Management System",
      description:
        "A C++ based CLI application aimed at addressing food wastage by providing an efficient solution for managing surplus food distribution and minimizing wastage.",
      technologies: ["C++", "CLI", "File System"],
      features: ["Surplus food tracking", "Distribution management", "Wastage analytics", "Resource optimization"],
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3
                      className={`text-2xl font-bold mb-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/80 mb-6 leading-relaxed">{project.description}</p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-white/90">Key Features:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2 text-white/70">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-white/90">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-6 px-6 py-3 bg-gradient-to-r ${project.color} rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
