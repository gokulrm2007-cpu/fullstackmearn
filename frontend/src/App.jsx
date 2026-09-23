import React, { useState, useEffect } from 'react';
import { Layers, Database, Code, GitFork, Zap, BookOpen } from 'lucide-react';
import VariablesDemo from './components/VariablesDemo';
import OperatorsDemo from './components/OperatorsDemo';
import ControlFlowDemo from './components/ControlFlowDemo';
import AsyncAndES6Demo from './components/AsyncAndES6Demo';
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
    addLogMessage('fullstackmearn initialized with full 16-module JavaScript & MERN suite.');
    addLogMessage('Modules: Operators, Primitives & Objects, Conditionals, Loops, ES6, Async/Await, Promises, LocalStorage, Fetch.');
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-badge">
          <Layers size={14} /> Fullstack MERN Architecture
        </div>
        <h1>fullstackmearn</h1>
        <p>
          Complete JavaScript &amp; MERN full-stack application migrated and upgraded from <code>laddu</code> repository.
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'operators' ? 'active' : ''}`}
          onClick={() => setActiveTab('operators')}
        >
          <Code size={18} /> Operators &amp; Math
        </button>
        <button
          className={`tab-btn ${activeTab === 'variables' ? 'active' : ''}`}
          onClick={() => setActiveTab('variables')}
        >
          <Database size={18} /> Variables &amp; Data Types
        </button>
        <button
          className={`tab-btn ${activeTab === 'control_flow' ? 'active' : ''}`}
          onClick={() => setActiveTab('control_flow')}
        >
          <GitFork size={18} /> Conditionals &amp; Loops
        </button>
        <button
          className={`tab-btn ${activeTab === 'async_es6' ? 'active' : ''}`}
          onClick={() => setActiveTab('async_es6')}
        >
          <Zap size={18} /> Async JS &amp; ES6+
        </button>
        <button
          className={`tab-btn ${activeTab === 'source' ? 'active' : ''}`}
          onClick={() => setActiveTab('source')}
        >
          <BookOpen size={18} /> Source Files &amp; Diffs
        </button>
      </nav>

      {/* Main Tab Panels */}
      <main>
        {activeTab === 'operators' && <OperatorsDemo onLogMessage={addLogMessage} />}
        {activeTab === 'variables' && <VariablesDemo onLogMessage={addLogMessage} />}
        {activeTab === 'control_flow' && <ControlFlowDemo onLogMessage={addLogMessage} />}
        {activeTab === 'async_es6' && <AsyncAndES6Demo onLogMessage={addLogMessage} />}
        {activeTab === 'source' && <SourceCodeViewer />}
      </main>

      {/* Global Console Log */}
      <ConsoleOutput logs={logs} onClear={() => setLogs([])} />

      {/* Footer */}
      <footer className="status-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div>
            <span className={`status-dot ${serverStatus.online ? 'online' : 'offline'}`}></span>
            <strong>Backend Server:</strong> {serverStatus.online ? 'Online (:5000)' : 'Client Mode'}
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
