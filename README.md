# Vishnu Sangadala — Personal Portfolio

Bold, animated, gradient-rich personal portfolio built with Next.js 16, Tailwind CSS, and Framer Motion. Positions Vishnu as a backend/distributed systems engineer with a multi-agent AI research edge.

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Environment Variables

The agent demo widget runs as a **scripted simulation** and works with no API key. If you want to swap it to live Anthropic API calls (Option A), copy `.env.example` to `.env.local` and add your key:

```bash
cp .env.example .env.local
# Edit .env.local and set ANTHROPIC_API_KEY=sk-ant-...
```

## Editing Content

**All personal data lives in one file:**

```
src/data/content.ts
```

Edit that file to update:
- Name, email, phone, location, social links
- Tagline and about paragraphs
- Experience entries (roles, bullets, metrics, tech)
- Projects (descriptions, highlights, tech stack)
- Skills (categories and items)
- Education
- Terminal command responses

No data is scattered in components — everything pulls from `content.ts`.

## Replacing the Resume

Drop your actual PDF at:

```
public/resume.pdf
```

The current file is a blank placeholder.

## Updating Social Links

In `src/data/content.ts`, update the `links` object:

```ts
links: {
  linkedin: "https://linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  leetcode: "https://leetcode.com/your-handle",
  resume: "/resume.pdf",
},
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the GitHub repo at vercel.com → New Project → Import. No extra config needed — Next.js is auto-detected.

If using the live API demo, add `ANTHROPIC_API_KEY` as an environment variable in the Vercel project settings.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS v4 + CSS custom properties (OKLCH) |
| Animation | Framer Motion |
| Architecture diagrams | @xyflow/react (React Flow) |
| Icons | lucide-react |
| Theme | Custom dark/light toggle via CSS class |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| AI SDK | Anthropic SDK (optional live demo) |

## Project Structure

```
src/
  app/
    page.tsx          ← root page, wires all sections
    layout.tsx        ← metadata, ThemeProvider
    globals.css       ← CSS variables, base styles
    sitemap.ts        ← auto sitemap
    robots.ts         ← robots.txt
  components/
    Hero.tsx          ← animated hero, typewriter, magnetic buttons
    About.tsx         ← editorial about + quick facts
    Experience.tsx    ← timeline with animated metric counters
    Projects.tsx      ← card grid + architecture diagram modal
    ArchitectureDiagram.tsx  ← React Flow diagrams per project
    AgentDemo.tsx     ← OLLA Lite scripted agent demo widget
    Skills.tsx        ← filterable skill tag cloud
    Education.tsx     ← education cards + achievements
    Contact.tsx       ← contact grid + footer
    Navbar.tsx        ← fixed nav with ⌘K shortcut
    CommandPalette.tsx ← terminal-style command palette
    ThemeProvider.tsx  ← dark/light theme context
  data/
    content.ts        ← ALL personal data (edit here)
public/
  resume.pdf          ← replace with your actual resume
  favicon.svg         ← VS monogram favicon
```

## Signature Features

1. **Animated Architecture Diagrams** — React Flow diagrams for OLLA, Code Reviewer, Distributed Social Platform, and Job Pipeline with animated edges and pulsing nodes.

2. **OLLA Lite Agent Demo** — Scripted simulation of the Solver → Reviewer → Output pipeline. Realistic typing delays, per-agent panels with thinking indicators. 4 pre-loaded queries on distributed systems and AI topics.

3. **Terminal Command Palette** — Press `⌘K` anywhere to open. Supports `whoami`, `experience`, `skills --json`, `goto <section>`, `theme toggle`, `sudo hire-me`, `cat ~/.coffee_preferences`, and more.
