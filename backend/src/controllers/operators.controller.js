const CalculationHistory = require('../models/CalculationHistory');
const { getDBStatus } = require('../config/db');

// In-memory fallback storage
let inMemoryHistory = [];

const calculateArithmetic = (a, b) => {
  const numA = Number(a);
  const numB = Number(b);
  return {
    addition: { expression: `${numA} + ${numB}`, result: numA + numB },
    subtraction: { expression: `${numA} - ${numB}`, result: numA - numB },
    multiplication: { expression: `${numA} * ${numB}`, result: numA * numB },
    division: { expression: `${numA} / ${numB}`, result: numB !== 0 ? numA / numB : 'Infinity' },
    exponentiation: { expression: `${numA} ** ${numB}`, result: numA ** numB },
    modulus: { expression: `${numA} % ${numB}`, result: numA % numB },
  };
};

const calculateAssignment = (initialA, b) => {
  let valA = Number(initialA);
  const numB = Number(b);

  const steps = [];

  // +=
  let step1A = valA;
  step1A += numB;
  steps.push({ operator: '+=', expression: `${valA} += ${numB}`, result: step1A });

  // -=
  let step2A = valA;
  step2A -= numB;
  steps.push({ operator: '-=', expression: `${valA} -= ${numB}`, result: step2A });

  // *=
  let step3A = valA;
  step3A *= numB;
  steps.push({ operator: '*=', expression: `${valA} *= ${numB}`, result: step3A });

  // /=
  let step4A = valA;
  step4A /= numB;
  steps.push({ operator: '/=', expression: `${valA} /= ${numB}`, result: step4A });

  return steps;
};

const calculateComparison = (a, b) => {
  return {
    looseEqual: { expression: `${a} == ${b}`, result: a == b },
    lessThanOrEqual: { expression: `${a} <= ${b}`, result: a <= b },
    greaterThanOrEqual: { expression: `${a} >= ${b}`, result: a >= b },
    notEqual: { expression: `${a} != ${b}`, result: a != b },
    strictEqual: { expression: `${a} === ${b}`, result: a === b },
    strictNotEqual: { expression: `${a} !== ${b}`, result: a !== b },
  };
};

exports.getArithmetic = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 30; // default from laddu/opreators.js
    const b = req.query.b !== undefined ? req.query.b : 38; // default from laddu/opreators.js
    const results = calculateArithmetic(a, b);
    res.json({
      success: true,
      category: 'arithmetic',
      inputs: { a: Number(a), b: Number(b) },
      results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignment = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 20; // default from laddu/opreators.js
    const b = req.query.b !== undefined ? req.query.b : 39; // default from laddu/opreators.js
    const results = calculateAssignment(a, b);
    res.json({
      success: true,
      category: 'assignment',
      inputs: { a: Number(a), b: Number(b) },
      results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getComparison = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 20; // default from laddu/opreators.js
    const b = req.query.b !== undefined ? req.query.b : 40; // default from laddu/opreators.js
    const results = calculateComparison(a, b);
    res.json({
      success: true,
      category: 'comparison',
      inputs: { a, b },
      results,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.runSourceDemo = async (req, res) => {
  try {
    // 1. Arithmetic with a=30, b=38
    const arithmeticSource = calculateArithmetic(30, 38);
    // 2. Assignment with a=20, b=39
    const assignmentSource = calculateAssignment(20, 39);
    // 3. Comparison with a=20, b=40
    const comparisonSource = calculateComparison(20, 40);

    const logOutputs = [
      '// --- ARITHMETIC OPERATORS (a=30, b=38) ---',
      `a + b = ${30 + 38}`,
      `a - b = ${30 - 38}`,
      `a * b = ${30 * 38}`,
      `a / b = ${30 / 38}`,
      `a ** b = ${30 ** 38}`,
      `a % b = ${30 % 38}`,
      '// --- ASSIGNMENT OPERATORS (a=20, b=39) ---',
      `a += b -> ${20 + 39}`,
      `a -= b -> ${20 - 39}`,
      `a *= b -> ${20 * 39}`,
      `a /= b -> ${20 / 39}`,
      '// --- COMPARISON OPERATORS (a=20, b=40) ---',
      `a == b -> ${20 == 40}`,
      `a <= b -> ${20 <= 40}`,
      `a >= b -> ${20 >= 40}`,
      `a != b -> ${20 != 40}`,
    ];

    res.json({
      success: true,
      sourceOrigin: 'laddu/opreators.js (migrated & fixed)',
      data: {
        arithmetic: { inputs: { a: 30, b: 38 }, results: arithmeticSource },
        assignment: { inputs: { a: 20, b: 39 }, results: assignmentSource },
        comparison: { inputs: { a: 20, b: 40 }, results: comparisonSource },
      },
      consoleLogs: logOutputs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveCalculation = async (req, res) => {
  try {
    const { category, operandA, operandB, operator, result, expression } = req.body;
    const dbStatus = getDBStatus();

    const recordData = {
      category: category || 'arithmetic',
      operandA,
      operandB,
      operator,
      result,
      expression,
      sourceOrigin: 'fullstackmearn-interactive',
      createdAt: new Date(),
    };

    if (dbStatus.connected) {
      const saved = await CalculationHistory.create(recordData);
      return res.status(201).json({ success: true, saved, storage: 'mongodb' });
    } else {
      inMemoryHistory.unshift(recordData);
      if (inMemoryHistory.length > 50) inMemoryHistory.pop();
      return res.status(201).json({ success: true, saved: recordData, storage: 'in-memory' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const history = await CalculationHistory.find().sort({ createdAt: -1 }).limit(20);
      return res.json({ success: true, history, storage: 'mongodb' });
    } else {
      return res.json({ success: true, history: inMemoryHistory, storage: 'in-memory' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
