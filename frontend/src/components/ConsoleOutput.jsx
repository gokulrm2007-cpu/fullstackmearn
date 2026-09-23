import React from 'react';
import { Terminal, Trash2 } from 'lucide-react';

export default function ConsoleOutput({ logs, onClear }) {
  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <div className="card-header">
        <h2 className="card-title">
          <Terminal size={18} color="#38bdf8" />
          JavaScript Output & Logs
        </h2>
        <button
          className="btn btn-secondary"
          style={{ padding: '0.25rem 0.625rem', fontSize: '0.75rem' }}
          onClick={onClear}
        >
          <Trash2 size={13} /> Clear Logs
        </button>
      </div>

      <div
        style={{
          background: '#040711',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          color: '#e2e8f0',
          minHeight: '140px',
          maxHeight: '220px',
          overflowY: 'auto',
          lineHeight: '1.6',
        }}
      >
        {logs.length === 0 ? (
          <span style={{ color: '#64748b' }}>// Console output will appear here when you run calculations or simulations...</span>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={{ color: log.startsWith('//') ? '#94a3b8' : log.includes('false') ? '#f87171' : log.includes('true') ? '#34d399' : '#38bdf8' }}>
              <span style={{ color: '#64748b', marginRight: '0.5rem' }}>&gt;</span>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
