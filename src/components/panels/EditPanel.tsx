import NodeFormPanel from "../forms/NodeFormPanel";

const EditPanel = () => {
  return (
    <div
      style={{
        padding: 12,
        background: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: 6,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontWeight: 600,
          marginBottom: 10,
          fontSize: 14,
        }}
      >
        Edit Node
      </div>

      {/* Form */}
      <NodeFormPanel />
    </div>
  );
};

export default EditPanel;