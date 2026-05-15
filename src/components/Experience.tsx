"use client";

import { useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { experiences } from "@/data/content";
import { SectionLabel } from "./About";
import { ChevronDown, ChevronUp, Briefcase, GraduationCap } from "lucide-react";
import { useEffect } from "react";

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const num = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(num)) {
      if (ref.current) ref.current.textContent = value;
      return;
    }
    const ctrl = animate(0, num, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toLocaleString() + (value.includes("%") ? "%" : suffix);
        }
      },
    });
    return () => ctrl.stop();
  }, [isInView, value, suffix]);

  return <span ref={ref}>0</span>;
}

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline line */}
      <div
        className="absolute left-[11px] top-6 bottom-0 w-px"
        style={{ background: "var(--border)" }}
      />

      {/* Timeline dot */}
      <div
        className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: "var(--violet)",
          background: "var(--bg)",
        }}
      >
        {exp.type === "Research" ? (
          <GraduationCap size={10} style={{ color: "var(--violet)" }} />
        ) : (
          <Briefcase size={10} style={{ color: "var(--violet)" }} />
        )}
      </div>

      <div
        className="rounded-xl border p-6 ml-2 transition-all duration-300 cursor-pointer group"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{
                  background: exp.type === "Research" ? "oklch(58% 0.22 295 / 12%)" : "oklch(55% 0.2 265 / 12%)",
                  color: exp.type === "Research" ? "var(--violet)" : "var(--indigo)",
                }}
              >
                {exp.type}
              </span>
              <span
                className="text-xs font-mono"
                style={{ color: "var(--text-subtle)" }}
              >
                {exp.period}
              </span>
            </div>
            <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
              {exp.role}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {exp.company} · {exp.location}
            </p>
          </div>
          <button
            className="mt-1 p-1 rounded transition-colors"
            style={{ color: "var(--text-subtle)" }}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Metric pills */}
        {exp.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border"
                style={{ borderColor: "oklch(75% 0.2 200 / 20%)", background: "oklch(75% 0.2 200 / 6%)" }}
              >
                <span className="font-mono font-bold" style={{ color: "var(--cyan)" }}>
                  <AnimatedCounter value={m.value} />
                </span>
                <span style={{ color: "var(--text-subtle)" }}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Expandable bullets */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="mt-5 space-y-2">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--violet)" }} />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded border font-mono"
                style={{ borderColor: "var(--border)", color: "var(--text-subtle)", background: "var(--bg)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="experience"
      className="py-24"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Experience</SectionLabel>
          <h2
            className="font-black mb-12"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)" }}
          >
            Where I&apos;ve built things
          </h2>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
