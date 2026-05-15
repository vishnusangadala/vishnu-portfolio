"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education, achievements } from "@/data/content";
import { SectionLabel } from "./About";
import { GraduationCap, Trophy, Zap, Rocket, TrendingDown } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={18} />,
  Zap: <Zap size={18} />,
  Rocket: <Rocket size={18} />,
  TrendingDown: <TrendingDown size={18} />,
};

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-24" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Education</SectionLabel>
          <h2
            className="font-black mb-12"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)" }}
          >
            Where I&apos;ve studied
          </h2>
        </motion.div>

        {/* Education cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
              className="rounded-xl border p-6 gradient-border"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "oklch(58% 0.22 295 / 12%)" }}
                >
                  <GraduationCap size={20} style={{ color: "var(--violet)" }} />
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs font-mono uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    {edu.period}
                  </p>
                  <h3 className="font-bold text-base mb-0.5" style={{ color: "var(--text)" }}>
                    {edu.degree}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded border"
                      style={{
                        borderColor: "oklch(75% 0.2 200 / 25%)",
                        color: "var(--cyan)",
                        background: "oklch(75% 0.2 200 / 8%)",
                      }}
                    >
                      GPA {edu.gpa}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {edu.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <span
                          className="mt-2 w-1 h-1 rounded-full shrink-0"
                          style={{ background: "var(--violet)" }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3
            className="text-sm font-mono uppercase tracking-widest mb-6"
            style={{ color: "var(--text-subtle)" }}
          >
            Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="rounded-xl border p-4 text-center"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ background: "oklch(55% 0.2 265 / 12%)" }}
                >
                  <span style={{ color: "var(--indigo)" }}>{iconMap[a.icon]}</span>
                </div>
                <div className="font-black text-xl gradient-text mb-1">{a.value}</div>
                <div className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  {a.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
