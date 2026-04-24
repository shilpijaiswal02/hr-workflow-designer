import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useReactFlow } from "reactflow";
import { useEffect, useState } from "react";

const ApprovalNodeForm = () => {
  const { selectedNodeId } = useWorkflowStore();
  const { setNodes, getNodes } = useReactFlow();

  const [role, setRole] = useState("");
  const [threshold, setThreshold] = useState("");

  if (!selectedNodeId) return null;

  const currentNode = getNodes().find(
    (n: any) => n.id === selectedNodeId
  );

  
  useEffect(() => {
    if (!currentNode) return;

    setRole(currentNode.data?.role || "");
    setThreshold(currentNode.data?.threshold || "");
  }, [selectedNodeId]);

  const updateNode = (newData: any) => {
    setNodes((nds: any) =>
      nds.map((n: any) =>
        n.id === selectedNodeId
          ? {
              ...n,
              data: {
                ...n.data,
                ...newData,
                label: newData.role
                  ? newData.role
                  : n.data.label,
              },
            }
          : n
      )
    );
  };

  return (
    <div>
      <h3>Approval Node</h3>

      {/* ROLE */}
      <input
        placeholder="Enter role"
        value={role}
        onChange={(e) => {
          const val = e.target.value;
          setRole(val);             
          updateNode({ role: val }); 
        }}
      />

      {/* THRESHOLD */}
      <input
        type="number"
        placeholder="Threshold"
        value={threshold}
        onChange={(e) => {
          const val = e.target.value;
          setThreshold(val);                         
          updateNode({ threshold: Number(val) });   
        }}
      />
    </div>
  );
};

export default ApprovalNodeForm;