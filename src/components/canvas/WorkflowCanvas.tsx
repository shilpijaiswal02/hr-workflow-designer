import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  type Connection,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../../store/useWorkflowStore";
import StartNode from "../nodes/StartNode";
import TaskNode from "../nodes/TaskNode";
import ApprovalNode from "../nodes/ApprovalNode";
import AutomatedNode from "../nodes/AutomatedNode";
import EndNode from "../nodes/EndNode";


const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const WorkflowCanvas = () => {
  const { selectedNodeId, setSelectedNodeId } = useWorkflowStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { project } = useReactFlow(); 

  //  connect
  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  // selection
  const onSelectionChange = ({ nodes }: { nodes: Node[] }) => {
    const newId = nodes.length ? nodes[0].id : null;
    if (newId !== selectedNodeId) {
      setSelectedNodeId(newId);
    }
  };

  //  drag-drop
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("type");
    if (!type) return;

    const bounds = (event.target as HTMLElement).getBoundingClientRect();

    const position = project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const newNode: Node = {
      id: Date.now().toString(),
      type,
      position,
      data: {
        label: type.toUpperCase(),
        role: "",
        action: "",
        message: "",
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes.map((n) => ({
          ...n,
          style: {
            ...n.style, 
            border: n.selected ? "2px solid black" : "1px solid #ccc",
          },
        }))}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onSelectionChange={onSelectionChange}
        deleteKeyCode={["Backspace", "Delete"]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      
      >
        <Background />
        <Controls />
      <MiniMap   style={{ height: 120, width: 180 }} 
           nodeColor={(node) => {
           switch (node.type) {
           case "start": return "#22c55e";
           case "task": return "#3b82f6";
           case "approval": return "#f59e0b";
           case "end": return "#ef4444";
           default: return "#999";
         }
       }}
       nodeStrokeWidth={3}
       zoomable
       pannable
      />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;