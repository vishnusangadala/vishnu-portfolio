"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/data/content";
import { SectionLabel } from "./About";
import { X, ExternalLink, GitBranch } from "lucide-react";
import dynamic from "next/dynamic";

const ArchitectureDiagram = dynamic(
  () => import("./ArchitectureDiagram").then((m) => m.ArchitectureDiagram),
  { ssr: false, loading: () => <div className="h-[220px] rounded-xl animate-pulse" style={{ background: "var(--bg-card)" }} /> }
);

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "oklch(0% 0 0 / 75%)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-3xl w-full rounded-2xl border p-8 max-h-[85vh] overflow-y-auto"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            <X size={16} />
          </button>

          <div className="mb-2">
            <span
              className="text-xs font-mono"
              style={{ color: "var(--text-subtle)" }}
            >
              {project.period} · {project.status}
            </span>
          </div>
          <h3 className="font-black text-2xl mb-1" style={{ color: "var(--text)" }}>
            {project.title}
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            {project.subtitle}
          </p>

          <div className="mb-6">
            <h4
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: "var(--text-subtle)" }}
            >
              Architecture
            </h4>
            <ArchitectureDiagram type={project.architectureType} />
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            {project.description}
          </p>

          <div className="mb-6">
            <h4
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: "var(--text-subtle)" }}
            >
              Highlights
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--violet)" }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: "var(--text-subtle)" }}
            >
              Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded border font-mono"
                  style={{ borderColor: "var(--border)", color: "var(--text-subtle)", background: "var(--bg)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-xl border p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-card)",
      }}
      onClick={onOpen}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(58% 0.22 295 / 50%)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px oklch(58% 0.22 295 / 10%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitBranch size={12} style={{ color: "var(--text-subtle)" }} />
            <span className="text-xs font-mono" style={{ color: "var(--text-subtle)" }}>
              {project.period}
            </span>
          </div>
          <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
            {project.title}
          </h3>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {project.subtitle}
          </p>
        </div>
        <ExternalLink
          size={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
          style={{ color: "var(--text-subtle)" }}
        />
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
        {project.description.slice(0, 140)}…
      </p>

      {/* Highlights */}
      <ul className="space-y-1 mb-4">
        {project.highlights.slice(0, 2).map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-subtle)" }}>
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--violet)" }} />
            {h}
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="flex flex-wrap gap-1">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-[10px] px-2 py-0.5 rounded border font-mono"
            style={{ borderColor: "var(--border)", color: "var(--text-subtle)", background: "var(--bg)" }}
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span
            className="text-[10px] px-2 py-0.5 rounded font-mono"
            style={{ color: "var(--text-subtle)" }}
          >
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      <div
        className="mt-4 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--violet)" }}
      >
        <span>View architecture diagram</span>
        <ExternalLink size={10} />
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Projects</SectionLabel>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)" }}
          >
            Things I&apos;ve built
          </h2>
          <p className="mb-12 text-sm" style={{ color: "var(--text-muted)" }}>
            Click any card to see the architecture diagram and full breakdown.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
