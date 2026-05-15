"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/content";
import { SectionLabel } from "./About";
import { Code2, Server, Database, Cloud, Brain, TestTube2 } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={18} />,
  Server: <Server size={18} />,
  Database: <Database size={18} />,
  Cloud: <Cloud size={18} />,
  Brain: <Brain size={18} />,
  TestTube2: <TestTube2 size={18} />,
};

const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  Languages: { border: "oklch(75% 0.2 200 / 30%)", bg: "oklch(75% 0.2 200 / 8%)", text: "oklch(75% 0.2 200)" },
  "Backend & Systems": { border: "oklch(55% 0.2 265 / 30%)", bg: "oklch(55% 0.2 265 / 8%)", text: "oklch(55% 0.2 265)" },
  Data: { border: "oklch(60% 0.24 320 / 30%)", bg: "oklch(60% 0.24 320 / 8%)", text: "oklch(60% 0.24 320)" },
  "Cloud & DevOps": { border: "oklch(58% 0.22 295 / 30%)", bg: "oklch(58% 0.22 295 / 8%)", text: "oklch(58% 0.22 295)" },
  "AI / ML": { border: "oklch(80% 0.22 140 / 30%)", bg: "oklch(80% 0.22 140 / 8%)", text: "oklch(80% 0.22 140)" },
  Testing: { border: "oklch(65% 0.15 30 / 30%)", bg: "oklch(65% 0.15 30 / 8%)", text: "oklch(65% 0.15 30)" },
};

function SkillTag({
  label,
  color,
  delay,
  isInView,
}: {
  label: string;
  color: { border: string; bg: string; text: string };
  delay: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-mono border cursor-default transition-all duration-200"
      style={{
        borderColor: hovered ? color.text : color.border,
        background: hovered ? color.bg : "transparent",
        color: hovered ? color.text : "var(--text-muted)",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? `0 4px 12px ${color.text}20` : "none",
      }}
    >
      {label}
    </motion.span>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayedSkills =
    activeCategory
      ? skills.filter((s) => s.category === activeCategory)
      : skills;

  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-6">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Skills</SectionLabel>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)" }}
          >
            My toolkit
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            Hover to highlight. Filter by category.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border transition-all duration-200"
            style={{
              borderColor: !activeCategory ? "var(--text-muted)" : "var(--border)",
              background: !activeCategory ? "var(--bg-card)" : "transparent",
              color: !activeCategory ? "var(--text)" : "var(--text-subtle)",
            }}
          >
            All
          </button>
          {skills.map((s) => {
            const color = categoryColors[s.category];
            const active = activeCategory === s.category;
            return (
              <button
                key={s.category}
                onClick={() => setActiveCategory(active ? null : s.category)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border transition-all duration-200"
                style={{
                  borderColor: active ? color.text : color.border,
                  background: active ? color.bg : "transparent",
                  color: active ? color.text : "var(--text-subtle)",
                }}
              >
                <span style={{ color: active ? color.text : "var(--text-subtle)" }}>
                  {iconMap[s.icon]}
                </span>
                {s.category}
              </button>
            );
          })}
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-8">
          {displayedSkills.map((group) => {
            const color = categoryColors[group.category];
            return (
              <motion.div
                key={group.category}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: color.bg, color: color.text }}
                  >
                    {iconMap[group.icon]}
                  </div>
                  <h3 className="font-semibold text-sm" style={{ color: "var(--text-muted)" }}>
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <SkillTag
                      key={item}
                      label={item}
                      color={color}
                      delay={i * 0.04}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
