"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2 } from "lucide-react"

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="education" ref={sectionRef} className="relative py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            Education & Foundation
          </motion.h2>

          <p className="text-lg text-slate-200 max-w-xl mx-auto">
            Formal postgraduate education in computer science, software engineering, and distributed computation.
          </p>
        </div>

        {/* Education Highlight Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="edu-card relative bg-slate-950/85 backdrop-blur-xl rounded-3xl border border-purple-500/40 p-8 md:p-10 shadow-2xl overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top row: Degree & Date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-bold">
                    Postgraduate Degree
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                    CGPA: 7.5 / 10
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-white">
                  Master of Computer Applications (MCA)
                </h3>
              </div>

              <div className="flex flex-col sm:items-end text-slate-200 text-xs sm:text-sm font-medium">
                <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                  <Calendar className="w-4 h-4" />
                  2022 – 2024
                </span>
                <span className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Punjab, India
                </span>
              </div>
            </div>

            {/* Institution */}
            <div className="py-6">
              <h4 className="font-heading text-xl font-bold text-white mb-2">
                Lovely Professional University
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
                Rigorous curriculum emphasizing core software engineering, object-oriented programming (OOP), enterprise architecture, and algorithmic design principles.
              </p>
            </div>

            {/* Coursework & Competencies */}
            <div className="pt-4 border-t border-white/10">
              <h5 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Specialized Coursework & Academic Focus</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Data Structures & Algorithms (DSA)",
                  "Java Full Stack Development",
                  "Object-Oriented Programming (OOP) & SOLID Principles",
                  "Low-Level (LLD) & High-Level (HLD) System Design",
                  "Database Management & Query Optimization (SQL)",
                  "Operating Systems, Multithreading & Concurrency",
                ].map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-100 font-medium hover:border-purple-400/40 transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
