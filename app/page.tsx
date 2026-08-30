'use client';
import React, { useState, useEffect } from 'react';
import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Sparkles, Terminal } from 'lucide-react';

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: 'Start Learning' },
    style: { background: '#18181b', color: '#fff', borderRadius: '8px', padding: '10px' }
  }
];

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [logs, setLogs] = useState<string[]>(['WebMCP Initialized. Waiting for AI agent calls...']);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).document?.modelContext) {
      const mc = (window as any).document.modelContext;

      // WebMCP Tool 1: build_skill_tree
      mc.registerTool({
        name: 'build_skill_tree',
        description: 'Builds an interactive skill tree canvas for a target career path.',
        inputSchema: {
          type: 'object',
          properties: {
            role: { type: 'string' },
            skills: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  label: { type: 'string' },
                  category: { type: 'string' }
                }
              }
            }
          },
          required: ['role', 'skills']
        },
        execute: async ({ role, skills }: any) => {
          setLogs((prev) => [...prev, `[WebMCP Call]: build_skill_tree for ${role}`]);
          
          const newNodes: Node[] = skills.map((s: any, i: number) => ({
            id: s.id,
            position: { x: (i % 3) * 220 + 50, y: Math.floor(i / 3) * 120 + 50 },
            data: { label: s.label },
            style: {
              background: '#27272a',
              color: '#fff',
              border: '1px solid #3f3f46',
              borderRadius: '10px',
              padding: '12px'
            }
          }));

          const newEdges: Edge[] = skills.slice(1).map((s: any, i: number) => ({
            id: `e-${i}`,
            source: skills[i].id,
            target: s.id,
            animated: true
          }));

          setNodes(newNodes);
          setEdges(newEdges);
          return { success: true, count: skills.length };
        }
      });

      // WebMCP Tool 2: highlight_skill_gaps
      mc.registerTool({
        name: 'highlight_skill_gaps',
        description: 'Highlights missing skills or prerequisites on the canvas in red.',
        inputSchema: {
          type: 'object',
          properties: {
            missingNodeIds: { type: 'array', items: { type: 'string' } }
          },
          required: ['missingNodeIds']
        },
        execute: async ({ missingNodeIds }: any) => {
          setLogs((prev) => [...prev, `[WebMCP Call]: highlight_skill_gaps`]);
          setNodes((prevNodes) =>
            prevNodes.map((node) => ({
              ...node,
              style: missingNodeIds.includes(node.id)
                ? { ...node.style, border: '2px solid #ef4444', backgroundColor: '#451a1a' }
                : node.style
            }))
          );
          return { highlighted: missingNodeIds.length };
        }
      });
    }
  }, []);

  return (
    <main className="flex h-screen w-screen bg-zinc-950 text-white font-sans overflow-hidden">
      {/* Canvas */}
      <div className="w-3/4 h-full relative border-r border-zinc-800">
        <header className="absolute top-4 left-4 z-10 bg-zinc-900/80 backdrop-blur border border-zinc-800 px-4 py-2 rounded-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h1 className="font-semibold text-sm">Career Roadmap Canvas (WebMCP)</h1>
        </header>

        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#3f3f46" gap={16} />
          <Controls />
        </ReactFlow>
      </div>

      {/* Inspector Panel */}
      <div className="w-1/4 h-full bg-zinc-900 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-zinc-400 border-b border-zinc-800 pb-3">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase tracking-wider">WebMCP Inspector</span>
        </div>

        <div className="flex-1 bg-zinc-950 rounded-lg p-3 border border-zinc-800 font-mono text-xs overflow-y-auto space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="text-emerald-400">
              {log}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}