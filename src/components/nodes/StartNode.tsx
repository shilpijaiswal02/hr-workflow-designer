import { Handle, Position } from "reactflow";
import type { WorkflowNodeData } from "../../types/workflow";

const StartNode = ({ data }: { data: WorkflowNodeData & { error?: string; selected?: boolean } }) => {
  return (
    <div
      style={{
        padding: 10,
        background: "#81c784",
        borderRadius: 6,
        textAlign: "center",
        border: data?.selected ? "2px solid blue" : "1px solid #ccc",
      }}
    >
      <div>{data?.label || "Start"}</div>

      {data?.error && (
        <div style={{ color: "red", fontSize: 10 }}>
          {data.error}
        </div>
      )}

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default StartNode;