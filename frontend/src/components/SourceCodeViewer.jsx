import React, { useState } from 'react';
import { FileCode, GitCompare, CheckCircle } from 'lucide-react';

const sourceFiles = [
  {
    name: 'opreators.js (Source)',
    fixedName: 'operators.js (Migrated & Cleaned)',
    language: 'javascript',
    originalCode: `/*var a =30
var b =38
console.log(a+b)
console.log(a-b)
console.log(a*b)
console.log(a/b)
console.log(a**b)
console.log(a%b)
*/
//assignment operator
/*var a =20

var b =39
console.log(a+=b)
console.log(a-=b)
console.log(a*=b)
console.log(a/=b)*/
//comparison operatore
var a=20
var b=40
console.log(a==b)
console.log(a<=b)
console.log(a>=b)
console.log(a!=b)`,
    notes: [
      'Fixed spelling from "opreators.js" and "comparison operatore".',
      'Uncommented and made all three sections (arithmetic, assignment, comparison) interactive.',
      'Added full backend API endpoints: /api/operators/arithmetic, /api/operators/assignment, /api/operators/comparison.',
      'Created Mongoose model CalculationHistory for optional database persistence.',
    ],
  },
  {
    name: 'variable.js (Source)',
    fixedName: 'variable.js & Variables Controller',
    language: 'javascript',
    originalCode: `var name= "gokul"
console.log(name) 
{
let age=19
    console.log(age)
}
 const country="india"
 console.log(country)`,
    notes: [
      'Preserved variable identifiers (name="gokul", age=19, country="india").',
      'Preserved scoping mechanics: var (global/function), let (block), const (immutable block).',
      'Created backend API routes: /api/variables and /api/variables/scope-test.',
      'Created Mongoose model VariableRecord for MongoDB persistence.',
    ],
  },
  {
    name: 'index.html (Source)',
    fixedName: 'index.html (Migrated to React/Vite)',
    language: 'html',
    originalCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`,
    notes: [
      'Fixed malformed meta viewport tag ("width=," -> "width=device-width, initial-scale=1.0").',
      'Integrated modern React SPA frontend with custom glassmorphism styling.',
      'Connected frontend to Express backend via Vite proxy and CORS.',
    ],
  },
];

export default function SourceCodeViewer() {
  const [selectedFile, setSelectedFile] = useState(sourceFiles[0]);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <GitCompare size={20} color="#818cf8" />
          Source Code Migration & Difference Matrix
        </h2>
        <span className="badge badge-info">Source Traceability</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {sourceFiles.map((file, idx) => (
          <button
            key={idx}
            className={`tab-btn ${selectedFile.name === file.name ? 'active' : ''}`}
            onClick={() => setSelectedFile(file)}
          >
            <FileCode size={16} /> {file.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 0 }}>
        <div>
          <h3 style={{ fontSize: '0.9375rem', color: '#f43f5e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            Original File Content ({selectedFile.name})
          </h3>
          <pre className="code-box" style={{ minHeight: '260px', color: '#e2e8f0' }}>
            {selectedFile.originalCode}
          </pre>
        </div>

        <div>
          <h3 style={{ fontSize: '0.9375rem', color: '#34d399', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <CheckCircle size={16} /> Migration & Improvements
          </h3>
          <div style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', minHeight: '260px' }}>
            <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
              Target: {selectedFile.fixedName}
            </div>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#94a3b8', lineHeight: '1.8' }}>
              {selectedFile.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
