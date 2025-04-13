import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setTimelineData, selectNode } from '../../../store/timelineSlice';
import { NodeType, SelectedNodeInfo } from '../../../types';
import { useAutoLayout } from '../hooks/useAutoLayout';

// 커스텀 노드 컴포넌트 import
import CenturyNode from './CenturyNode';
import YearNode from './YearNode';
import HistoricalEntryNode from './HistoricalEntryNode';
import DetailPanel from './DetailPanel';
import AddNodeForm from './AddNodeForm';
import { sampleTimelineData } from '../../../data/sampleData';

// 노드 타입 매핑
const nodeTypes = {
  [NodeType.CENTURY]: CenturyNode,
  [NodeType.YEAR]: YearNode,
  [NodeType.PERSON]: HistoricalEntryNode,
  [NodeType.EVENT]: HistoricalEntryNode,
  [NodeType.IDEA]: HistoricalEntryNode,
};

// 실제 Flow 컴포넌트
const Flow = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.timeline);
  const { getLayoutedElements } = useAutoLayout();
  const reactFlowInstance = useReactFlow();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 데이터 초기화
  useEffect(() => {
    if (!isInitialized && data.nodes.length === 0) {
      try {
        // 샘플 데이터를 자동 레이아웃으로 변환
        const { nodes, edges } = getLayoutedElements(
          sampleTimelineData.nodes,
          sampleTimelineData.edges,
          'LR',
          180,
          60
        );
        
        
        // 스토어에 데이터 저장
        dispatch(setTimelineData({ nodes, edges }));
        setIsInitialized(true);
        
        // 1초 후 화면 중앙 맞춤 (노드 렌더링 후)
        setTimeout(() => {
          if (reactFlowInstance) {
            reactFlowInstance.fitView({ padding: 0.2 });
          }
        }, 1000);
      } catch (error) {
        console.error("Error in Flow useEffect:", error);
      }
    }
  }, [dispatch, getLayoutedElements, reactFlowInstance, isInitialized, data.nodes.length]);

  // 노드 클릭 핸들러
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const selectedNodeInfo: SelectedNodeInfo = {
        id: node.id,
        type: node.type as NodeType,
        data: node.data
      };
      dispatch(selectNode(selectedNodeInfo));
    },
    [dispatch]
  );

  return (
    <div style={{ width: '100%', height: '100%', background: 'white', position: 'relative' }}>
      <ReactFlow
        nodes={data.nodes}
        edges={data.edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap 
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
      
      {/* 새 노드 추가 버튼 */}
      <div style={{
        position: 'absolute',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 10
      }}>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
          title="새 노드 추가"
        >
          +
        </button>
      </div>
      
      {/* 상세 패널 */}
      <DetailPanel />
      
      {/* 노드 추가 폼 */}
      {showAddForm && (
        <AddNodeForm onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
};

// Provider로 감싼 컴포넌트
const FlowCanvas = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f0f0f0', position: 'relative' }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
};

export default FlowCanvas; 