const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Arun',
    },
    age: {
      type: Number,
      default: 20,
    },
    department: {
      type: String,
      default: 'IT',
    },
    collegeName: {
      type: String,
      default: 'VETIAS',
    },
    isStudent: {
      type: Boolean,
      default: true,
    },
    marks: {
      type: [Number],
      default: [80, 90, 70],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', StudentSchema);
