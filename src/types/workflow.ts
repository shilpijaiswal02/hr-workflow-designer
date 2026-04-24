import type { Node, Edge } from "reactflow";

export type WorkflowNodeType =
  | "start"
  | "task"
  | "approval"
  | "automated"
  | "end";

export interface WorkflowNodeData {
  label: string;
  role?: string;
  action?: string;
  threshold?: number;
  params?: Record<string, string>;
}

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}