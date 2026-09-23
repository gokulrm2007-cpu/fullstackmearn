const mongoose = require('mongoose');

const VariableRecordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'gokul',
    },
    age: {
      type: Number,
      required: true,
      default: 19,
    },
    country: {
      type: String,
      required: true,
      default: 'india',
    },
    declarationTypes: {
      nameType: { type: String, default: 'var' },
      ageType: { type: String, default: 'let' },
      countryType: { type: String, default: 'const' },
    },
    scopeContext: {
      type: String,
      default: 'Global & Block Scope Demo (from laddu/variable.js)',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('VariableRecord', VariableRecordSchema);
