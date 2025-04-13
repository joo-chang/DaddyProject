import { Node, Edge } from 'reactflow';

// 노드 타입 정의
export enum NodeType {
  CENTURY = 'centuryNode',
  YEAR = 'yearNode',
  PERSON = 'personNode',
  EVENT = 'eventNode',
  IDEA = 'ideaNode',
}

// 각 노드 타입별 데이터 인터페이스
export interface CenturyNodeData {
  label: string;
  century: number; // BC의 경우 음수값 (예: BC 1세기 = -1)
}

export interface YearNodeData {
  label: string;
  year: number; // BC의 경우 음수값 (예: BC 44년 = -44)
  century: number;
}

export interface HistoricalEntryData {
  label: string;
  year: number;
  details: string;
  imageUrl?: string;
}

// 커스텀 노드 타입 (React Flow 노드 확장)
export type TimelineNode = Node<CenturyNodeData | YearNodeData | HistoricalEntryData>;
export type TimelineEdge = Edge;

// 전체 타임라인 데이터 구조
export interface TimelineData {
  nodes: TimelineNode[];
  edges: TimelineEdge[];
}

// 선택된 노드 정보를 위한 인터페이스
export interface SelectedNodeInfo {
  id: string | null;
  type: NodeType | null;
  data: CenturyNodeData | YearNodeData | HistoricalEntryData | null;
} 