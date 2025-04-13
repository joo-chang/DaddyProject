import { Handle, Position, NodeProps } from 'reactflow';
import { CenturyNodeData } from '../../../types';

// 세기 노드 컴포넌트
const CenturyNode = ({ data }: NodeProps<CenturyNodeData>) => {
  return (
    <div style={{
      padding: '8px 16px',
      borderRadius: '6px',
      backgroundColor: '#dbeafe',
      border: '2px solid #60a5fa',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      minWidth: '120px',
      textAlign: 'center'
    }}>
      <div style={{
        fontWeight: 'bold',
        color: '#1e40af'
      }}>
        {data.label}
      </div>
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#3b82f6'
        }} 
      />
    </div>
  );
};

export default CenturyNode; 