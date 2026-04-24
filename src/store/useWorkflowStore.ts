import { create } from "zustand";

interface WorkflowState {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  clearSelection: () => void; 
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  selectedNodeId: null,

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  clearSelection: () => set({ selectedNodeId: null }), 
}));