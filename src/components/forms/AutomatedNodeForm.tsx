import { useEffect, useState } from "react";
import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useReactFlow } from "reactflow";
import { getAutomations } from "../../api/automations";
import type { WorkflowNode } from "../../types/workflow";

interface AutomationOption {
  id: string;
  label: string;
  params: string[];
}

const AutomatedNodeForm = () => {
  const { selectedNodeId } = useWorkflowStore();
  const { setNodes, getNodes } = useReactFlow();

  const [options, setOptions] = useState<AutomationOption[]>([]);
  const [selectedAction, setSelectedAction] =
    useState<AutomationOption | null>(null);
  const [params, setParams] = useState<Record<string, string>>({});

 
  useEffect(() => {
    getAutomations().then(setOptions);
  }, []);

  if (!selectedNodeId) return null;

  const currentNode = getNodes().find(
    (n) => n.id === selectedNodeId
  ) as WorkflowNode | undefined;


  useEffect(() => {
    if (!currentNode) return;

    const action = options.find(
      (opt) => opt.label === currentNode.data?.action
    );

    setSelectedAction(action || null);
    setParams(currentNode.data?.params || {});
  }, [selectedNodeId, options]);

  // update node
  const updateNode = (newData: Partial<WorkflowNode["data"]>) => {
    setNodes((nds: WorkflowNode[]) =>
      nds.map((n) =>
        n.id === selectedNodeId
          ? {
              ...n,
              data: {
                ...n.data,
                ...newData,
              },
            }
          : n
      )
    );
  };

  // handle action change
  const handleActionChange = (id: string) => {
    const action = options.find((opt) => opt.id === id);
    if (!action) return;

    setSelectedAction(action);

    const newParams: Record<string, string> = {};
    action.params.forEach((p) => (newParams[p] = ""));

    setParams(newParams);
    updateNode({
      action: action.label,
      params: newParams,
    });
  };

  return (
    <div>
      <h3>Automated Node</h3>

      {/* Dropdown */}
      <select
        value={selectedAction?.id || ""}
        onChange={(e) => handleActionChange(e.target.value)}
      >
        <option value="">Select Action</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Dynamic params */}
      {selectedAction &&
        selectedAction.params.map((param) => (
          <input
            key={param}
            placeholder={param}
            value={params[param] || ""}
            onChange={(e) => {
              const updated = {
                ...params,
                [param]: e.target.value,
              };

              setParams(updated);
              updateNode({ params: updated });
            }}
          />
        ))}
    </div>
  );
};

export default AutomatedNodeForm;