import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addNode, addEdge } from '../../../store/timelineSlice';
import { NodeType } from '../../../types';

interface AddNodeFormProps {
  onClose: () => void;
}

const AddNodeForm = ({ onClose }: AddNodeFormProps) => {
  const dispatch = useAppDispatch();
  const [nodeType, setNodeType] = useState<NodeType>(NodeType.EVENT);
  const [label, setLabel] = useState('');
  const [details, setDetails] = useState('');
  const [year, setYear] = useState<number>(0);
  const [parentId, setParentId] = useState<string>('');
  const [century, setCentury] = useState<number>(0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!label.trim()) {
      alert('라벨을 입력해주세요.');
      return;
    }
    
    // 고유 ID 생성
    const id = `${nodeType.toLowerCase()}_${Date.now()}`;
    
    // 노드 타입에 맞는 데이터 생성
    let nodeData: any = { label };
    
    switch (nodeType) {
      case NodeType.CENTURY:
        nodeData = {
          label,
          century: Number(century)
        };
        break;
      case NodeType.YEAR:
        nodeData = {
          label,
          year: Number(year),
          century: Number(century)
        };
        break;
      default: // PERSON, EVENT, IDEA
        nodeData = {
          label,
          details,
          year: Number(year),
          type: nodeType === NodeType.PERSON ? 'person' : nodeType === NodeType.EVENT ? 'event' : 'idea'
        };
        break;
    }
    
    // 새 노드 생성 및 추가
    const newNode = {
      id,
      type: nodeType,
      position: { x: 0, y: 0 }, // 자동 레이아웃으로 실제 위치는 계산됨
      data: nodeData
    };
    
    dispatch(addNode(newNode));
    
    // 부모 노드가 있으면 엣지 추가
    if (parentId) {
      const newEdge = {
        id: `edge_${Date.now()}`,
        source: parentId,
        target: id,
        type: 'smoothstep'
      };
      
      dispatch(addEdge(newEdge));
    }
    
    // 폼 닫기
    onClose();
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '500px',
        padding: '1.5rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#1f2937' }}>
            새 노드 추가
          </h2>
          <button 
            onClick={onClose}
            style={{ 
              color: '#6b7280', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
              노드 타입:
            </label>
            <select 
              value={nodeType} 
              onChange={(e) => setNodeType(e.target.value as NodeType)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}
            >
              <option value={NodeType.CENTURY}>세기</option>
              <option value={NodeType.YEAR}>연도</option>
              <option value={NodeType.PERSON}>인물</option>
              <option value={NodeType.EVENT}>사건</option>
              <option value={NodeType.IDEA}>사상/개념</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
              라벨:
            </label>
            <input 
              type="text" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)}
              placeholder="예) 조선시대, 1592년, 세종대왕, 임진왜란, 유교사상"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}
              required
            />
          </div>
          
          {/* 세기 선택 (세기 또는 연도 노드인 경우) */}
          {(nodeType === NodeType.CENTURY || nodeType === NodeType.YEAR) && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
                세기 (BC인 경우 음수):
              </label>
              <input 
                type="number" 
                value={century} 
                onChange={(e) => setCentury(Number(e.target.value))}
                placeholder="예) 17, -1 (BC 1세기)"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          )}
          
          {/* 연도 선택 (연도, 인물, 사건, 사상 노드인 경우) */}
          {nodeType !== NodeType.CENTURY && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
                연도 (BC인 경우 음수):
              </label>
              <input 
                type="number" 
                value={year} 
                onChange={(e) => setYear(Number(e.target.value))}
                placeholder="예) 1592, -44 (BC 44년)"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          )}
          
          {/* 상세 설명 (인물, 사건, 사상 노드인 경우) */}
          {(nodeType === NodeType.PERSON || nodeType === NodeType.EVENT || nodeType === NodeType.IDEA) && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
                상세 설명:
              </label>
              <textarea 
                value={details} 
                onChange={(e) => setDetails(e.target.value)}
                placeholder="상세 설명을 입력하세요..."
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  minHeight: '6rem',
                  resize: 'vertical'
                }}
              />
            </div>
          )}
          
          {/* 부모 노드 ID (선택 사항) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
              부모 노드 ID (선택):
            </label>
            <input 
              type="text" 
              value={parentId} 
              onChange={(e) => setParentId(e.target.value)}
              placeholder="연결할 부모 노드의 ID"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}
            />
            <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>
              다른 노드에 연결하려면 해당 노드의 ID를 입력하세요 (예: century_1, year_1592)
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button 
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: '#4b5563',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              취소
            </button>
            <button 
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNodeForm; 