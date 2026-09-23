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
      // 1. Health check
      console.log('Testing /api/health...');
      const health = await makeRequest('/api/health');
      if (health.status === 200 && health.body.status === 'ok') {
        console.log('PASS: /api/health');
        passed++;
      } else {
        console.error('FAIL: /api/health', health);
        failed++;
      }

      // 2. Operators full demo
      console.log('Testing /api/operators/demo...');
      const ops = await makeRequest('/api/operators/demo');
      if (ops.status === 200 && ops.body.data.arithmetic.addition.result === 68 && ops.body.data.logical.andPositive.result === true) {
        console.log('PASS: /api/operators/demo (arithmetic + logical + ternary)');
        passed++;
      } else {
        console.error('FAIL: /api/operators/demo', ops);
        failed++;
      }

      // 3. Variables
      console.log('Testing /api/variables...');
      const vars = await makeRequest('/api/variables');
      if (vars.status === 200 && vars.body.data.name === 'gokul') {
        console.log('PASS: /api/variables');
        passed++;
      } else {
        console.error('FAIL: /api/variables', vars);
        failed++;
      }

      // 4. DataTypes
      console.log('Testing /api/datatypes...');
      const dtypes = await makeRequest('/api/datatypes');
      if (dtypes.status === 200 && dtypes.body.data.primitives.number.value === 30 && dtypes.body.data.studentObject.firstName === 'Hii') {
        console.log('PASS: /api/datatypes (primitives & student object)');
        passed++;
      } else {
        console.error('FAIL: /api/datatypes', dtypes);
        failed++;
      }

      // 5. Loops
      console.log('Testing /api/loops...');
      const loops = await makeRequest('/api/loops?number=2&limit=5');
      if (loops.status === 200 && loops.body.data.forLoopResults.length === 5 && loops.body.data.trafficSignals.length === 4) {
        console.log('PASS: /api/loops (multiplication table & switch-case traffic lights)');
        passed++;
      } else {
        console.error('FAIL: /api/loops', loops);
        failed++;
      }

      // 6. ES6 & Async
      console.log('Testing /api/students/es6...');
      const es6 = await makeRequest('/api/students/es6');
      if (es6.status === 200 && es6.body.data.restMaxMarks.max === 90) {
        console.log('PASS: /api/students/es6 (spread, rest, destructuring)');
        passed++;
      } else {
        console.error('FAIL: /api/students/es6', es6);
        failed++;
      }

      // 7. Async student endpoint
      console.log('Testing /api/students/async-demo?delay=50...');
      const asyncStudent = await makeRequest('/api/students/async-demo?delay=50');
      if (asyncStudent.status === 200 && asyncStudent.body.result.name === 'Arun') {
        console.log('PASS: /api/students/async-demo (promise & async/await resolution)');
        passed++;
      } else {
        console.error('FAIL: /api/students/async-demo', asyncStudent);
        failed++;
      }

      console.log(`\n=====================================`);
      console.log(`Extended API Test Suite: ${passed} Passed, ${failed} Failed`);
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
