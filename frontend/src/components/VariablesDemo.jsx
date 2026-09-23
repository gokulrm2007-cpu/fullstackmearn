import React, { useState, useEffect } from 'react';
import { Box, CheckCircle2, RefreshCw, Save, Shield, Database } from 'lucide-react';

export default function VariablesDemo({ onLogMessage }) {
  const [variables, setVariables] = useState({
    name: 'gokul',
    age: 30,
    isStudent: true,
    country: 'india',
  });

  const [favorites, setFavorites] = useState({
    actor: 'jhone',
    player: 'KBD SUDHAKAR',
    movie: 'VISHWASAM',
  });

  const [activeSubTab, setActiveSubTab] = useState('datatypes');

  const fruits = ['Apple', 'Banana', 'Orange'];

  const studentObject = {
    firstName: 'Hii',
    age: 30,
    isStudent: true,
  };

  const handleRunDataTypesLog = () => {
    onLogMessage('--- JavaScript Data Types Execution (.js / datatypes.js) ---');
    onLogMessage(`number: var age = ${variables.age} (typeof ${typeof variables.age})`);
    onLogMessage(`string: var name = "${variables.name}" (typeof ${typeof variables.name})`);
    onLogMessage(`boolean: var isStudent = ${variables.isStudent} (typeof ${typeof variables.isStudent})`);
    onLogMessage('null: var empty = null (typeof object)');
    onLogMessage('symbol: var SymbolValues = Symbol("symbol")');
    onLogMessage('bigint: var bigIntValue = 123456789n');
    onLogMessage(`object: student = { firstName: "${studentObject.firstName}", age: ${studentObject.age} }`);
    onLogMessage(`array: fruits = [${fruits.map((f) => `"${f}"`).join(', ')}] -> fruits[0] = "${fruits[0]}"`);
    onLogMessage(`function: My favorite actor is ${favorites.actor}, player is ${favorites.player}, and movie is ${favorites.movie}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button className={`tab-btn ${activeSubTab === 'datatypes' ? 'active' : ''}`} onClick={() => setActiveSubTab('datatypes')}>
          Data Types &amp; Objects (.js, datatypes.js)
        </button>
        <button className={`tab-btn ${activeSubTab === 'scopes' ? 'active' : ''}`} onClick={() => setActiveSubTab('scopes')}>
          Variable Scoping (var / let / const)
        </button>
      </div>

      {activeSubTab === 'datatypes' && (
        <div>
          <div className="grid-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><Database size={20} color="#38bdf8" /> Primitive &amp; Complex Data Types</h2>
                <span className="badge badge-info">.js &amp; datatypes.js</span>
              </div>
              <div className="code-box">
                // Primitive Types<br />
                var age = {variables.age}; // Number<br />
                var name = "{variables.name}"; // String<br />
                var isstudent = {String(variables.isStudent)}; // Boolean<br />
                var empty = null; // Null<br />
                var SymbolValues = Symbol("symbol"); // Symbol<br />
                var bigIntValue = 123456789n; // BigInt<br /><br />
                // Objects &amp; Arrays<br />
                var student = &#123; firstName: "Hii", age: 30, isStudent: true &#125;;<br />
                var fruits = ["Apple", "Banana", "Orange"];
              </div>
              <button className="btn btn-primary" onClick={handleRunDataTypesLog}>
                <RefreshCw size={16} /> Log Data Types to Console
              </button>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Favorite String Concatenation</h2>
                <span className="badge badge-success">Function Fixed</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8125rem', marginBottom: '1rem' }}>
                Fixed syntax error in <code>datatypes.js</code> string concatenation:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                <div className="form-group"><label>actor</label><input className="input-field" value={favorites.actor} onChange={(e) => setFavorites({ ...favorites, actor: e.target.value })} /></div>
                <div className="form-group"><label>player</label><input className="input-field" value={favorites.player} onChange={(e) => setFavorites({ ...favorites, player: e.target.value })} /></div>
                <div className="form-group"><label>movie</label><input className="input-field" value={favorites.movie} onChange={(e) => setFavorites({ ...favorites, movie: e.target.value })} /></div>
              </div>
              <div style={{ background: '#090d16', padding: '0.875rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.875rem', color: '#a7f3d0' }}>
                  "My favorite actor is {favorites.actor}, my favorite player is {favorites.player}, and my favorite movie is {favorites.movie}."
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'scopes' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title"><Box size={20} color="#818cf8" /> Variable Scoping</h2>
              <span className="badge badge-info">variable.js</span>
            </div>
            <div className="code-box">
              var name = "{variables.name}";<br />
              console.log(name);<br />
              &#123;<br />
              &nbsp;&nbsp;let age = {variables.age};<br />
              &nbsp;&nbsp;console.log(age);<br />
              &#125;<br />
              const country = "{variables.country}";<br />
              console.log(country);
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title"><Shield size={20} color="#34d399" /> Scope Rules</h2>
              <span className="badge badge-success">ES6 Standard</span>
            </div>
            <table className="results-table">
              <thead><tr><th>Keyword</th><th>Scope</th><th>Outside Block Access</th></tr></thead>
              <tbody>
                <tr><td><code>var</code></td><td>Function/Global</td><td><span className="result-val result-true">✓ Accessible</span></td></tr>
                <tr><td><code>let</code></td><td>Block &#123; &#125;</td><td><span className="result-val result-false">✗ ReferenceError</span></td></tr>
                <tr><td><code>const</code></td><td>Block (Immutable)</td><td><span className="result-val result-true">✓ Locked</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
