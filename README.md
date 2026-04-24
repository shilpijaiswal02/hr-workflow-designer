#  HR Workflow Designer

A visual workflow builder that allows users to create, configure, validate, and simulate simple HR processes such as onboarding and approval flows.

The goal of this project is to demonstrate React Flow usage, modular frontend architecture, dynamic forms, and basic workflow simulation within a limited time scope.



##  Features

### Workflow Builder
 Drag and drop nodes onto a canvas
 Connect nodes using edges
 Move and arrange nodes freely
 Delete nodes and edges
 MiniMap for quick navigation of the workflow
 Zoom and pan controls (React Flow Controls)



### Supported Node Types
Start Node – entry point of the workflow  
 Task Node – represents a manual task  
 Approval Node – checks a threshold value and decides whether to continue or stop the workflow
 Automated Node – performs predefined actions  
 End Node – marks workflow completion  



### Node Configuration (Form Panel)
 Selecting a node opens an editable form panel
 Each node type has its own configuration:

**Start Node**
 Title
 Optional metadata

**Task Node**
 Title (required)
 Description
 Assignee
 Due date
 Optional custom fields

**Approval Node**
 Title
 Approver role
 Threshold value

**Automated Node**
 Title
 Action selection (from API)
 Dynamic parameters based on selected action

**End Node**
 End message


### Validation
 Ensures Start node exists
 Ensures End node exists
 Checks if nodes are connected
 Detects simple cycles (based on traversal from the start node)
 Displays basic validation feedback



### Workflow Simulation (Sandbox)
 Runs workflow from Start node
 Traverses nodes using connections
 Currently supports linear traversal (first outgoing edge is followed)
 Executes step-by-step
 Highlights active node during execution
 Handles Approval logic:
   Pass → continue
   Fail → terminate workflow
 Stops execution at End node or rejection
 Displays execution steps/logs



### Mock API Layer
 Implemented as local functions to simulate backend APIs

**GET /automations**
 Returns available actions:
   send_email
   generate_document

**POST /simulate**
 Accepts workflow graph JSON
 Returns step-by-step execution result



### Import / Export
 Export workflow as JSON
 Import workflow from JSON
 Basic validation before loading



##  Architecture


src/
├── components/   # Canvas, nodes, forms, panels
├── hooks/        # UI orchestration logic
├── api/          # Mock API (simulate, automations)
├── utils/        # Validation and serialization
├── store/        # Zustand state (nodes, edges, selection)
├── types/        # TypeScript types



# Key Design Choices:

React Flow for graph-based UI and edge management
Zustand for simple global state management
Custom hooks to separate logic from UI
Component-based structure for scalability
Controlled forms for node configuration
API abstraction to simulate backend behavior
Separation of UI, business logic, and simulation layer for maintainability
 
 # Workflow Execution Flow
User creates workflow using drag-and-drop
Nodes are connected using edges
Node details are configured via form panel
Workflow is validated
Graph is serialized into JSON
Sent to simulation API
Execution runs step-by-step
UI updates with node highlights and logs


# Tech Stack:
React (Vite)
TypeScript
React Flow
Zustand

# How to Run
npm install
npm run dev
# Limitations
No backend persistence (data stored in memory)
UI is basic and not fully polished
Validation is limited to basic checks
Simulation logic is simplified
No undo/redo or auto-layout
Workflow execution assumes a single path (no branching support)
No support for parallel or branching execution paths

