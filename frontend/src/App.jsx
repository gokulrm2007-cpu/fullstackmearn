import React, { useState, useEffect } from 'react';
import { Layers, Database, Code, Terminal, Activity, ArrowUpRight } from 'lucide-react';
import VariablesDemo from './components/VariablesDemo';
import OperatorsDemo from './components/OperatorsDemo';
import ConsoleOutput from './components/ConsoleOutput';
import SourceCodeViewer from './components/SourceCodeViewer';

export default function App() {
  const [activeTab, setActiveTab] = useState('operators');
  const [logs, setLogs] = useState([]);
  const [serverStatus, setServerStatus] = useState({ online: false, dbStatus: 'checking...' });

  const addLogMessage = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev]);
  };

  const checkBackendHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setServerStatus({
          online: true,
          dbStatus: data.database.connected ? 'MongoDB Connected' : 'In-Memory Mode (Active)',
          version: data.version,
        });
      } else {
        setServerStatus({ online: false, dbStatus: 'Offline' });
      }
    } catch {
      setServerStatus({ online: false, dbStatus: 'Backend Offline (Standalone UI)' });
    }
  };

  useEffect(() => {
    checkBackendHealth();
    // Initial banner log
    addLogMessage('Migrated laddu project initialized in fullstackmearn MERN stack.');
    addLogMessage('Source features: JavaScript variables (var/let/const) & operators (arithmetic/assignment/comparison).');
  }, []);

  return (
    <div className="app-container">
      {/* App Header */}
      <header className="header">
        <div className="header-badge">
          <Layers size={14} /> Fullstack MERN Architecture
        </div>
        <h1>fullstackmearn</h1>
        <p>
          Complete working MERN project migrated from <code>laddu</code> repository with Express backend & React frontend.
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'operators' ? 'active' : ''}`}
          onClick={() => setActiveTab('operators')}
        >
          <Code size={18} /> Operators & Calculations
        </button>
        <button
          className={`tab-btn ${activeTab === 'variables' ? 'active' : ''}`}
          onClick={() => setActiveTab('variables')}
        >
          <Database size={18} /> Variables & Scopes
        </button>
        <button
          className={`tab-btn ${activeTab === 'source' ? 'active' : ''}`}
          onClick={() => setActiveTab('source')}
        >
          <Layers size={18} /> Source vs Target Diff
        </button>
      </nav>

      {/* Tab Panels */}
      <main>
        {activeTab === 'operators' && (
          <OperatorsDemo onLogMessage={addLogMessage} />
        )}

        {activeTab === 'variables' && (
          <VariablesDemo onLogMessage={addLogMessage} />
        )}

        {activeTab === 'source' && (
          <SourceCodeViewer />
        )}
      </main>

      {/* Global Console / Execution Log */}
      <ConsoleOutput logs={logs} onClear={() => setLogs([])} />

      {/* Footer / Status Bar */}
      <footer className="status-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div>
            <span className={`status-dot ${serverStatus.online ? 'online' : 'offline'}`}></span>
            <strong>Backend Server:</strong> {serverStatus.online ? 'Online (:5000)' : 'Offline / Client Mode'}
          </div>
          <div>
            <strong>Database:</strong> {serverStatus.dbStatus}
          </div>
        </div>
        <div>
          <span>Migrated from <a href="https://github.com/gokulm25csc-cmyk/laddu" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>gokulm25csc-cmyk/laddu</a></span>
        </div>
      </footer>
    </div>
  );
}
