"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { aboutParagraphs, siteConfig } from "@/data/content";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="py-24 max-w-6xl mx-auto px-6"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionLabel>About</SectionLabel>
        <h2
          className="font-black mb-12 leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
        >
          The engineer who{" "}
          <span className="gradient-text">ships systems</span>
          <br />
          and thinks at the frontier.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {aboutParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-4"
          >
            <div
              className="rounded-xl p-6 border gradient-border"
              style={{ background: "var(--bg-card)" }}
            >
              <h3
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-subtle)" }}
              >
                Quick facts
              </h3>
              <ul className="space-y-3">
                {[
                  ["Role", "Graduate Research Assistant + SWE"],
                  ["Institution", "Stony Brook University, SUNY"],
                  ["GPA", "3.62 / 4.0"],
                  ["Grad", "May 2026"],
                  ["Location", siteConfig.location],
                  ["Research", "Multi-Agent LLM Systems"],
                  ["Advisor", "Prof. I.V. Ramakrishnan"],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-4 text-sm">
                    <span
                      className="font-mono w-24 shrink-0"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      {k}
                    </span>
                    <span style={{ color: "var(--text-muted)" }}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-xl p-6 border"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            >
              <h3
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-subtle)" }}
              >
                Currently building
              </h3>
              <div className="space-y-3">
                {[
                  { color: "var(--lime)", text: "OLLA — multi-agent research system (LangGraph)" },
                  { color: "var(--cyan)", text: "Voice → desktop automation with LLMs" },
                  { color: "var(--violet)", text: "Targeting conference submission, 2026" },
                ].map(({ color, text }) => (
                  <div key={text} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                      style={{ background: color }}
                    />
                    <span style={{ color: "var(--text-muted)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="font-mono text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--cyan)" }}
      >
        {children}
      </span>
      <span
        className="flex-1 h-px max-w-24"
        style={{ background: "var(--border)" }}
      />
    </div>
  );
}
