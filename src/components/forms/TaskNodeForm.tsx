import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useReactFlow } from "reactflow";

const TaskNodeForm = () => {
  const { selectedNodeId } = useWorkflowStore();
  const { setNodes } = useReactFlow();

  if (!selectedNodeId) return null;

  const update = (field: string, value: string) => {
    setNodes((nds: any) =>
      nds.map((n: any) =>
        n.id === selectedNodeId
          ? {
              ...n,
              data: {
                ...n.data,
                [field]: value,
               
                label: field === "label" ? value : n.data.label,
              },
            }
          : n
      )
    );
  };

  return (
    <div>
      <h3>Task Node</h3>

      {/* LABEL (TITLE) */}
      <input
        placeholder="Label"
        onChange={(e) => update("label", e.target.value)}
      />

      {/* ASSIGNEE */}
      <input
        placeholder="Assignee"
        onChange={(e) => update("assignee", e.target.value)}
      />

      {/*  NEW: DESCRIPTION */}
      <textarea
        placeholder="Description"
        onChange={(e) => update("description", e.target.value)}
      />

      {/* NEW: DUE DATE */}
      <input
        type="date"
        onChange={(e) => update("dueDate", e.target.value)}
      />
    </div>
  );
};

export default TaskNodeForm;