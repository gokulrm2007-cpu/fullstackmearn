import React, { useState } from 'react';
import { GitFork, Repeat, CheckCircle } from 'lucide-react';

export default function ControlFlowDemo({ onLogMessage }) {
  const [signal, setSignal] = useState('White');
  const [score, setScore] = useState(92);
  const [multiNumber, setMultiNumber] = useState(2);
  const [multiLimit, setMultiLimit] = useState(10);
  const [doWhileCount, setDoWhileCount] = useState(6);

  // Traffic Light Logic (conditional.js)
  const getSignalAction = (color) => {
    switch (color.toLowerCase()) {
      case 'green': return { action: 'go!', color: '#34d399' };
      case 'yellow': return { action: 'Wait!', color: '#f59e0b' };
      case 'red': return { action: 'stop!', color: '#f87171' };
      default: return { action: 'Invalid color light', color: '#94a3b8' };
    }
  };

  const currentAction = getSignalAction(signal);

  // Grade Logic (function.js)
  const gradeResult = score >= 90 ? 'Grade: A' : 'Grade: B or below';

  // For Loop Multiplication
  const forLoopList = [];
  for (let i = 1; i <= multiLimit; i++) {
    forLoopList.push({ i, val: multiNumber * i });
  }

  // Do-While Simulation
  let tempCount = Number(doWhileCount);
  const doWhileLogs = [];
  do {
    doWhileLogs.push(`Count: ${tempCount}`);
    tempCount++;
  } while (tempCount <= 5);
  doWhileLogs.push(`outside do ..while (final count = ${tempCount})`);

  const handleLogControlFlow = () => {
    onLogMessage(`[Switch Case (conditional.js)] signal="${signal}" -> ${currentAction.action}`);
    onLogMessage(`[Score Conditional (function.js)] score=${score} -> ${gradeResult}`);
    onLogMessage(`[Multiplication Table (lopping.js)] Generating ${multiNumber} x 1..${multiLimit}`);
    forLoopList.forEach((item) => onLogMessage(`${multiNumber} x ${item.i} = ${item.val}`));
    doWhileLogs.forEach((log) => onLogMessage(`[Do-While] ${log}`));
  };

  return (
    <div>
      <div className="grid-2">
        {/* Card 1: Conditionals & Switch */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title"><GitFork size={20} color="#818cf8" /> Conditionals &amp; Switch (conditional.js, function.js)</h2>
            <span className="badge badge-info">Switch &amp; If-Else</span>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8125rem', color: '#94a3b8', display: 'block', marginBottom: '0.375rem' }}>Traffic Signal Light:</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {['green', 'yellow', 'red', 'White'].map((col) => (
                <button
                  key={col}
                  className={`tab-btn ${signal.toLowerCase() === col.toLowerCase() ? 'active' : ''}`}
                  style={{ padding: '0.375rem 0.75rem', fontSize: '0.8125rem' }}
                  onClick={() => setSignal(col)}
                >
                  {col}
                </button>
              ))}
            </div>
            <div style={{ padding: '0.75rem', background: '#090d16', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
              Action: <strong style={{ color: currentAction.color }}>{currentAction.action}</strong>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8125rem', color: '#94a3b8', display: 'block', marginBottom: '0.375rem' }}>Student Score (Grade Evaluator):</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input type="number" className="input-field" style={{ width: '100px' }} value={score} onChange={(e) => setScore(Number(e.target.value))} />
              <div style={{ padding: '0.625rem 1rem', background: '#090d16', borderRadius: '6px', color: '#38bdf8', fontWeight: 600 }}>
                {gradeResult}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Loops */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title"><Repeat size={20} color="#34d399" /> Loops (lopping.js)</h2>
            <span className="badge badge-success">For &amp; Do-While</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div className="form-group"><label>Table Number</label><input type="number" className="input-field" value={multiNumber} onChange={(e) => setMultiNumber(Number(e.target.value))} /></div>
            <div className="form-group"><label>Limit</label><input type="number" className="input-field" value={multiLimit} onChange={(e) => setMultiLimit(Number(e.target.value))} /></div>
          </div>

          <div className="code-box" style={{ maxHeight: '160px', overflowY: 'auto' }}>
            {forLoopList.map((item) => (
              <div key={item.i}>{multiNumber} x {item.i} = {item.val}</div>
            ))}
          </div>

          <button className="btn btn-primary" style={{ marginTop: '0.75rem' }} onClick={handleLogControlFlow}>
            <CheckCircle size={16} /> Run &amp; Log Control Flow
          </button>
        </div>
      </div>
    </div>
  );
}
