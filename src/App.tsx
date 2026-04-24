import WorkflowCanvas from "./components/canvas/WorkflowCanvas";
import NodePalette from "./components/canvas/NodePalette";
import EditPanel from "./components/panels/EditPanel";
import SandboxPanel from "./components/sandbox/SandboxPanel";

function App() {
  return (
    <>
      {/* Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 50,
          background: "#1976d2",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          zIndex: 10,
          fontWeight: 600,
          fontSize: 16,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
        }}
      >
        HR Workflow Designer
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          height: "100vh",
          marginTop: 50,
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 200,
            borderRight: "1px solid #e0e0e0",
            padding: 12,
            background: "#fafafa",
          }}
        >
          <h4 style={{ marginBottom: 10 }}>Nodes</h4>
          <NodePalette />
        </div>

        {/* Canvas */}
        <div
          style={{
            flex: 1,
            background: "#f5f5f5",
          }}
        >
          <WorkflowCanvas />
        </div>

        {/* Right Panel */}
        <div
          style={{
            width: 300,
            borderLeft: "1px solid #e0e0e0",
            padding: 12,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16, 
            background: "#fafafa",
          }}
        >
          <EditPanel />
          <SandboxPanel />
        </div>
      </div>
    </>
  );
}

export default App;