"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { terminalCommands, siteConfig } from "@/data/content";
import { useTheme } from "./ThemeProvider";
import { X, Terminal, CornerDownLeft } from "lucide-react";

const SUGGESTIONS = [
  "whoami",
  "experience",
  "skills --json",
  "contact",
  "resume",
  "goto projects",
  "goto about",
  "goto experience",
  "goto skills",
  "goto contact",
  "theme toggle",
  "sudo hire-me",
  "cat ~/.coffee_preferences",
  "help",
];

type HistoryItem = {
  type: "input" | "output";
  text: string;
};

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filtered, setFiltered] = useState(SUGGESTIONS);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { toggle } = useTheme();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setInput("");
      setFiltered(SUGGESTIONS);
    }
  }, [open]);

  useEffect(() => {
    const f = input
      ? SUGGESTIONS.filter((s) => s.includes(input.toLowerCase()))
      : SUGGESTIONS;
    setFiltered(f);
    setCursor(0);
  }, [input]);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [history]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setHistory((h) => [...h, { type: "input", text: cmd }]);

    if (trimmed.startsWith("goto ")) {
      const section = trimmed.replace("goto ", "");
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      setHistory((h) => [...h, { type: "output", text: `Navigating to #${section}...` }]);
      setTimeout(onClose, 600);
    } else if (trimmed === "contact") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setHistory((h) => [...h, { type: "output", text: terminalCommands.contact }]);
      setTimeout(onClose, 600);
    } else if (trimmed === "resume") {
      const a = document.createElement("a");
      a.href = siteConfig.links.resume;
      a.download = "Vishnu_Sangadala_Resume.pdf";
      a.click();
      setHistory((h) => [...h, { type: "output", text: "Downloading resume..." }]);
    } else if (trimmed === "theme toggle") {
      toggle();
      setHistory((h) => [...h, { type: "output", text: "Theme toggled." }]);
    } else if (terminalCommands[trimmed as keyof typeof terminalCommands]) {
      setHistory((h) => [
        ...h,
        { type: "output", text: terminalCommands[trimmed as keyof typeof terminalCommands] },
      ]);
    } else if (trimmed === "clear") {
      setHistory([]);
    } else if (trimmed === "") {
      // no-op
    } else {
      setHistory((h) => [
        ...h,
        { type: "output", text: `Command not found: ${cmd}\nType 'help' to see available commands.` },
      ]);
    }

    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = filtered[cursor] && !input ? filtered[cursor] : input;
      runCommand(cmd || input);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (filtered[cursor]) setInput(filtered[cursor]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "oklch(0% 0 0 / 65%)", backdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl rounded-xl border shadow-2xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "0 0 60px oklch(58% 0.22 295 / 20%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "oklch(60% 0.22 25)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "oklch(70% 0.2 85)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "oklch(65% 0.22 145)" }} />
              </div>
              <span
                className="flex-1 text-center text-xs font-mono"
                style={{ color: "var(--text-subtle)" }}
              >
                vishnu@portfolio ~ terminal
              </span>
              <button
                onClick={onClose}
                className="transition-colors"
                style={{ color: "var(--text-subtle)" }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Output history */}
            <div
              ref={outputRef}
              className="px-4 pt-4 space-y-3 font-mono text-sm max-h-64 overflow-y-auto"
            >
              {history.length === 0 && (
                <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  Type a command or use ↑↓ to navigate. Enter to run, Tab to complete.
                </p>
              )}
              {history.map((item, i) => (
                <div key={i}>
                  {item.type === "input" ? (
                    <div className="flex items-start gap-2">
                      <span style={{ color: "var(--cyan)" }}>$</span>
                      <span style={{ color: "var(--text)" }}>{item.text}</span>
                    </div>
                  ) : (
                    <div
                      className="pl-4 whitespace-pre-wrap text-xs leading-relaxed border-l-2"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                    >
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t mt-3"
              style={{ borderColor: "var(--border)" }}
            >
              <Terminal size={14} style={{ color: "var(--cyan)" }} />
              <span className="font-mono text-sm" style={{ color: "var(--cyan)" }}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="type a command..."
                className="flex-1 bg-transparent outline-none font-mono text-sm"
                style={{ color: "var(--text)", caretColor: "var(--cyan)" }}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                <CornerDownLeft size={12} />
              </span>
            </div>

            {/* Suggestions */}
            {filtered.length > 0 && (
              <div
                className="border-t max-h-40 overflow-y-auto"
                style={{ borderColor: "var(--border)" }}
              >
                {filtered.slice(0, 8).map((s, i) => (
                  <button
                    key={s}
                    onClick={() => runCommand(s)}
                    className="w-full text-left px-4 py-2 font-mono text-xs flex items-center gap-3 transition-colors"
                    style={{
                      background: i === cursor ? "oklch(58% 0.22 295 / 10%)" : "transparent",
                      color: i === cursor ? "var(--violet)" : "var(--text-subtle)",
                    }}
                    onMouseEnter={() => setCursor(i)}
                  >
                    <span style={{ color: i === cursor ? "var(--violet)" : "var(--border)" }}>›</span>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
