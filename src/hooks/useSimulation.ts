import { simulateWorkflow } from "../api/simulate";
import { serializeWorkflow } from "../utils/workflowSerializer";
import type { WorkflowNode, WorkflowEdge } from "../types/workflow";

export const useSimulation = () => {
  const runSimulation = async (
    nodes: WorkflowNode[],
    edges: WorkflowEdge[]
  ) => {
    const workflow = serializeWorkflow(nodes, edges);
    const response = await simulateWorkflow(workflow);

    if (!response.success) {
      throw new Error(response.error || "Simulation failed");
    }

    return response.steps;
  };

  return { runSimulation };
};