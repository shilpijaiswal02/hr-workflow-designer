import { addEdge, type Connection, type Node } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

export const useCanvasHandlers = (
  setRfNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setRfEdges: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { setSelectedNodeId } = useWorkflowStore();

  // CONNECT
  const onConnect = (params: Connection) => {
    setRfEdges((eds) => addEdge(params, eds));
  };

  //  SELECT NODE
  const onNodeClick = (_: unknown, node: Node) => {
    setSelectedNodeId(node.id);
  };

//  DRAG-DROP
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("type");
    if (!type) return;

    const newNode: Node = {
      id: Date.now().toString(),
      type,
      position: {
        x: event.clientX % 500, 
        y: event.clientY % 500,
      },
      data: {
        label: type.toUpperCase(),
        role: "",
        action: "",
        message: "",
      },
    };

    setRfNodes((nds) => [...nds, newNode]);
  };

//  DRAG-OVER
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return { onConnect, onNodeClick, onDrop, onDragOver };
};