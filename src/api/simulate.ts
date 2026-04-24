import type { WorkflowGraph } from "../types/workflow";

interface SimulationStep {
  step: number;
  id?: string;
  action: string;
  label?: string;
  data?: any;
  status?: "APPROVED" | "REJECTED";
  message?: string;
}

interface SimulationResponse {
  success: boolean;
  steps: SimulationStep[];
  error?: string;
}

export const simulateWorkflow = async (
  workflow: WorkflowGraph
): Promise<SimulationResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { nodes, edges } = workflow;

      const start = nodes.find((n) => n.type === "start");

      if (!start) {
        resolve({
          success: false,
          steps: [],
          error: "Start node not found",
        });
        return;
      }

      const result: SimulationStep[] = [];
      let current = start;
      let step = 1;

      const visited = new Set<string>();
      const inputValue = 8; 

      while (current && !visited.has(current.id)) {
        visited.add(current.id);

        const log: SimulationStep = {
          step,
          id: current.id,
          action: current.type || "unknown",
          label: current.data?.label,
          data: current.data,
        };

        // APPROVAL LOGIC
        if (current.type === "approval") {
          const threshold = Number(current.data?.threshold || 0);

          if (inputValue > threshold) {
  log.status = "REJECTED";
  result.push(log);

  // add explicit termination step
  result.push({
    step: step + 1,
    action: "workflow terminated",
    message: "Workflow stopped due to rejection",
  });

  break;
} else {
  log.status = "APPROVED";
}
        }

        result.push(log);

        if (current.type === "end") break;

        const nextEdge = edges.find((e) => e.source === current.id);
        if (!nextEdge) break;

        const nextNode = nodes.find((n) => n.id === nextEdge.target);
        if (!nextNode) break;

        current = nextNode;
        step++;
      }

      resolve({
        success: true,
        steps: result,
      });
    }, 500);
  });
};