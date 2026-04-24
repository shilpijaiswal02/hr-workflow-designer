import { useWorkflowStore } from "../../store/useWorkflowStore";
import { useReactFlow } from "reactflow";

import StartNodeForm from "./StartNodeForm";
import TaskNodeForm from "./TaskNodeForm";
import ApprovalNodeForm from "./ApprovalNodeForm";
import AutomatedNodeForm from "./AutomatedNodeForm";
import EndNodeForm from "./EndNodeForm";

const NodeFormPanel = () => {
  const { selectedNodeId } = useWorkflowStore();
  const { getNodes } = useReactFlow();

  if (!selectedNodeId) {
    return <div style={{ padding: 10 }}>Select a node</div>;
  }

  const currentNode = getNodes().find(
    (n) => n.id === selectedNodeId
  );

  if (!currentNode) return null;

  switch (currentNode.type) {
    case "start":
      return <StartNodeForm />;
    case "task":
      return <TaskNodeForm />;
    case "approval":
      return <ApprovalNodeForm />;
    case "automated":
      return <AutomatedNodeForm />;
    case "end":
      return <EndNodeForm />;
    default:
      return null;
  }
};

export default NodeFormPanel;