const mongoose = require('mongoose');

const CalculationHistorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['arithmetic', 'assignment', 'comparison', 'batch_demo'],
      required: true,
    },
    operandA: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    operandB: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    operator: {
      type: String,
      required: true,
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    expression: {
      type: String,
      required: true,
    },
    sourceOrigin: {
      type: String,
      default: 'laddu/opreators.js',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CalculationHistory', CalculationHistorySchema);
