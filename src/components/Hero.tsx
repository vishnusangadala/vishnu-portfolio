"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Link2, Globe, FileText } from "lucide-react";
import { siteConfig } from "@/data/content";

const TAGLINES = [
  "Backend systems engineer building at the edge of multi-agent AI.",
  "I ship distributed systems. I research multi-agent AI. Sometimes both at once.",
  "Java, Kafka, Kubernetes by day. LangGraph and LLaMA by night.",
];

function useTypewriter(text: string, speed = 35) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

function GradientBlob() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.parentElement!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ref.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-transform duration-700 ease-out"
      style={{
        background:
          "radial-gradient(circle, oklch(58% 0.22 295), oklch(55% 0.2 265), transparent 70%)",
      }}
      aria-hidden
    />
  );
}

const nameWords = "Vishnu Sangadala".split(" ");

export function Hero() {
  const [taglineIdx] = useState(0);
  const { displayed, done } = useTypewriter(TAGLINES[taglineIdx], 30);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      {/* Gradient blob */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <GradientBlob />
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, var(--bg) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border"
            style={{
              borderColor: "oklch(58% 0.22 295 / 30%)",
              background: "oklch(58% 0.22 295 / 8%)",
              color: "var(--violet)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--lime)" }}
            />
            Open to full-time roles · May 2026
          </span>
        </motion.div>

        {/* Name — staggered word reveal */}
        <h1
          className="font-black leading-tight mb-6 select-none"
          style={{ fontSize: "clamp(3rem, 12vw, 7rem)" }}
          aria-label="Vishnu Sangadala"
        >
          {nameWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.4 + i * 0.18,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="gradient-text inline-block"
              style={{ marginRight: i < nameWords.length - 1 ? "0.25em" : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Typewriter tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mb-10 font-light"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "var(--text-muted)",
            minHeight: "2.5em",
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
              style={{ background: "var(--cyan)" }}
            />
          )}
        </motion.div>

        {/* Sub labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            "M.S. CS · Stony Brook",
            "2+ yrs Production Backend",
            "Multi-Agent AI Research",
          ].map((label) => (
            <span
              key={label}
              className="text-xs px-3 py-1 rounded-md border font-mono"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-subtle)",
                background: "var(--bg-card)",
              }}
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href={siteConfig.links.resume} download primary>
            <FileText size={16} />
            Resume
          </MagneticButton>

          <MagneticButton href={siteConfig.links.github}>
            <Link2 size={16} />
            GitHub
          </MagneticButton>

          <MagneticButton href={`mailto:${siteConfig.email}`}>
            <Mail size={16} />
            Email
          </MagneticButton>

          <MagneticButton href={siteConfig.links.linkedin}>
            <Globe size={16} />
            LinkedIn
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--text-subtle)" }}
        aria-label="Scroll to about"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}

function MagneticButton({
  children,
  href,
  download,
  primary,
}: {
  children: React.ReactNode;
  href: string;
  download?: boolean;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      target={!download && href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all duration-200"
      style={
        primary
          ? {
              background:
                "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
              color: "white",
              border: "none",
              boxShadow: "0 0 20px oklch(58% 0.22 295 / 30%)",
            }
          : {
              borderColor: "var(--border)",
              color: "var(--text-muted)",
              background: "var(--bg-card)",
            }
      }
    >
      {children}
    </a>
  );
}
