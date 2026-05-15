"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type NodeProps,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";

/* ---- Custom node ---- */
function AgentNode({ data }: NodeProps) {
  const d = data as { label: string; sublabel?: string; color: string; bg: string; pulse?: boolean };
  return (
    <div
      className="rounded-xl border px-4 py-3 min-w-[120px] text-center relative"
      style={{
        borderColor: d.color,
        background: d.bg,
        boxShadow: `0 0 16px ${d.color}30`,
      }}
    >
      {d.pulse && (
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse"
          style={{ background: d.color }}
        />
      )}
      <Handle type="target" position={Position.Left} style={{ borderColor: d.color, background: "var(--bg)" }} />
      <Handle type="source" position={Position.Right} style={{ borderColor: d.color, background: "var(--bg)" }} />
      <div className="font-bold text-xs" style={{ color: d.color }}>
        {d.label}
      </div>
      {d.sublabel && (
        <div className="text-[10px] mt-0.5" style={{ color: "var(--text-subtle)" }}>
          {d.sublabel}
        </div>
      )}
    </div>
  );
}

const nodeTypes = { agent: AgentNode };

/* ---- OLLA architecture ---- */
function OllaFlow() {
  const initialNodes: Node[] = [
    {
      id: "user",
      type: "agent",
      position: { x: 0, y: 80 },
      data: { label: "User", sublabel: "prompt", color: "oklch(75% 0.2 200)", bg: "oklch(75% 0.2 200 / 8%)" },
    },
    {
      id: "orchestrator",
      type: "agent",
      position: { x: 180, y: 80 },
      data: { label: "Orchestrator", sublabel: "LangGraph", color: "oklch(58% 0.22 295)", bg: "oklch(58% 0.22 295 / 8%)", pulse: true },
    },
    {
      id: "solver",
      type: "agent",
      position: { x: 380, y: 20 },
      data: { label: "Solver", sublabel: "LLaMA 3.1", color: "oklch(55% 0.2 265)", bg: "oklch(55% 0.2 265 / 8%)", pulse: true },
    },
    {
      id: "reviewer",
      type: "agent",
      position: { x: 380, y: 140 },
      data: { label: "Reviewer", sublabel: "LLaMA 3.1", color: "oklch(60% 0.24 320)", bg: "oklch(60% 0.24 320 / 8%)", pulse: true },
    },
    {
      id: "output",
      type: "agent",
      position: { x: 580, y: 80 },
      data: { label: "Output", sublabel: "final answer", color: "oklch(80% 0.22 140)", bg: "oklch(80% 0.22 140 / 8%)" },
    },
  ];

  const initialEdges: Edge[] = [
    { id: "u-o", source: "user", target: "orchestrator", animated: true, style: { stroke: "oklch(75% 0.2 200 / 60%)" } },
    { id: "o-s", source: "orchestrator", target: "solver", animated: true, style: { stroke: "oklch(58% 0.22 295 / 60%)" } },
    { id: "o-r", source: "orchestrator", target: "reviewer", animated: true, style: { stroke: "oklch(58% 0.22 295 / 60%)" } },
    { id: "s-r", source: "solver", target: "reviewer", animated: true, style: { stroke: "oklch(55% 0.2 265 / 50%)", strokeDasharray: "5 3" }, label: "draft", labelStyle: { fill: "oklch(55% 0.2 265)", fontSize: 10 } },
    { id: "r-s", source: "reviewer", target: "solver", animated: true, style: { stroke: "oklch(60% 0.24 320 / 50%)", strokeDasharray: "5 3" }, label: "critique", labelStyle: { fill: "oklch(60% 0.24 320)", fontSize: 10 } },
    { id: "r-out", source: "reviewer", target: "output", animated: true, style: { stroke: "oklch(80% 0.22 140 / 60%)" } },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      attributionPosition="bottom-right"
    >
      <Background color="var(--border)" gap={24} size={1} />
    </ReactFlow>
  );
}

/* ---- Code Reviewer architecture ---- */
function CodeReviewerFlow() {
  const initialNodes: Node[] = [
    {
      id: "input",
      type: "agent",
      position: { x: 0, y: 80 },
      data: { label: "Code Input", sublabel: "PR / diff", color: "oklch(75% 0.2 200)", bg: "oklch(75% 0.2 200 / 8%)" },
    },
    {
      id: "analyzer",
      type: "agent",
      position: { x: 200, y: 80 },
      data: { label: "Analyzer", sublabel: "parse & index", color: "oklch(55% 0.2 265)", bg: "oklch(55% 0.2 265 / 8%)", pulse: true },
    },
    {
      id: "reviewer",
      type: "agent",
      position: { x: 400, y: 20 },
      data: { label: "Reviewer", sublabel: "quality check", color: "oklch(58% 0.22 295)", bg: "oklch(58% 0.22 295 / 8%)", pulse: true },
    },
    {
      id: "documenter",
      type: "agent",
      position: { x: 400, y: 140 },
      data: { label: "Documenter", sublabel: "gen docs", color: "oklch(60% 0.24 320)", bg: "oklch(60% 0.24 320 / 8%)", pulse: true },
    },
    {
      id: "verifier",
      type: "agent",
      position: { x: 600, y: 80 },
      data: { label: "Verifier", sublabel: "BLEU/ROUGE", color: "oklch(80% 0.22 140)", bg: "oklch(80% 0.22 140 / 8%)", pulse: true },
    },
    {
      id: "output",
      type: "agent",
      position: { x: 800, y: 80 },
      data: { label: "Report", sublabel: "PR comment", color: "oklch(75% 0.2 200)", bg: "oklch(75% 0.2 200 / 8%)" },
    },
  ];

  const initialEdges: Edge[] = [
    { id: "e1", source: "input", target: "analyzer", animated: true, style: { stroke: "oklch(75% 0.2 200 / 50%)" } },
    { id: "e2", source: "analyzer", target: "reviewer", animated: true, style: { stroke: "oklch(55% 0.2 265 / 50%)" } },
    { id: "e3", source: "analyzer", target: "documenter", animated: true, style: { stroke: "oklch(55% 0.2 265 / 50%)" } },
    { id: "e4", source: "reviewer", target: "verifier", animated: true, style: { stroke: "oklch(58% 0.22 295 / 50%)" } },
    { id: "e5", source: "documenter", target: "verifier", animated: true, style: { stroke: "oklch(60% 0.24 320 / 50%)" } },
    { id: "e6", source: "verifier", target: "output", animated: true, style: { stroke: "oklch(80% 0.22 140 / 50%)" } },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      attributionPosition="bottom-right"
    >
      <Background color="var(--border)" gap={24} size={1} />
    </ReactFlow>
  );
}

/* ---- Social Platform architecture ---- */
function SocialPlatformFlow() {
  const initialNodes: Node[] = [
    { id: "api", type: "agent", position: { x: 0, y: 100 }, data: { label: "API Gateway", color: "oklch(75% 0.2 200)", bg: "oklch(75% 0.2 200 / 8%)" } },
    { id: "user-svc", type: "agent", position: { x: 220, y: 0 }, data: { label: "User Service", sublabel: "Spring Boot", color: "oklch(55% 0.2 265)", bg: "oklch(55% 0.2 265 / 8%)" } },
    { id: "post-svc", type: "agent", position: { x: 220, y: 100 }, data: { label: "Post Service", sublabel: "Spring Boot", color: "oklch(58% 0.22 295)", bg: "oklch(58% 0.22 295 / 8%)" } },
    { id: "graph-svc", type: "agent", position: { x: 220, y: 200 }, data: { label: "Graph Service", sublabel: "Neo4j", color: "oklch(60% 0.24 320)", bg: "oklch(60% 0.24 320 / 8%)" } },
    { id: "kafka", type: "agent", position: { x: 460, y: 100 }, data: { label: "Kafka", sublabel: "event bus", color: "oklch(80% 0.22 140)", bg: "oklch(80% 0.22 140 / 8%)", pulse: true } },
    { id: "obs", type: "agent", position: { x: 700, y: 100 }, data: { label: "Observability", sublabel: "Zipkin·ELK·Grafana", color: "oklch(75% 0.2 200)", bg: "oklch(75% 0.2 200 / 8%)" } },
  ];

  const initialEdges: Edge[] = [
    { id: "e1", source: "api", target: "user-svc", animated: true, style: { stroke: "oklch(75% 0.2 200 / 50%)" } },
    { id: "e2", source: "api", target: "post-svc", animated: true, style: { stroke: "oklch(75% 0.2 200 / 50%)" } },
    { id: "e3", source: "api", target: "graph-svc", animated: true, style: { stroke: "oklch(75% 0.2 200 / 50%)" } },
    { id: "e4", source: "user-svc", target: "kafka", animated: true, style: { stroke: "oklch(80% 0.22 140 / 50%)", strokeDasharray: "5 3" } },
    { id: "e5", source: "post-svc", target: "kafka", animated: true, style: { stroke: "oklch(80% 0.22 140 / 50%)", strokeDasharray: "5 3" } },
    { id: "e6", source: "graph-svc", target: "kafka", animated: true, style: { stroke: "oklch(80% 0.22 140 / 50%)", strokeDasharray: "5 3" } },
    { id: "e7", source: "kafka", target: "obs", animated: true, style: { stroke: "oklch(75% 0.2 200 / 50%)" } },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      attributionPosition="bottom-right"
    >
      <Background color="var(--border)" gap={24} size={1} />
    </ReactFlow>
  );
}

/* ---- Job Pipeline architecture ---- */
function JobPipelineFlow() {
  const initialNodes: Node[] = [
    { id: "scraper", type: "agent", position: { x: 0, y: 80 }, data: { label: "Playwright", sublabel: "scrape JDs", color: "oklch(75% 0.2 200)", bg: "oklch(75% 0.2 200 / 8%)" } },
    { id: "sqlite", type: "agent", position: { x: 200, y: 0 }, data: { label: "SQLite", sublabel: "deduplication", color: "oklch(55% 0.2 265)", bg: "oklch(55% 0.2 265 / 8%)" } },
    { id: "claude", type: "agent", position: { x: 200, y: 160 }, data: { label: "Claude API", sublabel: "tailor resume", color: "oklch(58% 0.22 295)", bg: "oklch(58% 0.22 295 / 8%)", pulse: true } },
    { id: "output", type: "agent", position: { x: 420, y: 80 }, data: { label: "Resume PDF", sublabel: "tailored output", color: "oklch(80% 0.22 140)", bg: "oklch(80% 0.22 140 / 8%)" } },
  ];

  const initialEdges: Edge[] = [
    { id: "e1", source: "scraper", target: "sqlite", animated: true, style: { stroke: "oklch(75% 0.2 200 / 50%)" } },
    { id: "e2", source: "scraper", target: "claude", animated: true, style: { stroke: "oklch(75% 0.2 200 / 50%)" } },
    { id: "e3", source: "sqlite", target: "output", animated: true, style: { stroke: "oklch(55% 0.2 265 / 50%)", strokeDasharray: "5 3" } },
    { id: "e4", source: "claude", target: "output", animated: true, style: { stroke: "oklch(58% 0.22 295 / 50%)" } },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      attributionPosition="bottom-right"
    >
      <Background color="var(--border)" gap={24} size={1} />
    </ReactFlow>
  );
}

const diagramMap: Record<string, React.FC> = {
  olla: OllaFlow,
  "code-reviewer": CodeReviewerFlow,
  "social-platform": SocialPlatformFlow,
  "job-pipeline": JobPipelineFlow,
};

export function ArchitectureDiagram({ type }: { type: string }) {
  const FlowComponent = diagramMap[type];
  if (!FlowComponent) return null;

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ height: 220, borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <FlowComponent />
    </div>
  );
}
