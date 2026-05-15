"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./About";
import { useInView } from "framer-motion";
import { Play, RotateCcw, Zap } from "lucide-react";

const DEMO_QUERIES = [
  "Explain the CAP theorem and when to prioritize consistency vs availability.",
  "What are the trade-offs between Kafka and RabbitMQ for event streaming?",
  "How does LangGraph differ from a simple LLM chain?",
  "What makes Neo4j better than PostgreSQL for social graph queries?",
];

type AgentStep = {
  agent: "Solver" | "Reviewer" | "Output";
  content: string;
  delay: number;
};

const DEMO_SCRIPTS: Record<string, AgentStep[]> = {
  "Explain the CAP theorem and when to prioritize consistency vs availability.": [
    {
      agent: "Solver",
      delay: 600,
      content:
        "The CAP theorem states a distributed system can only guarantee two of: **Consistency** (every read sees the latest write), **Availability** (every request gets a response), **Partition tolerance** (system survives network splits).\n\nSince partitions are inevitable in production, the real choice is CP vs AP. Prioritize **consistency** for financial systems, inventory management, or anything where stale data causes real harm. Prioritize **availability** for social feeds, recommendation engines, or analytics where eventual consistency is fine.",
    },
    {
      agent: "Reviewer",
      delay: 2000,
      content:
        "Good foundational answer. I'd strengthen it by noting that CAP is often oversimplified — PACELC is a more nuanced model that accounts for latency trade-offs even *without* a partition. Also worth mentioning that databases like CockroachDB attempt CP with high availability via Raft consensus, and Cassandra is tunable between CP/AP per-operation.",
    },
    {
      agent: "Output",
      delay: 3600,
      content:
        "**CAP Theorem:** Consistency, Availability, Partition Tolerance — pick two. Since network partitions are unavoidable, the real trade-off is CP vs AP.\n\n• **Choose CP** → finance, inventory, booking systems (stale = catastrophic)\n• **Choose AP** → social feeds, analytics, search (eventual consistency is fine)\n\n**Pro tip:** PACELC extends CAP to model latency vs consistency trade-offs even in partition-free scenarios — relevant when you're optimizing for P99 latency.",
    },
  ],
  "What are the trade-offs between Kafka and RabbitMQ for event streaming?": [
    {
      agent: "Solver",
      delay: 600,
      content:
        "Kafka is a **distributed log** — messages are retained, consumers track their own offsets, and you can replay. It's designed for high-throughput, ordered event streams. Great for: event sourcing, audit logs, stream processing (Kafka Streams/Flink).\n\nRabbitMQ is a **message broker** — it routes messages to queues and deletes them on acknowledgment. Better for: task queues, RPC patterns, complex routing logic (topic exchanges, fanout). Lower throughput ceiling but much richer routing semantics.",
    },
    {
      agent: "Reviewer",
      delay: 2100,
      content:
        "Accurate, but I'd add the operational dimension: Kafka's operational complexity is significantly higher — ZooKeeper/KRaft, partition rebalancing, consumer group lag monitoring. RabbitMQ is easier to operate at smaller scale. Also: Kafka retains by time/size, not by consumer acknowledgment — this is a crucial architectural difference for replay and exactly-once semantics.",
    },
    {
      agent: "Output",
      delay: 3700,
      content:
        "**Kafka** → use when you need: high throughput (millions/sec), message replay, event sourcing, stream processing. Trade-off: higher operational complexity.\n\n**RabbitMQ** → use when you need: complex routing, task queues, RPC, simpler ops. Trade-off: no native replay, lower throughput ceiling.\n\n**Rule of thumb:** If downstream consumers need to replay events or multiple teams consume the same stream independently, Kafka. If you're dispatching jobs to workers with complex priority/routing, RabbitMQ.",
    },
  ],
  "How does LangGraph differ from a simple LLM chain?": [
    {
      agent: "Solver",
      delay: 500,
      content:
        "A simple LLM chain (LangChain's `LLMChain` or pipe operator) is **linear and stateless** — input → prompt → LLM → output. No loops, no branching, no memory of what happened three steps ago.\n\nLangGraph introduces a **stateful graph** where nodes are agents or tools and edges can be conditional. You get: cycles (agent can call a tool, evaluate the result, and loop), persistent state across turns, human-in-the-loop checkpoints, and parallel execution of independent nodes.",
    },
    {
      agent: "Reviewer",
      delay: 1900,
      content:
        "Good contrast. Worth adding: LangGraph's state is typed (TypedDict), which gives you predictable debugging — you can inspect the state object at every node transition. Also, LangGraph supports streaming at the node level, so you can observe partial outputs from each agent as it runs, not just the final result. This is what OLLA uses for real-time reviewer feedback.",
    },
    {
      agent: "Output",
      delay: 3400,
      content:
        "**LLM Chain:** linear, stateless, no cycles. Good for single-shot transforms.\n\n**LangGraph:** stateful graph with typed state, conditional edges, cycles, and human-in-the-loop. Good for:\n• Multi-agent systems (Solver → Reviewer → loop until convergence)\n• Long-running workflows with memory\n• Observable, debuggable agent pipelines\n\nUse chains for simple prompt transforms. Use LangGraph when agents need to make decisions, use tools, or collaborate.",
    },
  ],
  "What makes Neo4j better than PostgreSQL for social graph queries?": [
    {
      agent: "Solver",
      delay: 500,
      content:
        "Relational databases store data in tables with foreign keys. A query like \"find all friends-of-friends\" requires JOINs across potentially millions of rows — the cost grows exponentially with graph depth. Neo4j stores data as **native graph** — nodes, relationships, and properties. Traversals follow pointers directly, making k-hop queries run in near-constant time regardless of graph size.",
    },
    {
      agent: "Reviewer",
      delay: 1800,
      content:
        "The index-free adjacency point is key and you touched on it implicitly: in Neo4j, each node stores direct pointers to its neighbor nodes, so traversals don't hit an index — they follow memory pointers. PostgreSQL requires a B-tree index lookup per JOIN. For 1-hop queries PostgreSQL is competitive; at 3+ hops Neo4j wins decisively. Also worth noting: Cypher's pattern-matching syntax makes complex graph queries far more readable than equivalent recursive CTEs in SQL.",
    },
    {
      agent: "Output",
      delay: 3300,
      content:
        "**Neo4j wins for social graphs because:**\n\n1. **Index-free adjacency** — traversals follow direct memory pointers, not index lookups\n2. **Depth scaling** — k-hop queries stay fast as graph grows; SQL JOINs degrade exponentially\n3. **Cypher syntax** — `MATCH (a)-[:FOLLOWS*1..3]->(b)` is cleaner than recursive CTEs\n\n**PostgreSQL is fine when:** you have simple 1-hop lookups, need strong ACID guarantees, or your graph data is sparse. For the Distributed Social Platform project, Neo4j delivered a **2× query speed improvement** over PostgreSQL for friend-of-friend traversals.",
    },
  ],
};

function TypingText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const SPEED = 12;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, SPEED);
    return () => clearInterval(id);
  }, [text, onDone]);

  return (
    <span className="whitespace-pre-wrap text-sm" style={{ color: "var(--text-muted)" }}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle animate-pulse" style={{ background: "var(--cyan)" }} />
      )}
    </span>
  );
}

type PanelState = "idle" | "thinking" | "done";

function AgentPanel({
  name,
  color,
  state,
  content,
  onDone,
}: {
  name: string;
  color: string;
  state: PanelState;
  content: string;
  onDone?: () => void;
}) {
  return (
    <div
      className="rounded-xl border flex-1 min-w-0 flex flex-col"
      style={{ borderColor: state === "done" || state === "thinking" ? color + "50" : "var(--border)", background: "var(--bg)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b rounded-t-xl"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: state === "idle" ? "var(--border)" : color,
            animation: state === "thinking" ? "pulse 1s infinite" : "none",
          }}
        />
        <span className="font-mono text-xs font-bold" style={{ color }}>
          {name}
        </span>
        {state === "thinking" && (
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-[10px] font-mono"
            style={{ color: "var(--text-subtle)" }}
          >
            thinking...
          </motion.span>
        )}
        {state === "done" && (
          <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
            done
          </span>
        )}
      </div>
      <div className="p-4 flex-1 min-h-[120px]">
        <AnimatePresence>
          {state === "done" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <TypingText text={content} onDone={onDone} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AgentDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [selectedQuery, setSelectedQuery] = useState(DEMO_QUERIES[0]);
  const [running, setRunning] = useState(false);
  const [solverState, setSolverState] = useState<PanelState>("idle");
  const [reviewerState, setReviewerState] = useState<PanelState>("idle");
  const [outputState, setOutputState] = useState<PanelState>("idle");
  const [solverContent, setSolverContent] = useState("");
  const [reviewerContent, setReviewerContent] = useState("");
  const [outputContent, setOutputContent] = useState("");

  const runDemo = () => {
    if (running) return;
    const script = DEMO_SCRIPTS[selectedQuery];
    if (!script) return;

    setRunning(true);
    setSolverState("idle");
    setReviewerState("idle");
    setOutputState("idle");
    setSolverContent("");
    setReviewerContent("");
    setOutputContent("");

    // Solver starts thinking immediately
    setTimeout(() => setSolverState("thinking"), 200);

    script.forEach((step) => {
      setTimeout(() => {
        if (step.agent === "Solver") {
          setSolverState("done");
          setSolverContent(step.content);
          setTimeout(() => setReviewerState("thinking"), 400);
        } else if (step.agent === "Reviewer") {
          setReviewerState("done");
          setReviewerContent(step.content);
          setTimeout(() => setOutputState("thinking"), 400);
        } else if (step.agent === "Output") {
          setOutputState("done");
          setOutputContent(step.content);
          setTimeout(() => setRunning(false), 2000);
        }
      }, step.delay);
    });
  };

  const reset = () => {
    setRunning(false);
    setSolverState("idle");
    setReviewerState("idle");
    setOutputState("idle");
    setSolverContent("");
    setReviewerContent("");
    setOutputContent("");
  };

  return (
    <section
      id="demo"
      className="py-24"
      style={{ background: "var(--bg-secondary)" }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Live Demo</SectionLabel>
          <h2
            className="font-black mb-2"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--text)" }}
          >
            OLLA Lite — Try the agent
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            A scripted simulation of the Solver → Reviewer → Output pipeline from my OLLA research project.
            Select a query and watch the agents collaborate.
          </p>
        </motion.div>

        {/* Query picker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {DEMO_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => { setSelectedQuery(q); reset(); }}
              className="text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 text-left"
              style={{
                borderColor: selectedQuery === q ? "oklch(58% 0.22 295 / 50%)" : "var(--border)",
                background: selectedQuery === q ? "oklch(58% 0.22 295 / 10%)" : "var(--bg-card)",
                color: selectedQuery === q ? "var(--violet)" : "var(--text-subtle)",
              }}
            >
              {q.slice(0, 48)}…
            </button>
          ))}
        </motion.div>

        {/* Selected query display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl border p-4 mb-6"
          style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
        >
          <div className="flex items-start gap-3">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded shrink-0 mt-0.5"
              style={{ background: "oklch(75% 0.2 200 / 12%)", color: "var(--cyan)" }}
            >
              user
            </span>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {selectedQuery}
            </p>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={runDemo}
            disabled={running}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
              color: "white",
              boxShadow: "0 0 20px oklch(58% 0.22 295 / 25%)",
            }}
          >
            {running ? (
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Zap size={15} />
              </motion.span>
            ) : (
              <Play size={15} />
            )}
            {running ? "Running..." : "Run Demo"}
          </button>

          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border transition-all duration-200"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--bg-card)" }}
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <span
            className="text-xs font-mono px-2 py-1 rounded border"
            style={{ borderColor: "var(--border)", color: "var(--text-subtle)", background: "var(--bg)" }}
          >
            scripted demo
          </span>
        </div>

        {/* Agent panels */}
        <div className="flex flex-col lg:flex-row gap-4">
          <AgentPanel
            name="Solver"
            color="oklch(55% 0.2 265)"
            state={solverState}
            content={solverContent}
          />
          <AgentPanel
            name="Reviewer"
            color="oklch(60% 0.24 320)"
            state={reviewerState}
            content={reviewerContent}
          />
          <AgentPanel
            name="Output"
            color="oklch(80% 0.22 140)"
            state={outputState}
            content={outputContent}
          />
        </div>
      </div>
    </section>
  );
}
