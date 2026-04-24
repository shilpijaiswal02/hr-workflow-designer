import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useReactFlow } from "reactflow";

const EndNodeForm = () => {
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
                message: value,
                label: value || "End",
              },
            }
          : n
      )
    );
  };

  return (
    <div>
      <h3>End Node</h3>

      <input
        placeholder="Enter message"
        onChange={(e) => update(e.target.value)}
      />
    </div>
  );
};

export default EndNodeForm;