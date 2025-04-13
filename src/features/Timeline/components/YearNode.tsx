import { Handle, Position, NodeProps } from 'reactflow';
import { YearNodeData } from '../../../types';

// 연도 노드 컴포넌트
const YearNode = ({ data }: NodeProps<YearNodeData>) => {
  return (
    <div style={{
      padding: '8px 16px',
      borderRadius: '6px',
      backgroundColor: '#dcfce7',
      border: '2px solid #4ade80',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      minWidth: '100px',
      textAlign: 'center'
    }}>
      <div style={{
        fontWeight: 'bold',
        color: '#166534'
      }}>
        {data.label}
      </div>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#22c55e'
        }} 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#22c55e'
        }} 
      />
    </div>
  );
};

export default YearNode; 