import { Handle, Position } from "reactflow";
import type { WorkflowNodeData } from "../../types/workflow";

const AutomatedNode = ({ data }: { data: WorkflowNodeData & { error?: string; selected?: boolean } }) => {
  return (
    <div
      style={{
        padding: 10,
        background: "#ce93d8",
        borderRadius: 6,
        textAlign: "center",
        minWidth: 120,
        border: data?.selected ? "2px solid blue" : "1px solid #ccc",
      }}
    >
      <div style={{ fontWeight: "bold" }}>
        {data?.label || "Automated"}
      </div>

      {data?.action && (
        <div style={{ fontSize: 12 }}>
           {data.action}
        </div>
      )}

      {data?.params &&
        Object.entries(data.params).map(([key, value]) => (
          <div key={key} style={{ fontSize: 11 }}>
            {key}: {value || "-"}
          </div>
        ))}

      {data?.error && (
        <div style={{ color: "red", fontSize: 10 }}>
           {data.error}
        </div>
      )}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default AutomatedNode;