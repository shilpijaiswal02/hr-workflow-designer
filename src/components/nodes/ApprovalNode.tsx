import { Handle, Position } from "reactflow";
import type { WorkflowNodeData } from "../../types/workflow";

const ApprovalNode = ({ data }: { data: WorkflowNodeData & { error?: string; selected?: boolean } }) => {
  return (
    <div
      style={{
        padding: 10,
        background: "#ffd54f",
        borderRadius: 6,
        textAlign: "center",
        minWidth: 100,
        border: data?.selected ? "2px solid blue" : "1px solid #ccc",
      }}
    >
      <strong>{data?.label || "Approval"}</strong>

      {data?.role && (
        <div style={{ fontSize: 12 }}>
           {data.role}
        </div>
      )}

      {data?.threshold && (
        <div style={{ fontSize: 12 }}>
          {data.threshold}
        </div>
      )}
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

export default ApprovalNode;