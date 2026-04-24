import { Handle, Position } from "reactflow";
import type { WorkflowNodeData } from "../../types/workflow";

const EndNode = ({ data }: { data: WorkflowNodeData & { error?: string; selected?: boolean } }) => {
  return (
    <div
      style={{
        padding: 10,
        background: "#ef9a9a",
        borderRadius: 6,
        textAlign: "center",
        border: data?.selected ? "2px solid blue" : "1px solid #ccc",
      }}
    >
      <div>{data?.label || "End"}</div>

      {data?.error && (
        <div style={{ color: "red", fontSize: 10 }}>
          {data.error}
        </div>
      )}

      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default EndNode;