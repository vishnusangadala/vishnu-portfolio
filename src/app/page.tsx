"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { AgentDemo } from "@/components/AgentDemo";
import { Education } from "@/components/Education";
import { Contact, Footer } from "@/components/Contact";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <AgentDemo />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}
