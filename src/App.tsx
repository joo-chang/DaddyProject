import { Provider } from 'react-redux';
import { store } from './store';
import FlowCanvas from './features/Timeline/components/FlowCanvas';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        margin: 0, 
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        <header style={{ 
          backgroundColor: '#1e293b', 
          color: 'white', 
          padding: '1rem', 
          fontWeight: 'bold', 
          fontSize: '1.5rem',
          height: '60px',
          display: 'flex',
          alignItems: 'center'
        }}>
          역사 타임라인
        </header>
        <main style={{ 
          flex: 1, 
          position: 'relative', 
          overflow: 'hidden',
          height: 'calc(100vh - 60px)'
        }}>
          <FlowCanvas />
        </main>
      </div>
    </Provider>
  );
}

export default App;
