# HR Workflow Designer

A visual workflow builder for creating, configuring, validating, and simulating simple HR processes such as onboarding and approval flows.

The goal of this project is to demonstrate React Flow usage, modular frontend architecture, dynamic forms, and basic workflow simulation within a limited time scope.

---

## Features

### Workflow Builder
- Drag and drop nodes onto a canvas
- Connect nodes using edges
- Move and arrange nodes freely
- Delete nodes and edges
- MiniMap for quick navigation
- Zoom and pan controls with React Flow

### Supported Node Types
- **Start Node**: Entry point of the workflow
- **Task Node**: Represents a manual task
- **Approval Node**: Checks a threshold value and decides whether to continue or stop the workflow
- **Automated Node**: Performs predefined actions
- **End Node**: Marks workflow completion

### Node Configuration Panel
- Selecting a node opens an editable form panel
- Each node type has its own configuration

**Start Node**
- Title
- Optional metadata

**Task Node**
- Title (required)
- Description
- Assignee
- Due date
- Optional custom fields

**Approval Node**
- Title
- Approver role
- Threshold value

**Automated Node**
- Title
- Action selection from the mock API
- Basic parameter configuration for the selected action

**End Node**
- End message

### Validation
- Ensures a Start node exists
- Ensures an End node exists
- Checks whether nodes are connected
- Detects simple cycles based on traversal from the Start node
- Displays basic validation feedback

### Workflow Simulation
- Runs the workflow from the Start node
- Traverses nodes using connections
- Supports linear traversal by following the first outgoing edge
- Executes step by step
- Highlights the active node during execution
- Handles approval logic:
  - Pass: continue execution
  - Fail: terminate the workflow
- Stops execution at the End node or on rejection
- Displays execution steps and logs

### Mock API Layer
- Implemented as local functions to simulate backend APIs

**GET /automations**
- Returns available actions:
  - `send_email`
  - `generate_document`

**POST /simulate**
- Accepts workflow graph JSON
- Returns a step-by-step execution result

### Import / Export
- Export the workflow as JSON
- Import the workflow from JSON
- Perform basic validation before loading

---

## Architecture

```bash
src/
├── components/   # Canvas, nodes, forms, panels
├── hooks/        # UI orchestration logic
├── api/          # Mock API (simulate, automations)
├── utils/        # Validation and serialization
├── store/        # Zustand state (nodes, edges, selection)
└── types/        # TypeScript types
```

## Key Design Choices
- React Flow for graph-based UI and edge management
- Zustand for simple global state management
- Custom hooks to separate logic from UI
- Component-based structure for scalability
- Controlled forms for node configuration
- API abstraction to simulate backend behavior
- Separation of UI, business logic, and simulation logic

---

## Workflow Execution Flow
1. The user creates a workflow using drag and drop.
2. Nodes are connected using edges.
3. Node details are configured through the form panel.
4. The workflow is validated.
5. The graph is serialized into JSON.
6. The JSON is sent to the simulation API.
7. Execution runs step by step.
8. The UI updates with active-node highlighting and logs.

---

## Tech Stack
- React with Vite
- TypeScript
- React Flow
- Zustand

---

## How to Run

```bash
npm install
npm run dev
```

---

## Limitations
- No backend persistence; data is stored in memory
- UI is functional but not fully polished
- Validation is limited to basic checks
- Simulation logic is simplified
- No undo/redo or auto-layout
- Workflow execution assumes a single path and does not support branching
- No support for parallel execution
