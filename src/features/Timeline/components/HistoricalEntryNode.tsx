import { Handle, Position, NodeProps } from 'reactflow';
import { HistoricalEntryData } from '../../../types';

// 역사적 항목 노드 컴포넌트 (인물, 사건, 사상)
const HistoricalEntryNode = ({ data }: NodeProps<HistoricalEntryData>) => {
  // 노드 타입에 따른 스타일 설정
  const getNodeStyle = () => {
    switch (data.type) {
      case 'person':
        return {
          bgColor: '#f3e8ff',
          borderColor: '#c084fc',
          textColor: '#6b21a8',
          handleColor: '#a855f7'
        };
      case 'event':
        return {
          bgColor: '#fee2e2',
          borderColor: '#f87171',
          textColor: '#991b1b',
          handleColor: '#ef4444'
        };
      case 'idea':
        return {
          bgColor: '#fef3c7',
          borderColor: '#fbbf24',
          textColor: '#92400e',
          handleColor: '#f59e0b'
        };
      default:
        return {
          bgColor: '#f3f4f6',
          borderColor: '#9ca3af',
          textColor: '#1f2937',
          handleColor: '#6b7280'
        };
    }
  };

  const style = getNodeStyle();

  return (
    <div style={{
      padding: '8px 16px',
      borderRadius: '6px',
      backgroundColor: style.bgColor,
      border: `2px solid ${style.borderColor}`,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      minWidth: '150px'
    }}>
      <div style={{
        fontWeight: 'bold',
        color: style.textColor
      }}>
        {data.label}
      </div>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: style.handleColor
        }} 
      />
    </div>
  );
};

export default HistoricalEntryNode;
