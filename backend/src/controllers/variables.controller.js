const VariableRecord = require('../models/VariableRecord');
const { getDBStatus } = require('../config/db');

// In-memory fallback
let currentVariableState = {
  name: 'gokul',
  age: 19,
  country: 'india',
  declarationTypes: {
    nameType: 'var (function/global scope)',
    ageType: 'let (block scope: { let age = 19 })',
    countryType: 'const (block scope, re-assignment locked)',
  },
  sourceOrigin: 'laddu/variable.js',
  lastUpdated: new Date(),
};

exports.getVariables = async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    let data = currentVariableState;

    if (dbStatus.connected) {
      const latest = await VariableRecord.findOne().sort({ createdAt: -1 });
      if (latest) {
        data = {
          name: latest.name,
          age: latest.age,
          country: latest.country,
          declarationTypes: latest.declarationTypes,
          sourceOrigin: 'laddu/variable.js (MongoDB stored)',
          lastUpdated: latest.updatedAt,
        };
      }
    }

    res.json({
      success: true,
      data,
      scopeExplanation: [
        {
          variable: 'name',
          declaredAs: 'var name = "gokul"',
          scope: 'Global / Function Scope',
          note: 'Accessible throughout the enclosing context and hoisted with undefined.',
        },
        {
          variable: 'age',
          declaredAs: 'let age = 19',
          scope: 'Block Scope',
          note: 'Enclosed inside { let age = 19; console.log(age) }, not accessible outside its block.',
        },
        {
          variable: 'country',
          declaredAs: 'const country = "india"',
          scope: 'Block Scope (Constant)',
          note: 'Read-only identifier binding; cannot be reassigned once declared.',
        },
      ],
      consoleLogs: [
        'name: "gokul"',
        'age (inside block): 19',
        'country: "india"',
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVariables = async (req, res) => {
  try {
    const { name, age, country } = req.body;
    const dbStatus = getDBStatus();

    if (name !== undefined) currentVariableState.name = String(name);
    if (age !== undefined) currentVariableState.age = Number(age);
    if (country !== undefined) currentVariableState.country = String(country);
    currentVariableState.lastUpdated = new Date();

    if (dbStatus.connected) {
      const saved = await VariableRecord.create({
        name: currentVariableState.name,
        age: currentVariableState.age,
        country: currentVariableState.country,
      });
      return res.json({ success: true, updated: saved, storage: 'mongodb' });
    }

    return res.json({ success: true, updated: currentVariableState, storage: 'in-memory' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.testScope = async (req, res) => {
  try {
    // Simulating the block scope execution from variable.js:
    // var name = "gokul"
    // { let age = 19 }
    // const country = "india"

    const simulation = {
      globalOrOuterScope: {
        name: currentVariableState.name,
        country: currentVariableState.country,
        ageAccessibleOutsideBlock: false,
        outsideBlockError: 'ReferenceError: age is not defined outside block scope { ... }',
      },
      innerBlockScope: {
        name: currentVariableState.name,
        age: currentVariableState.age,
        country: currentVariableState.country,
        allAccessible: true,
      },
      immutabilityTest: {
        attemptedConstReassign: 'country = "other"',
        result: 'TypeError: Assignment to constant variable.',
      },
    };

    res.json({ success: true, simulation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
