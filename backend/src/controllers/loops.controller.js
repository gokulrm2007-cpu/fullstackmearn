// Controller for Loops & Conditionals (from lopping.js & conditional.js)
exports.getLoopsDemo = async (req, res) => {
  try {
    const number = Number(req.query.number) || 2;
    const limit = Number(req.query.limit) || 10;

    // For loop multiplication table
    const forLoopResults = [];
    for (let i = 1; i <= limit; i++) {
      forLoopResults.push({ step: i, expression: `${number} x ${i}`, result: number * i });
    }

    // While loop multiplication table
    const whileLoopResults = [];
    let w = 1;
    while (w <= limit) {
      whileLoopResults.push({ step: w, expression: `${number} x ${w}`, result: number * w });
      w++;
    }

    // Do-while loop simulation (count = 6; do { ... count++ } while (count <= 5))
    let doWhileCount = 6;
    const doWhileLogs = [];
    do {
      doWhileLogs.push(`Executed at least once with count = ${doWhileCount}`);
      doWhileCount++;
    } while (doWhileCount <= 5);
    doWhileLogs.push(`Outside do..while loop (final count = ${doWhileCount})`);

    // Traffic signal switch-case simulation (conditional.js)
    const trafficSignals = ['green', 'yellow', 'red', 'White'].map((signal) => {
      let action = '';
      switch (signal.toLowerCase()) {
        case 'green':
          action = 'go!';
          break;
        case 'yellow':
          action = 'Wait!';
          break;
        case 'red':
          action = 'stop!';
          break;
        default:
          action = 'Invalid color light';
      }
      return { signal, action };
    });

    // Score grading simulation (function.js)
    const gradeEvaluator = (score) => ({
      score,
      grade: score >= 90 ? 'Grade: A' : 'Grade: B or below',
    });

    res.json({
      success: true,
      sourceOrigin: 'laddu/lopping.js & conditional.js',
      data: {
        number,
        limit,
        forLoopResults,
        whileLoopResults,
        doWhileLogs,
        trafficSignals,
        sampleGrades: [gradeEvaluator(95), gradeEvaluator(75)],
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
