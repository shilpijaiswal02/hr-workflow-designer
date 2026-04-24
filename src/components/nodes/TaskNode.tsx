import { Handle, Position } from "reactflow";
import type { WorkflowNodeData } from "../../types/workflow";

const TaskNode = ({ data }: { data: WorkflowNodeData & { error?: string; selected?: boolean; assignee?: string; dueDate?: string } }) => {
  return (
    <div
      style={{
        padding: 10,
        background: "#90caf9",
        borderRadius: 6,
        textAlign: "center",
        minWidth: 100,
        border: data?.selected ? "2px solid blue" : "1px solid #ccc",
      }}
    >
      <div style={{ fontWeight: "bold" }}>
        {data?.label || "Task"}
      </div>

      {data?.assignee && (
        <div style={{ fontSize: 12 }}>
           {data.assignee}
        </div>
      )}

      {data?.dueDate && (
        <div style={{ fontSize: 12 }}>
           {data.dueDate}
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

export default TaskNode;