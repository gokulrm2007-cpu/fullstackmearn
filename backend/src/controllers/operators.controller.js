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

const calculateLogical = (a, b) => {
  const numA = Number(a);
  const numB = Number(b);
  return {
    andNegative: { expression: `(${numA} < 0 && ${numB} < 0)`, result: numA < 0 && numB < 0 },
    orNegative: { expression: `(${numA} < 0 || ${numB} < 0)`, result: numA < 0 || numB < 0 },
    notANegative: { expression: `!(${numA} < 0)`, result: !(numA < 0) },
    andPositive: { expression: `(${numA} > 0 && ${numB} > 0)`, result: numA > 0 && numB > 0 },
    orPositive: { expression: `(${numA} > 0 || ${numB} > 0)`, result: numA > 0 || numB > 0 },
    notAPositive: { expression: `!(${numA} > 0)`, result: !(numA > 0) },
  };
};

const calculateUnary = (initialA) => {
  let val = Number(initialA);
  const postInc = val++; // evaluates to old val, then increments
  const postDec = val--; // evaluates to incremented, then decrements
  const preInc = ++val;  // increments first
  const preDec = --val;  // decrements first

  return {
    initial: Number(initialA),
    postIncrement: { expression: `a++ (with a=${Number(initialA)})`, result: Number(initialA), finalA: Number(initialA) + 1 },
    postDecrement: { expression: `a-- (after post-increment)`, result: Number(initialA) + 1, finalA: Number(initialA) },
    preIncrement: { expression: `++a`, result: Number(initialA) + 1, finalA: Number(initialA) + 1 },
    preDecrement: { expression: `--a`, result: Number(initialA), finalA: Number(initialA) },
  };
};

const calculateTernary = (a, b) => {
  const numA = Number(a);
  const numB = Number(b);
  const condition = numA > numB;
  const result = condition ? 'a is greater ' : 'b is greater';
  return {
    expression: `(${numA} > ${numB}) ? "a is greater " : "b is greater"`,
    condition,
    result,
  };
};

exports.getArithmetic = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 30;
    const b = req.query.b !== undefined ? req.query.b : 38;
    const results = calculateArithmetic(a, b);
    res.json({ success: true, category: 'arithmetic', inputs: { a: Number(a), b: Number(b) }, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignment = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 20;
    const b = req.query.b !== undefined ? req.query.b : 39;
    const results = calculateAssignment(a, b);
    res.json({ success: true, category: 'assignment', inputs: { a: Number(a), b: Number(b) }, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getComparison = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 20;
    const b = req.query.b !== undefined ? req.query.b : 40;
    const results = calculateComparison(a, b);
    res.json({ success: true, category: 'comparison', inputs: { a, b }, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLogical = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 20;
    const b = req.query.b !== undefined ? req.query.b : 40;
    const results = calculateLogical(a, b);
    res.json({ success: true, category: 'logical', inputs: { a: Number(a), b: Number(b) }, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUnary = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 10;
    const results = calculateUnary(a);
    res.json({ success: true, category: 'unary', inputs: { a: Number(a) }, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTernary = async (req, res) => {
  try {
    const a = req.query.a !== undefined ? req.query.a : 12;
    const b = req.query.b !== undefined ? req.query.b : 13;
    const results = calculateTernary(a, b);
    res.json({ success: true, category: 'ternary', inputs: { a: Number(a), b: Number(b) }, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.runSourceDemo = async (req, res) => {
  try {
    const arithmetic = calculateArithmetic(30, 38);
    const assignment = calculateAssignment(20, 39);
    const comparison = calculateComparison(20, 40);
    const logical = calculateLogical(20, 40);
    const unary = calculateUnary(10);
    const ternary = calculateTernary(12, 13);

    const logOutputs = [
      '// --- ARITHMETIC (a=30, b=38) ---',
      `30 + 38 = 68`,
      `30 - 38 = -8`,
      `30 * 38 = 1140`,
      `30 / 38 = ${(30/38).toFixed(4)}`,
      `30 ** 38 = ${(30**38).toExponential(3)}`,
      `30 % 38 = 30`,
      '// --- ASSIGNMENT (a=20, b=39) ---',
      `a += b -> 59`,
      `a -= b -> -19`,
      `a *= b -> 780`,
      `a /= b -> ${(20/39).toFixed(4)}`,
      '// --- COMPARISON (a=20, b=40) ---',
      `20 == 40 -> false`,
      `20 <= 40 -> true`,
      `20 >= 40 -> false`,
      `20 != 40 -> true`,
      '// --- LOGICAL (a=20, b=40) ---',
      `20 > 0 && 40 > 0 -> true`,
      `20 < 0 || 40 < 0 -> false`,
      `!(20 > 0) -> false`,
      '// --- UNARY (a=10) ---',
      `a++ -> 10, a-- -> 11, ++a -> 11, --a -> 10`,
      '// --- TERNARY (a=12, b=13) ---',
      `(12 > 13) ? "a is greater " : "b is greater" -> "b is greater"`,
    ];

    res.json({
      success: true,
      sourceOrigin: 'laddu/opreators.js (full updated suite)',
      data: { arithmetic, assignment, comparison, logical, unary, ternary },
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
