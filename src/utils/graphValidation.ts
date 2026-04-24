import type { WorkflowNode, WorkflowEdge } from "../types/workflow";

export const validateWorkflow = (
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
) => {
  if (!nodes.length) {
    return { message: "No nodes added", nodeId: null };
  }

  const startNode = nodes.find((n) => n.type === "start");
  const endNode = nodes.find((n) => n.type === "end");

  if (!startNode) {
    return { message: "Start node missing", nodeId: null };
  }

  if (!endNode) {
    return { message: "End node missing", nodeId: null };
  }

  if (!edges.length) {
    return { message: "Nodes are not connected", nodeId: null };
  }

  
  const hasIncoming = (nodeId: string) =>
    edges.some((e) => e.target === nodeId);

  for (const node of nodes) {
    if (node.type !== "start" && !hasIncoming(node.id)) {
      return {
        message: `Node "${node.type}" is not connected`,
        nodeId: node.id,
      };
    }
  }

  //  cycle detection
  const dfs = (nodeId: string, path: Set<string>): boolean => {
    if (path.has(nodeId)) return true;

    path.add(nodeId);

    const next = edges.filter((e) => e.source === nodeId);

    for (let e of next) {
      if (dfs(e.target, new Set(path))) return true;
    }

    return false;
  };

  if (dfs(startNode.id, new Set<string>())) {
    return {
      message: "Cycle detected in workflow",
      nodeId: startNode.id,
    };
  }

  return null;
};