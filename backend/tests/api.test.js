process.env.NODE_ENV = 'test';
const http = require('http');
const app = require('../src/server');

const PORT = 5055;

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const options = {
      hostname: '127.0.0.1',
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  const server = app.listen(PORT, async () => {
    console.log(`[TestRunner] Test server listening on port ${PORT}...`);
    let passed = 0;
    let failed = 0;

    try {
      // Test 1: Health check
      console.log('Testing /api/health...');
      const health = await makeRequest('/api/health');
      if (health.status === 200 && health.body.status === 'ok') {
        console.log('PASS: /api/health');
        passed++;
      } else {
        console.error('FAIL: /api/health', health);
        failed++;
      }

      // Test 2: Source Operators Demo
      console.log('Testing /api/operators/demo...');
      const opsDemo = await makeRequest('/api/operators/demo');
      if (
        opsDemo.status === 200 &&
        opsDemo.body.data.arithmetic.results.addition.result === 68 &&
        opsDemo.body.data.comparison.results.notEqual.result === true
      ) {
        console.log('PASS: /api/operators/demo matches source computations (30+38=68, 20!=40 is true)');
        passed++;
      } else {
        console.error('FAIL: /api/operators/demo', opsDemo);
        failed++;
      }

      // Test 3: Variables endpoint
      console.log('Testing /api/variables...');
      const vars = await makeRequest('/api/variables');
      if (vars.status === 200 && vars.body.data.name === 'gokul' && vars.body.data.age === 19) {
        console.log('PASS: /api/variables correctly returns { name: "gokul", age: 19, country: "india" }');
        passed++;
      } else {
        console.error('FAIL: /api/variables', vars);
        failed++;
      }

      // Test 4: Scope test endpoint
      console.log('Testing /api/variables/scope-test...');
      const scope = await makeRequest('/api/variables/scope-test');
      if (scope.status === 200 && scope.body.simulation.globalOrOuterScope.ageAccessibleOutsideBlock === false) {
        console.log('PASS: /api/variables/scope-test correctly verifies block scope isolation');
        passed++;
      } else {
        console.error('FAIL: /api/variables/scope-test', scope);
        failed++;
      }

      // Test 5: Arithmetic endpoint with parameters
      console.log('Testing /api/operators/arithmetic?a=50&b=25...');
      const arith = await makeRequest('/api/operators/arithmetic?a=50&b=25');
      if (arith.status === 200 && arith.body.results.division.result === 2) {
        console.log('PASS: /api/operators/arithmetic dynamic query (50/25=2)');
        passed++;
      } else {
        console.error('FAIL: /api/operators/arithmetic', arith);
        failed++;
      }

      console.log(`\n=====================================`);
      console.log(`API Verification Suite: ${passed} Passed, ${failed} Failed`);
      console.log(`=====================================\n`);
    } catch (err) {
      console.error('[TestRunner] Unexpected error:', err);
      failed++;
    } finally {
      server.close(() => {
        process.exit(failed === 0 ? 0 : 1);
      });
    }
  });
}

runTests();
