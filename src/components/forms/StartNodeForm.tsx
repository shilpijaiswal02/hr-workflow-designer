// src/components/forms/StartNodeForm.tsx
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useReactFlow } from "reactflow";

const StartNodeForm = () => {
  const { selectedNodeId } = useWorkflowStore();
  const { setNodes } = useReactFlow();

  if (!selectedNodeId) return null;

  const update = (value: string) => {
    setNodes((nds: any) =>
      nds.map((n: any) =>
        n.id === selectedNodeId
          ? {
              ...n,
              data: {
                ...n.data,
                label: value || "Start",
              },
            }
          : n
      )
    );
  };

  return (
    <div>
      <h3>Start Node</h3>

      <input
        placeholder="Enter start label"
        onChange={(e) => update(e.target.value)}
      />
    </div>
  );
};

export default StartNodeForm;