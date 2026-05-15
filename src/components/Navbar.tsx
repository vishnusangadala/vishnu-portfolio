"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Terminal, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-40"
    >
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled
            ? "oklch(8% 0.02 270 / 85%)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            aria-label="Home"
            className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm text-white select-none"
            style={{
              background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
              boxShadow: "0 0 16px oklch(58% 0.22 295 / 30%)",
              letterSpacing: "-0.03em",
            }}
          >
            VS
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                background: "var(--bg-card)",
              }}
              title="Open terminal (⌘K)"
            >
              <Terminal size={12} />
              <span>⌘K</span>
            </button>

            <button
              onClick={toggle}
              className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-card)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              className="md:hidden w-8 h-8 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "var(--text-muted)" }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b"
            style={{
              background: "oklch(8% 0.02 270 / 95%)",
              backdropFilter: "blur(12px)",
              borderColor: "var(--border)",
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { onOpenTerminal(); setMobileOpen(false); }}
                className="flex items-center gap-2 text-sm text-left"
                style={{ color: "var(--cyan)" }}
              >
                <Terminal size={14} />
                Open Terminal
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
