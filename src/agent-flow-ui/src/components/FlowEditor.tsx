import React, { useCallback, useRef, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  ReactFlowProvider,
  BackgroundVariant,
  Panel,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AgentNode from '../nodes/AgentNode';

const nodeTypes = {
  agent: AgentNode,
};

const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'agent', 
    position: { x: 250, y: 100 }, 
    data: { label: 'Web Scraper', description: 'Source: wikipedia.org' } 
  },
  { 
    id: '2', 
    type: 'agent', 
    position: { x: 550, y: 100 }, 
    data: { label: 'LLM Processor', description: 'Model: GPT-4' } 
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6' } }
];

let id = 3;
const getId = () => `${id++}`;

export const FlowEditor = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#3b82f6' } }, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/reactflow/label');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls className="!bg-white !shadow-lg !border-slate-200" />
        <MiniMap 
          className="!bg-slate-50 !border-slate-200" 
          nodeColor={() => '#e2e8f0'}
          maskColor="rgba(240, 242, 245, 0.7)"
        />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="top-right" className="bg-white p-2 rounded-lg shadow-md border border-slate-200 text-xs text-slate-500">
          Agent Workflow Canvas
        </Panel>
      </ReactFlow>
    </div>
  );
};

export const FlowEditorWrapper = () => (
  <ReactFlowProvider>
    <FlowEditor />
  </ReactFlowProvider>
);
