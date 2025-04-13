import { useCallback } from 'react';
import dagre from 'dagre';
import { Node, Edge } from 'reactflow';

// 자동 레이아웃을 위한 커스텀 훅
export const useAutoLayout = () => {
  // 노드와 엣지를 받아 자동 레이아웃을 적용하는 함수
  const getLayoutedElements = useCallback(
    (nodes: Node[], edges: Edge[], direction = 'LR', nodeWidth = 150, nodeHeight = 50) => {
      // 새로운 노드와 엣지 배열 생성 (immutability 유지)
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));
      dagreGraph.setGraph({ rankdir: direction });

      // 모든 노드를 dagre 그래프에 추가
      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
      });

      // 모든 엣지를 dagre 그래프에 추가
      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      // dagre 레이아웃 계산 실행
      dagre.layout(dagreGraph);

      // 계산된 위치로 노드 업데이트
      const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        
        // 노드 중심 위치에서 실제 위치로 변환 (좌상단 모서리 기준)
        return {
          ...node,
          position: {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
          },
        };
      });

      return { nodes: layoutedNodes, edges };
    },
    []
  );

  return { getLayoutedElements };
}; 