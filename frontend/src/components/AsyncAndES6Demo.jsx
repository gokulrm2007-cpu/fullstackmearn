import React, { useState, useEffect } from 'react';
import { Layers, Play, Database, Globe, Save, Download } from 'lucide-react';

export default function AsyncAndES6Demo({ onLogMessage }) {
  const [activeSubTab, setActiveSubTab] = useState('async');

  // Async states
  const [asyncStatus, setAsyncStatus] = useState('Idle');
  const [fetchUserData, setFetchUserData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  // LocalStorage state (localstorage.html)
  const [storageInput, setStorageInput] = useState('Gokul');
  const [storedData, setStoredData] = useState('');

  // ES6 Data
  const student = { name: 'Arun', age: 20, department: 'IT' };
  const { name: studentName, age: studentAge, department: studentDept } = student;
  const collegeName = 'VETIAS';
  const baseStudents = ['Arun', 'Priya', 'Devadharshini'];
  const spreadStudents = [...baseStudents, 'Rahul'];

  // Callback simulation
  const handleRunCallback = () => {
    onLogMessage('[Callback (callback.html)] Calling displaystudent(student) after 1.5s delay...');
    setAsyncStatus('Running Callback...');
    setTimeout(() => {
      const studentData = 'Arun';
      onLogMessage(`[Callback Complete] Loaded student: ${studentData}`);
      setAsyncStatus('Callback Finished');
    }, 1500);
  };

  // Promise simulation
  const handleRunPromise = () => {
    onLogMessage('[Promise (promise.html)] Initializing new Promise((resolve, reject) => ...)...');
    setAsyncStatus('Promise Pending...');
    const p = new Promise((resolve) => {
      setTimeout(() => resolve('student loaded successfully (via Promise)'), 1500);
    });
    p.then((res) => {
      onLogMessage(`[Promise Resolved] ${res}`);
      setAsyncStatus('Promise Resolved');
    });
  };

  // Async / Await simulation
  const handleRunAsyncAwait = async () => {
    onLogMessage('[Async/Await (async-await.html)] Loading student asynchronously...');
    setAsyncStatus('Awaiting getstudent()...');
    const getStudent = () =>
      new Promise((resolve) => setTimeout(() => resolve('Arun (Async/Await Result)'), 1200));
    const res = await getStudent();
    onLogMessage(`[Async/Await Done] Loaded: ${res}`);
    setAsyncStatus('Async/Await Completed');
  };

  // Live Fetch simulation (fech-app.html)
  const handleFetchData = async () => {
    setFetchLoading(true);
    onLogMessage('[Fetch API (fech-app.html)] Requesting user from backend API / JSONPlaceholder...');
    try {
      const res = await fetch('/api/students/fetch-mock');
      const data = await res.json();
      setFetchUserData(data);
      onLogMessage(`[Fetch API Success] Student Name: ${data.name}`);
    } catch {
      setFetchUserData({ name: 'Leanne Graham (Offline Mock)' });
    } finally {
      setFetchLoading(false);
    }
  };

  // LocalStorage methods (localstorage.html)
  const handleSaveLocalStorage = () => {
    localStorage.setItem('student', storageInput);
    onLogMessage(`[LocalStorage (localstorage.html)] setItem("student", "${storageInput}")`);
    alert('Data Saved to LocalStorage!');
  };

  const handleGetLocalStorage = () => {
    const val = localStorage.getItem('student') || '(No item stored yet)';
    setStoredData(val);
    onLogMessage(`[LocalStorage] getItem("student") -> "${val}"`);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className={`tab-btn ${activeSubTab === 'async' ? 'active' : ''}`} onClick={() => setActiveSubTab('async')}>
          Async JavaScript (Callbacks, Promises, Async/Await)
        </button>
        <button className={`tab-btn ${activeSubTab === 'fetch_storage' ? 'active' : ''}`} onClick={() => setActiveSubTab('fetch_storage')}>
          Fetch API &amp; LocalStorage
        </button>
        <button className={`tab-btn ${activeSubTab === 'es6' ? 'active' : ''}`} onClick={() => setActiveSubTab('es6')}>
          ES6+ Features (Spread, Rest, Destructure)
        </button>
      </div>

      {/* ASYNC TAB */}
      {activeSubTab === 'async' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title"><Layers size={20} color="#38bdf8" /> Async Evolution</h2>
              <span className="badge badge-info">Callback / Promise / Async-Await</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Direct interactive implementation of <code>callback.html</code>, <code>promise.html</code>, and <code>async-await.html</code>.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <button className="btn btn-secondary" onClick={handleRunCallback}>Run Callback</button>
              <button className="btn btn-secondary" onClick={handleRunPromise}>Run Promise</button>
              <button className="btn btn-primary" onClick={handleRunAsyncAwait}>Run Async/Await</button>
            </div>
            <div style={{ padding: '0.75rem', background: '#090d16', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              Status: <strong style={{ color: '#38bdf8' }}>{asyncStatus}</strong>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Async/Await Code</h2>
              <span className="badge badge-success">Source Pattern</span>
            </div>
            <div className="code-box">
              function getstudent() &#123;<br />
              &nbsp;&nbsp;return new Promise((resolve) =&gt; &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;setTimeout(() =&gt; resolve("Arun"), 3000);<br />
              &nbsp;&nbsp;&#125;);<br />
              &#125;<br />
              async function displaystudent() &#123;<br />
              &nbsp;&nbsp;console.log("Loading student...");<br />
              &nbsp;&nbsp;let student = await getstudent();<br />
              &nbsp;&nbsp;console.log(student);<br />
              &#125;
            </div>
          </div>
        </div>
      )}

      {/* FETCH & LOCALSTORAGE TAB */}
      {activeSubTab === 'fetch_storage' && (
        <div className="grid-2">
          {/* fech-app.html */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title"><Globe size={20} color="#34d399" /> Fetch API (fech-app.html)</h2>
              <span className="badge badge-info">REST API</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Loads student data asynchronously via <code>fetch()</code>:
            </p>
            <button className="btn btn-primary" onClick={handleFetchData} disabled={fetchLoading} style={{ marginBottom: '1rem' }}>
              {fetchLoading ? 'Loading Student...' : 'Load Student'}
            </button>
            {fetchUserData && (
              <div style={{ padding: '0.75rem', background: '#090d16', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p id="result" style={{ color: '#34d399', fontWeight: 600 }}>
                  Student Name: {fetchUserData.name}
                </p>
              </div>
            )}
          </div>

          {/* localstorage.html */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title"><Database size={20} color="#f59e0b" /> LocalStorage (localstorage.html)</h2>
              <span className="badge badge-info">Browser Storage</span>
            </div>
            <div className="form-group">
              <label>Student Name:</label>
              <input id="studentName" className="input-field" value={storageInput} onChange={(e) => setStorageInput(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button className="btn btn-primary" onClick={handleSaveLocalStorage}><Save size={16} /> Save</button>
              <button className="btn btn-secondary" onClick={handleGetLocalStorage}><Download size={16} /> Get Data</button>
            </div>
            {storedData && (
              <div style={{ padding: '0.75rem', background: '#090d16', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                Retrieved: <strong style={{ color: '#38bdf8' }}>{storedData}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ES6 TAB */}
      {activeSubTab === 'es6' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">ES6 Syntax &amp; Features (es6.js)</h2>
              <span className="badge badge-info">Modern JS</span>
            </div>
            <div className="code-box">
              // Template Literals<br />
              `Welcome ${studentName} to ${collegeName}`<br /><br />
              // Destructuring<br />
              const &#123; name, age, department &#125; = student;<br />
              // Name: "{studentName}", Age: {studentAge}, Dept: "{studentDept}"<br /><br />
              // Spread Operator<br />
              const updated = [...students, "Rahul"];<br />
              // [{spreadStudents.map((s) => `"${s}"`).join(', ')}]<br /><br />
              // Rest Parameter<br />
              Math.max(...[80, 90, 70]) -&gt; 90
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Live Evaluation</h2>
              <span className="badge badge-success">Evaluated</span>
            </div>
            <table className="results-table">
              <thead><tr><th>Feature</th><th>Expression</th><th>Output</th></tr></thead>
              <tbody>
                <tr><td>Template Literal</td><td><code>`Welcome ${'studentName'} to ${'collegeName'}`</code></td><td><span className="result-val result-num">"Welcome Arun to VETIAS"</span></td></tr>
                <tr><td>Spread Array</td><td><code>[...base, "Rahul"]</code></td><td><span className="result-val result-num">Length: 4</span></td></tr>
                <tr><td>Rest Max</td><td><code>Math.max(80, 90, 70)</code></td><td><span className="result-val result-num">90</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
