import { useState } from "react";
import { useReactFlow } from "reactflow";
import { validateWorkflow } from "../../utils/graphValidation";
import { useSimulation } from "../../hooks/useSimulation";
import type { WorkflowNode } from "../../types/workflow";

interface SimulationStep {
  step: number;
  id?: string;
  action: string;
  status?: string;
  data?: any;
}

const SandboxPanel = () => {
  const { runSimulation } = useSimulation();
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();

  const [logs, setLogs] = useState<SimulationStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

 
  const run = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const error = validateWorkflow(nodes, edges);

    if (error) {
      setErrorMsg(error.message);

      setNodes((nds: WorkflowNode[]) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            error:
              error.nodeId && n.id === error.nodeId
                ? error.message
                : undefined,
          },
          style: {
            ...n.style,
            border:
              error.nodeId && n.id === error.nodeId
                ? "2px solid red"
                : "1px solid #ccc",
          },
        }))
      );
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setLogs([]);

    setNodes((nds: WorkflowNode[]) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, error: undefined },
      }))
    );

    try {
      const result = await runSimulation(nodes, edges);

      for (let step of result) {
        setNodes((nds: WorkflowNode[]) =>
          nds.map((n) => ({
            ...n,
            style:
              n.id === step.id
                ? {
                    ...n.style,
                    border: "3px solid blue",
                    boxShadow: "0 0 10px blue",
                  }
                : {
                    ...n.style,
                    border: "1px solid #ccc",
                    boxShadow: "none",
                  },
          }))
        );

        await new Promise((res) => setTimeout(res, 600));
      }

      setLogs(result);

const lastValidStep = [...result].reverse().find((s) => s.id);

if (!lastValidStep) return;

setNodes((nds: WorkflowNode[]) =>
  nds.map((n: WorkflowNode) => {
    if (n.id === lastValidStep.id) {
      return {
        ...n,
        style: {
          ...n.style,
          border:
            lastValidStep.status === "REJECTED"
              ? "3px solid red"
              : "3px solid green",
          boxShadow:
            lastValidStep.status === "REJECTED"
              ? "0 0 10px red"
              : "0 0 10px green",
        },
      };
    }

    return {
      ...n,
      style: {
        ...n.style,
        border: "1px solid #ccc",
        boxShadow: "none",
      },
    };
  })
);
    } catch (e: any) {
      setErrorMsg(e.message || "Simulation failed");
    } finally {
      setLoading(false);
    }
  };


  const handleSave = () => {
    const data = { nodes: getNodes(), edges: getEdges() };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
  };


  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
        } else {
          setErrorMsg("Invalid file");
        }
      } catch {
        setErrorMsg("Failed to load file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ padding: 12 }}>
      
      
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={run}
          style={{ padding: 8, borderRadius: 4, width: "100%" }}
        >
          {loading ? "Running..." : "Run Workflow"}
        </button>

        <button
          onClick={handleSave}
          style={{ padding: 8, borderRadius: 4, width: "100%" }}
        >
          Save Workflow
        </button>

        <input type="file" onChange={handleLoad} />
      </div>

      {/* ERROR */}
      {errorMsg && (
        <div style={{ color: "red", marginTop: 10 }}>
           {errorMsg}
        </div>
      )}

      {/* LOGS */}
      <div style={{ marginTop: 15 }}>
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              padding: "6px 8px",
              marginBottom: 6,
              background: "#f5f5f5",
              borderRadius: 4,
              fontSize: 13,
            }}
          >
            <strong>Step {log.step}:</strong> {log.action}
            {log.status && ` (${log.status})`}
            {log.data?.action && ` | ${log.data.action}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SandboxPanel;