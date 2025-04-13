import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimelineData, SelectedNodeInfo, TimelineNode, TimelineEdge } from '../types';

interface TimelineState {
  data: TimelineData;
  selectedNode: SelectedNodeInfo;
  isDetailPanelOpen: boolean;
  isEditMode: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: TimelineState = {
  data: {
    nodes: [],
    edges: []
  },
  selectedNode: {
    id: null,
    type: null,
    data: null
  },
  isDetailPanelOpen: false,
  isEditMode: false,
  loading: false,
  error: null
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setTimelineData: (state, action: PayloadAction<TimelineData>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    selectNode: (state, action: PayloadAction<SelectedNodeInfo>) => {
      state.selectedNode = action.payload;
      state.isDetailPanelOpen = !!action.payload.id;
    },
    clearSelectedNode: (state) => {
      state.selectedNode = {
        id: null,
        type: null,
        data: null
      };
      state.isDetailPanelOpen = false;
      state.isEditMode = false;
    },
    toggleDetailPanel: (state) => {
      state.isDetailPanelOpen = !state.isDetailPanelOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addNode: (state, action: PayloadAction<TimelineNode>) => {
      state.data.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<{ id: string, data: any }>) => {
      const { id, data } = action.payload;
      const nodeIndex = state.data.nodes.findIndex(node => node.id === id);
      if (nodeIndex !== -1) {
        state.data.nodes[nodeIndex] = {
          ...state.data.nodes[nodeIndex],
          data: {
            ...state.data.nodes[nodeIndex].data,
            ...data
          }
        };
      }
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      state.data.edges = state.data.edges.filter(
        edge => edge.source !== nodeId && edge.target !== nodeId
      );
      state.data.nodes = state.data.nodes.filter(node => node.id !== nodeId);
      
      if (state.selectedNode.id === nodeId) {
        state.selectedNode = { id: null, type: null, data: null };
        state.isDetailPanelOpen = false;
        state.isEditMode = false;
      }
    },
    addEdge: (state, action: PayloadAction<TimelineEdge>) => {
      state.data.edges.push(action.payload);
    },
    deleteEdge: (state, action: PayloadAction<string>) => {
      state.data.edges = state.data.edges.filter(edge => edge.id !== action.payload);
    },
    toggleEditMode: (state) => {
      state.isEditMode = !state.isEditMode;
    }
  }
});

export const { 
  setTimelineData, 
  selectNode, 
  clearSelectedNode, 
  toggleDetailPanel,
  setLoading,
  setError,
  addNode,
  updateNode,
  deleteNode,
  addEdge,
  deleteEdge,
  toggleEditMode
} = timelineSlice.actions;

export default timelineSlice.reducer; 