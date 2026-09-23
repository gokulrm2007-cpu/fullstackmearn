import React, { useState, useEffect } from 'react';
import { Calculator, Play, Server, Clock, Check, ArrowRight } from 'lucide-react';

export default function OperatorsDemo({ onLogMessage }) {
  // Source default values from laddu/opreators.js
  const [arithA, setArithA] = useState(30);
  const [arithB, setArithB] = useState(38);

  const [assignA, setAssignA] = useState(20);
  const [assignB, setAssignB] = useState(39);

  const [compA, setCompA] = useState(20);
  const [compB, setCompB] = useState(40);

  const [history, setHistory] = useState([]);
  const [activeCategory, setActiveCategory] = useState('arithmetic');

  // Load backend calculation history
  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/operators/history');
      if (res.ok) {
        const data = await res.json();
        if (data.history) setHistory(data.history);
      }
    } catch {
      // Backend not running yet
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Arithmetic calculations
  const numArithA = Number(arithA);
  const numArithB = Number(arithB);
  const arithmeticResults = [
    { op: '+', name: 'Addition', expr: `${numArithA} + ${numArithB}`, val: numArithA + numArithB },
    { op: '-', name: 'Subtraction', expr: `${numArithA} - ${numArithB}`, val: numArithA - numArithB },
    { op: '*', name: 'Multiplication', expr: `${numArithA} * ${numArithB}`, val: numArithA * numArithB },
    { op: '/', name: 'Division', expr: `${numArithA} / ${numArithB}`, val: numArithB !== 0 ? (numArithA / numArithB).toFixed(4) : 'Infinity' },
    { op: '**', name: 'Exponentiation', expr: `${numArithA} ** ${numArithB}`, val: (numArithA ** numArithB).toExponential(3) },
    { op: '%', name: 'Modulus', expr: `${numArithA} % ${numArithB}`, val: numArithA % numArithB },
  ];

  // Assignment calculations
  const numAssignA = Number(assignA);
  const numAssignB = Number(assignB);
  let tempA1 = numAssignA; tempA1 += numAssignB;
  let tempA2 = numAssignA; tempA2 -= numAssignB;
  let tempA3 = numAssignA; tempA3 *= numAssignB;
  let tempA4 = numAssignA; tempA4 /= numAssignB;

  const assignmentResults = [
    { op: '+=', name: 'Add and assign', expr: `a += ${numAssignB} (starts at ${numAssignA})`, val: tempA1 },
    { op: '-=', name: 'Subtract and assign', expr: `a -= ${numAssignB} (starts at ${numAssignA})`, val: tempA2 },
    { op: '*=', name: 'Multiply and assign', expr: `a *= ${numAssignB} (starts at ${numAssignA})`, val: tempA3 },
    { op: '/=', name: 'Divide and assign', expr: `a /= ${numAssignB} (starts at ${numAssignA})`, val: tempA4.toFixed(4) },
  ];

  // Comparison calculations
  const comparisonResults = [
    { op: '==', name: 'Loose Equality', expr: `${compA} == ${compB}`, val: compA == compB },
    { op: '<=', name: 'Less than or Equal', expr: `${compA} <= ${compB}`, val: compA <= compB },
    { op: '>=', name: 'Greater than or Equal', expr: `${compA} >= ${compB}`, val: compA >= compB },
    { op: '!=', name: 'Not Equal', expr: `${compA} != ${compB}`, val: compA != compB },
    { op: '===', name: 'Strict Equality', expr: `${compA} === ${compB}`, val: compA === compB },
    { op: '!==', name: 'Strict Not Equal', expr: `${compA} !== ${compB}`, val: compA !== compB },
  ];

  const handleRunAllSourceTests = async () => {
    onLogMessage('--- Running Full Suite from opreators.js ---');
    arithmeticResults.forEach(r => onLogMessage(`Arithmetic: ${r.expr} = ${r.val}`));
    assignmentResults.forEach(r => onLogMessage(`Assignment: ${r.expr} -> Result: ${r.val}`));
    comparisonResults.forEach(r => onLogMessage(`Comparison: ${r.expr} -> Result: ${r.val}`));

    // Save batch demo to backend
    try {
      await fetch('/api/operators/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'batch_demo',
          operandA: 30,
          operandB: 38,
          operator: 'FULL_SUITE',
          result: 'All 16 operator checks executed successfully',
          expression: 'Source suite run (laddu/opreators.js)',
        }),
      });
      fetchHistory();
    } catch {
      // Backend not connected
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`tab-btn ${activeCategory === 'arithmetic' ? 'active' : ''}`}
            onClick={() => setActiveCategory('arithmetic')}
          >
            Arithmetic Operators
          </button>
          <button
            className={`tab-btn ${activeCategory === 'assignment' ? 'active' : ''}`}
            onClick={() => setActiveCategory('assignment')}
          >
            Assignment Operators
          </button>
          <button
            className={`tab-btn ${activeCategory === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveCategory('comparison')}
          >
            Comparison Operators
          </button>
        </div>

        <button className="btn btn-primary" onClick={handleRunAllSourceTests}>
          <Play size={16} /> Run Full Source Suite (Console Logs)
        </button>
      </div>

      {/* ARITHMETIC SECTION */}
      {activeCategory === 'arithmetic' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <Calculator size={20} color="#38bdf8" />
                Arithmetic Operators (Source: <code>a=30, b=38</code>)
              </h2>
              <span className="badge badge-info">+ - * / ** %</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Operand a (Source default: 30)</label>
                <input
                  type="number"
                  className="input-field"
                  value={arithA}
                  onChange={(e) => setArithA(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Operand b (Source default: 38)</label>
                <input
                  type="number"
                  className="input-field"
                  value={arithB}
                  onChange={(e) => setArithB(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="code-box">
              /* Source code from laddu/opreators.js */<br />
              var a = {arithA}<br />
              var b = {arithB}<br />
              console.log(a + b)&nbsp;&nbsp;// Addition<br />
              console.log(a - b)&nbsp;&nbsp;// Subtraction<br />
              console.log(a * b)&nbsp;&nbsp;// Multiplication<br />
              console.log(a / b)&nbsp;&nbsp;// Division<br />
              console.log(a ** b)&nbsp;// Exponentiation<br />
              console.log(a % b)&nbsp;&nbsp;// Modulus
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Live Computation Results</h2>
              <span className="badge badge-success">Evaluated</span>
            </div>

            <table className="results-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Expression</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {arithmeticResults.map((item, idx) => (
                  <tr key={idx}>
                    <td><code>{item.op}</code> ({item.name})</td>
                    <td><code>{item.expr}</code></td>
                    <td><span className="result-val result-num">{item.val}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ASSIGNMENT SECTION */}
      {activeCategory === 'assignment' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <Calculator size={20} color="#a855f7" />
                Assignment Operators (Source: <code>a=20, b=39</code>)
              </h2>
              <span className="badge badge-info">+= -= *= /=</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Initial a (Source default: 20)</label>
                <input
                  type="number"
                  className="input-field"
                  value={assignA}
                  onChange={(e) => setAssignA(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Operand b (Source default: 39)</label>
                <input
                  type="number"
                  className="input-field"
                  value={assignB}
                  onChange={(e) => setAssignB(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="code-box">
              /* Source code from laddu/opreators.js */<br />
              var a = {assignA}<br />
              var b = {assignB}<br />
              console.log(a += b)&nbsp;// Addition Assignment<br />
              console.log(a -= b)&nbsp;// Subtraction Assignment<br />
              console.log(a *= b)&nbsp;// Multiplication Assignment<br />
              console.log(a /= b)&nbsp;// Division Assignment
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Assignment Results</h2>
              <span className="badge badge-success">Evaluated</span>
            </div>

            <table className="results-table">
              <thead>
                <tr>
                  <th>Operator</th>
                  <th>Step Expression</th>
                  <th>Resulting a</th>
                </tr>
              </thead>
              <tbody>
                {assignmentResults.map((item, idx) => (
                  <tr key={idx}>
                    <td><code>{item.op}</code></td>
                    <td><code>{item.expr}</code></td>
                    <td><span className="result-val result-num">{item.val}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COMPARISON SECTION */}
      {activeCategory === 'comparison' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <Calculator size={20} color="#10b981" />
                Comparison Operators (Source: <code>a=20, b=40</code>)
              </h2>
              <span className="badge badge-info">== &lt;= &gt;= !=</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Value a (Source default: 20)</label>
                <input
                  type="text"
                  className="input-field"
                  value={compA}
                  onChange={(e) => setCompA(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Value b (Source default: 40)</label>
                <input
                  type="text"
                  className="input-field"
                  value={compB}
                  onChange={(e) => setCompB(e.target.value)}
                />
              </div>
            </div>

            <div className="code-box">
              /* Source code from laddu/opreators.js */<br />
              var a = {compA}<br />
              var b = {compB}<br />
              console.log(a == b)&nbsp;&nbsp;// Equality<br />
              console.log(a &lt;= b)&nbsp;&nbsp;// Less than or equal<br />
              console.log(a &gt;= b)&nbsp;&nbsp;// Greater than or equal<br />
              console.log(a != b)&nbsp;&nbsp;// Inequality
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Boolean Evaluation</h2>
              <span className="badge badge-success">Evaluated</span>
            </div>

            <table className="results-table">
              <thead>
                <tr>
                  <th>Comparison</th>
                  <th>Evaluation</th>
                  <th>Boolean Result</th>
                </tr>
              </thead>
              <tbody>
                {comparisonResults.map((item, idx) => (
                  <tr key={idx}>
                    <td><code>{item.op}</code> ({item.name})</td>
                    <td><code>{item.expr}</code></td>
                    <td>
                      <span className={`result-val ${item.val ? 'result-true' : 'result-false'}`}>
                        {String(item.val)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
