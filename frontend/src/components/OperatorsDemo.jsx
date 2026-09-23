import React, { useState, useEffect } from 'react';
import { Calculator, Play, Plus, Zap, Check } from 'lucide-react';

export default function OperatorsDemo({ onLogMessage }) {
  // Source default values from laddu/opreators.js
  const [arithA, setArithA] = useState(30);
  const [arithB, setArithB] = useState(38);

  const [assignA, setAssignA] = useState(20);
  const [assignB, setAssignB] = useState(39);

  const [compA, setCompA] = useState(20);
  const [compB, setCompB] = useState(40);

  const [logicA, setLogicA] = useState(20);
  const [logicB, setLogicB] = useState(40);

  const [unaryA, setUnaryA] = useState(10);
  const [ternaryA, setTernaryA] = useState(12);
  const [ternaryB, setTernaryB] = useState(13);

  // Quick Adder state (from index2.html / index.html2)
  const [addBox1, setAddBox1] = useState(15);
  const [addBox2, setAddBox2] = useState(25);
  const [addResult, setAddResult] = useState(40);

  const [activeCategory, setActiveCategory] = useState('arithmetic');

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

  // Logical calculations
  const numLogicA = Number(logicA);
  const numLogicB = Number(logicB);
  const logicalResults = [
    { expr: `(${numLogicA} < 0 && ${numLogicB} < 0)`, val: numLogicA < 0 && numLogicB < 0 },
    { expr: `(${numLogicA} < 0 || ${numLogicB} < 0)`, val: numLogicA < 0 || numLogicB < 0 },
    { expr: `!(${numLogicA} < 0)`, val: !(numLogicA < 0) },
    { expr: `(${numLogicA} > 0 && ${numLogicB} > 0)`, val: numLogicA > 0 && numLogicB > 0 },
    { expr: `(${numLogicA} > 0 || ${numLogicB} > 0)`, val: numLogicA > 0 || numLogicB > 0 },
    { expr: `!(${numLogicA} > 0)`, val: !(numLogicA > 0) },
  ];

  const handleQuickAdd = () => {
    const total = Number(addBox1) + Number(addBox2);
    setAddResult(total);
    onLogMessage(`[Quick Calculator (index2.html)] ${addBox1} + ${addBox2} = ${total}`);
  };

  const handleRunAllSourceTests = () => {
    onLogMessage('--- Running Full Suite from opreators.js ---');
    arithmeticResults.forEach((r) => onLogMessage(`Arithmetic: ${r.expr} = ${r.val}`));
    assignmentResults.forEach((r) => onLogMessage(`Assignment: ${r.expr} -> Result: ${r.val}`));
    comparisonResults.forEach((r) => onLogMessage(`Comparison: ${r.expr} -> Result: ${r.val}`));
    logicalResults.forEach((r) => onLogMessage(`Logical: ${r.expr} -> ${r.val}`));
    onLogMessage(`Unary: initial=${unaryA}, a++=${unaryA}, --a=${unaryA}`);
    onLogMessage(`Ternary: (${ternaryA} > ${ternaryB}) ? "a is greater " : "b is greater" -> ${ternaryA > ternaryB ? 'a is greater ' : 'b is greater'}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className={`tab-btn ${activeCategory === 'arithmetic' ? 'active' : ''}`} onClick={() => setActiveCategory('arithmetic')}>
            Arithmetic
          </button>
          <button className={`tab-btn ${activeCategory === 'assignment' ? 'active' : ''}`} onClick={() => setActiveCategory('assignment')}>
            Assignment
          </button>
          <button className={`tab-btn ${activeCategory === 'comparison' ? 'active' : ''}`} onClick={() => setActiveCategory('comparison')}>
            Comparison
          </button>
          <button className={`tab-btn ${activeCategory === 'logical' ? 'active' : ''}`} onClick={() => setActiveCategory('logical')}>
            Logical
          </button>
          <button className={`tab-btn ${activeCategory === 'unary_ternary' ? 'active' : ''}`} onClick={() => setActiveCategory('unary_ternary')}>
            Unary & Ternary
          </button>
          <button className={`tab-btn ${activeCategory === 'quick_adder' ? 'active' : ''}`} onClick={() => setActiveCategory('quick_adder')}>
            DOM Quick Adder (index2.html)
          </button>
        </div>

        <button className="btn btn-primary" onClick={handleRunAllSourceTests}>
          <Play size={16} /> Run Full Suite
        </button>
      </div>

      {/* ARITHMETIC SECTION */}
      {activeCategory === 'arithmetic' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title"><Calculator size={20} color="#38bdf8" /> Arithmetic Operators</h2>
              <span className="badge badge-info">+ - * / ** %</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Operand a (Default: 30)</label>
                <input type="number" className="input-field" value={arithA} onChange={(e) => setArithA(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Operand b (Default: 38)</label>
                <input type="number" className="input-field" value={arithB} onChange={(e) => setArithB(Number(e.target.value))} />
              </div>
            </div>
            <div className="code-box">
              var a = {arithA};<br />
              var b = {arithB};<br />
              console.log(a + b); // {numArithA + numArithB}<br />
              console.log(a - b); // {numArithA - numArithB}<br />
              console.log(a * b); // {numArithA * numArithB}
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Live Results</h2>
              <span className="badge badge-success">Computed</span>
            </div>
            <table className="results-table">
              <thead><tr><th>Operation</th><th>Expression</th><th>Result</th></tr></thead>
              <tbody>
                {arithmeticResults.map((item, idx) => (
                  <tr key={idx}><td><code>{item.op}</code></td><td><code>{item.expr}</code></td><td><span className="result-val result-num">{item.val}</span></td></tr>
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
              <h2 className="card-title"><Calculator size={20} color="#a855f7" /> Assignment Operators</h2>
              <span className="badge badge-info">+= -= *= /=</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Initial a (Default: 20)</label>
                <input type="number" className="input-field" value={assignA} onChange={(e) => setAssignA(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Operand b (Default: 39)</label>
                <input type="number" className="input-field" value={assignB} onChange={(e) => setAssignB(Number(e.target.value))} />
              </div>
            </div>
            <div className="code-box">
              var a = {assignA};<br />
              var b = {assignB};<br />
              a += b; // {tempA1}<br />
              a -= b; // {tempA2}<br />
              a *= b; // {tempA3}
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Assignment Steps</h2>
              <span className="badge badge-success">Computed</span>
            </div>
            <table className="results-table">
              <thead><tr><th>Operator</th><th>Step Expression</th><th>Result</th></tr></thead>
              <tbody>
                {assignmentResults.map((item, idx) => (
                  <tr key={idx}><td><code>{item.op}</code></td><td><code>{item.expr}</code></td><td><span className="result-val result-num">{item.val}</span></td></tr>
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
              <h2 className="card-title"><Calculator size={20} color="#10b981" /> Comparison Operators</h2>
              <span className="badge badge-info">== &lt;= &gt;= != === !==</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Value a (Default: 20)</label>
                <input type="text" className="input-field" value={compA} onChange={(e) => setCompA(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Value b (Default: 40)</label>
                <input type="text" className="input-field" value={compB} onChange={(e) => setCompB(e.target.value)} />
              </div>
            </div>
            <div className="code-box">
              var a = {compA}; var b = {compB};<br />
              console.log(a == b); // {String(compA == compB)}<br />
              console.log(a &lt;= b); // {String(compA <= compB)}<br />
              console.log(a != b); // {String(compA != compB)}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h2 className="card-title">Boolean Outputs</h2><span className="badge badge-success">Evaluated</span></div>
            <table className="results-table">
              <thead><tr><th>Comparison</th><th>Expression</th><th>Boolean</th></tr></thead>
              <tbody>
                {comparisonResults.map((item, idx) => (
                  <tr key={idx}><td><code>{item.op}</code></td><td><code>{item.expr}</code></td><td><span className={`result-val ${item.val ? 'result-true' : 'result-false'}`}>{String(item.val)}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LOGICAL SECTION */}
      {activeCategory === 'logical' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title"><Zap size={20} color="#f59e0b" /> Logical Operators</h2>
              <span className="badge badge-info">&amp;&amp; || !</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Value a</label>
                <input type="number" className="input-field" value={logicA} onChange={(e) => setLogicA(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Value b</label>
                <input type="number" className="input-field" value={logicB} onChange={(e) => setLogicB(Number(e.target.value))} />
              </div>
            </div>
            <div className="code-box">
              console.log(a &gt; 0 &amp;&amp; b &gt; 0); // {String(numLogicA > 0 && numLogicB > 0)}<br />
              console.log(a &lt; 0 || b &lt; 0); // {String(numLogicA < 0 || numLogicB < 0)}<br />
              console.log(!(a &gt; 0)); // {String(!(numLogicA > 0))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h2 className="card-title">Logical Results</h2><span className="badge badge-success">Evaluated</span></div>
            <table className="results-table">
              <thead><tr><th>Expression</th><th>Result</th></tr></thead>
              <tbody>
                {logicalResults.map((item, idx) => (
                  <tr key={idx}><td><code>{item.expr}</code></td><td><span className={`result-val ${item.val ? 'result-true' : 'result-false'}`}>{String(item.val)}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* UNARY & TERNARY */}
      {activeCategory === 'unary_ternary' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header"><h2 className="card-title">Unary Operators</h2><span className="badge badge-info">a++ a-- ++a --a</span></div>
            <div className="form-group">
              <label>Initial a (Default: 10)</label>
              <input type="number" className="input-field" value={unaryA} onChange={(e) => setUnaryA(Number(e.target.value))} />
            </div>
            <div className="code-box">
              var a = {unaryA};<br />
              console.log(a++); // returns {unaryA}, then becomes {unaryA + 1}<br />
              console.log(--a); // decrements and returns {unaryA}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><h2 className="card-title">Ternary Operator</h2><span className="badge badge-info">condition ? expr1 : expr2</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group"><label>Value a</label><input type="number" className="input-field" value={ternaryA} onChange={(e) => setTernaryA(Number(e.target.value))} /></div>
              <div className="form-group"><label>Value b</label><input type="number" className="input-field" value={ternaryB} onChange={(e) => setTernaryB(Number(e.target.value))} /></div>
            </div>
            <div className="code-box">
              var result = ({ternaryA} &gt; {ternaryB}) ? "a is greater " : "b is greater";<br />
              // Result: <span style={{ color: '#34d399' }}>"{ternaryA > ternaryB ? 'a is greater ' : 'b is greater'}"</span>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ADDER (index2.html) */}
      {activeCategory === 'quick_adder' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title"><Plus size={20} color="#38bdf8" /> DOM Quick Input Calculator (from index2.html & index.html2)</h2>
            <span className="badge badge-info">DOM Manipulation</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Direct interactive implementation of the DOM number adder from <code>source_laddu/index2.html</code>:
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <input id="num1" type="number" className="input-field" style={{ width: '120px' }} value={addBox1} onChange={(e) => setAddBox1(Number(e.target.value))} placeholder="num1" />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>+</span>
            <input id="num2" type="number" className="input-field" style={{ width: '120px' }} value={addBox2} onChange={(e) => setAddBox2(Number(e.target.value))} placeholder="num2" />
            <button className="btn btn-primary" onClick={handleQuickAdd}>Add</button>
          </div>
          <div style={{ padding: '0.75rem 1rem', background: '#090d16', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p id="result" style={{ fontSize: '1.125rem', fontWeight: 600, color: '#34d399' }}>
              Result: {addResult}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
