const nodeStyles: Record<string, string> = {
  start: "#81c784",
  task: "#90caf9",
  approval: "#ffd54f",
  automated: "#ce93d8",
  end: "#ef9a9a",
};

const NodePalette = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    event.dataTransfer.setData("type", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ padding: 10 }}>
      {["start", "task", "approval", "automated", "end"].map((t) => (
        <div
          key={t}
          draggable
          onDragStart={(e) => onDragStart(e, t)}
          style={{
            padding: "10px 8px",
            borderRadius: 6,
            marginBottom: 10,
            cursor: "grab",
            background: nodeStyles[t],
            color: "#333",
            textAlign: "center",
            fontWeight: 500,
            border: "1px solid #ddd",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          {t.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default NodePalette;