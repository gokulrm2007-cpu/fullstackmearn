const Student = require('../models/Student');
const { getDBStatus } = require('../config/db');

let inMemoryStudents = [
  { id: 1, name: 'Arun', age: 20, department: 'IT', collegeName: 'VETIAS', isStudent: true, marks: [80, 90, 70] },
  { id: 2, name: 'Priya', age: 21, department: 'CS', collegeName: 'VETIAS', isStudent: true, marks: [85, 95, 90] },
  { id: 3, name: 'Devadharshini', age: 20, department: 'ECE', collegeName: 'VETIAS', isStudent: true, marks: [75, 88, 92] },
];

// 1. ES6 Demonstration Data
exports.getES6Demo = async (req, res) => {
  try {
    const collegeName = 'VETIAS';
    const studentName = 'Arun';
    const templateLiteral = `Welcome ${studentName} to ${collegeName}`;

    const studentObj = { name: 'Arun', age: 20, department: 'IT' };
    const { name, age, department } = studentObj;

    const baseStudents = ['Arun', 'Priya', 'Devadharshini'];
    const updatedStudents = [...baseStudents, 'Rahul'];

    // Rest parameter simulation
    const maximumMarks = (...marks) => Math.max(...marks);
    const max = maximumMarks(80, 90, 70);

    res.json({
      success: true,
      sourceOrigin: 'laddu/es6.js',
      data: {
        templateLiteral,
        destructuring: { name, age, department },
        spreadArray: updatedStudents,
        restMaxMarks: { marks: [80, 90, 70], max },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Async/Await & Promise Simulation
exports.getAsyncStudent = async (req, res) => {
  try {
    // Simulating the 3-second delay promise from async-await.html & promise.html
    const delay = Number(req.query.delay) || 500; // default 500ms for quick API response
    const studentName = req.query.name || 'Arun';

    const loadStudentPromise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            name: studentName,
            status: 'Student loaded successfully',
            timestamp: new Date().toISOString(),
          });
        }, delay);
      });

    const result = await loadStudentPromise();
    res.json({
      success: true,
      sourceOrigin: 'laddu/async-await.html & promise.html',
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Mock External Fetch / JSONPlaceholder proxy
exports.getFetchMock = async (req, res) => {
  try {
    res.json({
      id: 1,
      name: 'Leanne Graham (Sample Student)',
      username: 'Bret',
      email: 'Sincere@april.biz',
      source: 'Mock JSONPlaceholder API (fech-app.html)',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Students CRUD
exports.getAllStudents = async (req, res) => {
  try {
    const dbStatus = getDBStatus();
    if (dbStatus.connected) {
      const students = await Student.find();
      if (students.length > 0) return res.json({ success: true, students, storage: 'mongodb' });
    }
    return res.json({ success: true, students: inMemoryStudents, storage: 'in-memory' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, age, department, marks } = req.body;
    const dbStatus = getDBStatus();

    const newStudent = {
      name: name || 'Rahul',
      age: Number(age) || 20,
      department: department || 'IT',
      collegeName: 'VETIAS',
      isStudent: true,
      marks: marks || [80, 90, 70],
    };

    if (dbStatus.connected) {
      const created = await Student.create(newStudent);
      return res.status(201).json({ success: true, student: created, storage: 'mongodb' });
    } else {
      const studentWithId = { id: Date.now(), ...newStudent };
      inMemoryStudents.push(studentWithId);
      return res.status(201).json({ success: true, student: studentWithId, storage: 'in-memory' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
