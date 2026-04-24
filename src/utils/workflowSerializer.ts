import type { Node, Edge } from "reactflow";
import type { WorkflowGraph } from "../types/workflow";

export const serializeWorkflow = (
  nodes: Node[],
  edges: Edge[]
): WorkflowGraph => {
  return {
    nodes,
    edges,
  };
};