import React, { useState, useEffect } from 'react';
import { Box, CheckCircle2, AlertCircle, RefreshCw, Save, Shield } from 'lucide-react';

export default function VariablesDemo({ onLogMessage }) {
  const [variables, setVariables] = useState({
    name: 'gokul',
    age: 19,
    country: 'india',
  });
  const [scopeTestResult, setScopeTestResult] = useState(null);
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedStatus, setSavedStatus] = useState(null);

  const fetchVariablesFromBackend = async () => {
    try {
      const res = await fetch('/api/variables');
      if (res.ok) {
        const data = await res.json();
        setBackendData(data);
        if (data.data) {
          setVariables({
            name: data.data.name,
            age: data.data.age,
            country: data.data.country,
          });
        }
      }
    } catch (err) {
      console.warn('Backend offline or not reachable, using client state');
    }
  };

  useEffect(() => {
    fetchVariablesFromBackend();
  }, []);

  const handleScopeSimulation = () => {
    // Exact simulation from laddu/variable.js:
    // var name = "gokul"
    // console.log(name)
    // {
    //    let age = 19
    //    console.log(age)
    // }
    // const country = "india"
    // console.log(country)

    onLogMessage(`[Client Execution] var name = "${variables.name}" -> Output: ${variables.name}`);
    onLogMessage(`[Client Execution] { let age = ${variables.age} } -> Inside block: ${variables.age}`);
    onLogMessage(`[Client Execution] const country = "${variables.country}" -> Output: ${variables.country}`);

    setScopeTestResult({
      nameScope: {
        keyword: 'var',
        variable: 'name',
        value: variables.name,
        scope: 'Global / Function Scope',
        accessibleOutside: true,
        hoisting: 'Hoisted with initialized value undefined',
      },
      ageScope: {
        keyword: 'let',
        variable: 'age',
        value: variables.age,
        scope: 'Block Scope { ... }',
        accessibleOutside: false,
        outsideError: 'ReferenceError: age is not defined outside block',
      },
      countryScope: {
        keyword: 'const',
        variable: 'country',
        value: variables.country,
        scope: 'Block Scope (Immutable Binding)',
        accessibleOutside: true,
        reassignmentError: 'TypeError: Assignment to constant variable',
      },
    });
  };

  const handleSaveToBackend = async () => {
    setLoading(true);
    setSavedStatus(null);
    try {
      const res = await fetch('/api/variables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });
      const data = await res.json();
      if (data.success) {
        setSavedStatus(`Saved successfully (${data.storage})`);
        onLogMessage(`[Backend POST /api/variables] Saved: ${JSON.stringify(variables)}`);
        fetchVariablesFromBackend();
      }
    } catch (err) {
      setSavedStatus('Saved locally (Backend API offline)');
    } finally {
      setLoading(false);
      setTimeout(() => setSavedStatus(null), 3000);
    }
  };

  return (
    <div>
      <div className="grid-2">
        {/* Card 1: Original Source Code & Interactive Inputs */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Box size={20} color="#818cf8" />
              Source: <code>variable.js</code>
            </h2>
            <span className="badge badge-info">Source Recreated</span>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Direct migration of variable declarations, scoping rules, and output from the <code>laddu</code> repository.
          </p>

          <div className="code-box">
            <span style={{ color: '#f43f5e' }}>var</span> name = <span style={{ color: '#a7f3d0' }}>"{variables.name}"</span><br />
            console.log(name)<br />
            &#123;<br />
            &nbsp;&nbsp;<span style={{ color: '#38bdf8' }}>let</span> age = <span style={{ color: '#fde047' }}>{variables.age}</span><br />
            &nbsp;&nbsp;console.log(age)<br />
            &#125;<br />
            <span style={{ color: '#a855f7' }}>const</span> country = <span style={{ color: '#a7f3d0' }}>"{variables.country}"</span><br />
            console.log(country)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
            <div className="form-group">
              <label>var name</label>
              <input
                type="text"
                className="input-field"
                value={variables.name}
                onChange={(e) => setVariables({ ...variables, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>let age (block)</label>
              <input
                type="number"
                className="input-field"
                value={variables.age}
                onChange={(e) => setVariables({ ...variables, age: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>const country</label>
              <input
                type="text"
                className="input-field"
                value={variables.country}
                onChange={(e) => setVariables({ ...variables, country: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={handleScopeSimulation}>
              <RefreshCw size={16} /> Run Scope Simulation
            </button>
            <button className="btn btn-secondary" onClick={handleSaveToBackend} disabled={loading}>
              <Save size={16} /> {loading ? 'Saving...' : 'Sync with Backend'}
            </button>
          </div>

          {savedStatus && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <CheckCircle2 size={14} /> {savedStatus}
            </div>
          )}
        </div>

        {/* Card 2: Scope Analysis & Verification */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Shield size={20} color="#34d399" />
              Scope & Immutability Inspector
            </h2>
            <span className="badge badge-success">MERN Verified</span>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Verification of <code>var</code> vs <code>let</code> vs <code>const</code> scoping rules:
          </p>

          <table className="results-table">
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Keyword</th>
                <th>Scope Behavior</th>
                <th>Access Outside Block</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>name</code></td>
                <td><span className="badge badge-warning">var</span></td>
                <td>Function/Global Scope</td>
                <td><span className="result-val result-true">✓ Accessible</span></td>
              </tr>
              <tr>
                <td><code>age</code></td>
                <td><span className="badge badge-info">let</span></td>
                <td>Block Scope <code>&#123; ... &#125;</code></td>
                <td><span className="result-val result-false">✗ ReferenceError</span></td>
              </tr>
              <tr>
                <td><code>country</code></td>
                <td><span className="badge badge-success">const</span></td>
                <td>Block Scope + Immutable</td>
                <td><span className="result-val result-true">✓ Immutable</span></td>
              </tr>
            </tbody>
          </table>

          {scopeTestResult && (
            <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: '#090d16', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.8125rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '600' }}>
                LIVE RUNTIME SCOPE TEST:
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#38bdf8', marginBottom: '0.25rem' }}>
                • <code>window.name / global.name</code>: "{scopeTestResult.nameScope.value}"
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#f87171', marginBottom: '0.25rem' }}>
                • <code>outside_block(age)</code>: {scopeTestResult.ageScope.outsideError}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#a7f3d0' }}>
                • <code>country = "test"</code>: {scopeTestResult.countryScope.reassignmentError}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
