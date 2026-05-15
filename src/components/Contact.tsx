"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/data/content";
import { SectionLabel } from "./About";
import { Mail, Link2, Globe, MapPin, ExternalLink, Code2 } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="py-24"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Contact</SectionLabel>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "var(--text)", lineHeight: 1.05 }}
          >
            Let&apos;s build
            <br />
            <span className="gradient-text">something</span>
            <br />
            serious.
          </h2>

          <p className="mb-12 text-base max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            I&apos;m actively seeking full-time backend/distributed systems or AI infrastructure roles
            starting May 2026. Open to finance, tech, and AI-native companies.
          </p>

          <div className="flex items-center justify-center gap-2 mb-12" style={{ color: "var(--text-subtle)" }}>
            <MapPin size={14} />
            <span className="text-sm">{siteConfig.location}</span>
          </div>
        </motion.div>

        {/* CTA grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid sm:grid-cols-2 gap-4 mb-8"
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 group"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(75% 0.2 200 / 50%)";
              (e.currentTarget as HTMLElement).style.background = "oklch(75% 0.2 200 / 5%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "oklch(75% 0.2 200 / 12%)" }}
            >
              <Mail size={18} style={{ color: "var(--cyan)" }} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-subtle)" }}>Email</div>
              <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                {siteConfig.email}
              </div>
            </div>
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-subtle)" }} />
          </a>

          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 group"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(58% 0.22 295 / 50%)";
              (e.currentTarget as HTMLElement).style.background = "oklch(58% 0.22 295 / 5%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "oklch(58% 0.22 295 / 12%)" }}
            >
              <Globe size={18} style={{ color: "var(--violet)" }} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-subtle)" }}>LinkedIn</div>
              <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                Vishnu Sangadala
              </div>
            </div>
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-subtle)" }} />
          </a>

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 group"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(55% 0.2 265 / 50%)";
              (e.currentTarget as HTMLElement).style.background = "oklch(55% 0.2 265 / 5%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "oklch(55% 0.2 265 / 12%)" }}
            >
              <Link2 size={18} style={{ color: "var(--indigo)" }} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-subtle)" }}>GitHub</div>
              <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                @vishnusangadala
              </div>
            </div>
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-subtle)" }} />
          </a>

          <a
            href={siteConfig.links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 group"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "oklch(80% 0.22 140 / 50%)";
              (e.currentTarget as HTMLElement).style.background = "oklch(80% 0.22 140 / 5%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "oklch(80% 0.22 140 / 12%)" }}
            >
              <Code2 size={18} style={{ color: "var(--lime)" }} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-subtle)" }}>LeetCode</div>
              <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                500+ problems solved
              </div>
            </div>
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-subtle)" }} />
          </a>

        </motion.div>

        {/* Big email CTA */}
        <motion.a
          href={`mailto:${siteConfig.email}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-white"
          style={{
            background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
            boxShadow: "0 0 40px oklch(58% 0.22 295 / 30%)",
          }}
        >
          <Mail size={18} />
          Say hello →
        </motion.a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: "var(--text-subtle)" }}>
            vishnu@portfolio:~/projects $
          </span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="inline-block w-2 h-3.5"
            style={{ background: "var(--cyan)" }}
          />
        </div>
        <p className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>
          © 2026 Vishnu Sangadala · Built with Next.js + Framer Motion
        </p>
      </div>
    </footer>
  );
}
