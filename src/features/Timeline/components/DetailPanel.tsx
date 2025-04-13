import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { clearSelectedNode, updateNode, deleteNode, toggleEditMode } from '../../../store/timelineSlice';
import { HistoricalEntryData, NodeType } from '../../../types';

const DetailPanel = () => {
  const dispatch = useAppDispatch();
  const { selectedNode, isDetailPanelOpen, isEditMode } = useAppSelector(state => state.timeline);
  const styleMap : Record<NodeType, { title: string; bgColor: string; borderColor: string; textColor: string }> = {
    [NodeType.PERSON]: {
      title: '인물 정보',
      bgColor: '#faf5ff',
      borderColor: '#c084fc',
      textColor: '#6b21a8'
    },
    [NodeType.EVENT]: {
      title: '사건 정보',
      bgColor: '#fef2f2',
      borderColor: '#f87171',
      textColor: '#991b1b'
    },
    [NodeType.IDEA]: {
      title: '사상/개념 정보',
      bgColor: '#fffbeb',
      borderColor: '#fbbf24',
      textColor: '#92400e'
    },
    [NodeType.CENTURY]: {
      title: '세기 정보',
      bgColor: '#eff6ff',
      borderColor: '#60a5fa',
      textColor: '#1e40af'
    },
    [NodeType.YEAR]: {
      title: '연도 정보',
      bgColor: '#f0fdf4',
      borderColor: '#4ade80',
      textColor: '#166534'
    }
  };
  const isHistoricalEntry = (data: any): data is HistoricalEntryData => {
    return 'details' in data && 'type' in data;
  };
  
  const style = styleMap[selectedNode.type as NodeType];
  // 편집을 위한 로컬 상태
  const [editedLabel, setEditedLabel] = useState('');
  const [editedDetails, setEditedDetails] = useState('');
  
  if (!isDetailPanelOpen || !selectedNode.id) {
    return null;
  }
  
  // 편집 모드 활성화 시 초기 값 설정
  const startEditMode = () => {
    if (selectedNode.data) {
      setEditedLabel(selectedNode.data.label || '');
      if ("details" in selectedNode.data) {
        setEditedDetails(selectedNode.data.details || '');
      }
    }
    dispatch(toggleEditMode());
  };
  
  // 변경 사항 저장
  const saveChanges = () => {
    if (selectedNode.id) {
      dispatch(updateNode({
        id: selectedNode.id,
        data: {
          label: editedLabel,
          details: editedDetails
        }
      }));
      dispatch(toggleEditMode());
    }
  };
  
  // 편집 취소
  const cancelEdit = () => {
    dispatch(toggleEditMode());
  };
  
  // 노드 삭제
  const handleDelete = () => {
    if (selectedNode.id && window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
      dispatch(deleteNode(selectedNode.id));
    }
  };
  
  // 노드 타입에 따른 UI 스타일 및 내용 설정
  const getNodeTypeDetails = () => {
    if (!selectedNode.type || !selectedNode.data) return null;
    
    switch (selectedNode.type) {
      case NodeType.CENTURY:
        return {
          title: style.title,
          bgColor: style.bgColor,
          borderColor: style.borderColor,
          content: isEditMode ? (
            // 편집 모드 UI
            <>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
                  라벨:
                </label>
                <input 
                  type="text" 
                  value={editedLabel} 
                  onChange={(e) => setEditedLabel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </>
          ) : (
            // 보기 모드 UI
            <>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e40af' }}>
                {selectedNode.data.label}
              </div>
            </>
          )
        };
      case NodeType.YEAR:
        return {
          title: style.title,
          bgColor: style.bgColor,
          borderColor: style.borderColor,
          content: isEditMode ? (
            // 편집 모드 UI
            <>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
                  라벨:
                </label>
                <input 
                  type="text" 
                  value={editedLabel} 
                  onChange={(e) => setEditedLabel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </>
          ) : (
            // 보기 모드 UI
            <>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#166534' }}>
                {selectedNode.data.label}
              </div>
            </>
          )
        };
      case NodeType.PERSON:
      case NodeType.EVENT:
      case NodeType.IDEA:
        if (isHistoricalEntry(selectedNode.data)) {
        
        return {
          title: style.title,
          bgColor: style.bgColor,
          borderColor: style.borderColor,
          content: isEditMode ? (
            // 편집 모드 UI
            <>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
                  라벨:
                </label>
                <input 
                  type="text" 
                  value={editedLabel} 
                  onChange={(e) => setEditedLabel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', color: '#4b5563' }}>
                  상세 내용:
                </label>
                <textarea 
                  value={editedDetails} 
                  onChange={(e) => setEditedDetails(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    minHeight: '8rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            </>
          ) : (
            // 보기 모드 UI
            <>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: style.textColor }}>
                {selectedNode.data.label}
              </div>
              <div style={{ marginTop: '0.5rem', color: '#4b5563' }}>
                {selectedNode.data.details}
              </div>
              {selectedNode.data.imageUrl && (
                <img 
                  src={selectedNode.data.imageUrl} 
                  alt={selectedNode.data.label} 
                  style={{ 
                    marginTop: '1rem', 
                    maxWidth: '100%', 
                    height: 'auto', 
                    borderRadius: '0.375rem' 
                  }}
                />
              )}
            </>
          )
        };
      }
      return null;
      default:
        return {
          title: '정보',
          bgColor: '#f9fafb',
          borderColor: '#9ca3af',
          content: (
            <div style={{ color: '#4b5563' }}>선택된 항목에 대한 정보가 없습니다.</div>
          )
        };
    }
  };
  
  const details = getNodeTypeDetails();
  
  if (!details) return null;
  
  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: '20rem',
      maxHeight: 'calc(100vh - 2rem)',
      overflowY: 'auto',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      zIndex: 10
    }}>
      <div style={{
        backgroundColor: details.bgColor,
        padding: '1rem',
        border: `1px solid ${details.borderColor}`,
        borderRadius: '0.5rem',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem'
        }}>
          <h3 style={{ fontWeight: 'bold', color: '#1f2937' }}>{details.title}</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {isEditMode ? (
              // 편집 모드 버튼들
              <>
                <button 
                  onClick={saveChanges}
                  style={{ 
                    color: '#047857', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="저장"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={cancelEdit}
                  style={{ 
                    color: '#b91c1c', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="취소"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            ) : (
              // 보기 모드 버튼들
              <>
                <button 
                  onClick={startEditMode}
                  style={{ 
                    color: '#1d4ed8', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="편집"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button 
                  onClick={handleDelete}
                  style={{ 
                    color: '#b91c1c', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="삭제"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={() => dispatch(clearSelectedNode())}
                  style={{ 
                    color: '#6b7280', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="닫기"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
        <div>
          {details.content}
        </div>
      </div>
    </div>
  );
};

export default DetailPanel; 