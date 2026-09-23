// Controller for JavaScript Data Types & Structures
exports.getDataTypes = async (req, res) => {
  try {
    const primitives = {
      number: { value: 30, type: 'number', typeof: typeof 30 },
      string: { value: 'gokul', type: 'string', typeof: typeof 'gokul' },
      boolean: { value: true, type: 'boolean', typeof: typeof true },
      nullValue: { value: null, type: 'null', typeof: typeof null },
      symbol: { value: 'Symbol(symbol)', type: 'symbol', description: 'Symbol("symbol")' },
      bigInt: { value: '123456789n', type: 'bigint', typeof: 'bigint' },
    };

    const studentObject = {
      firstName: 'Hii',
      age: 30,
      isStudent: true,
      accessDirect: 'student.firstName -> "Hii"',
      accessBracket: 'student["age"] -> 30',
    };

    const fruitsArray = ['Apple', 'Banana', 'Orange'];

    const favoritesFunction = {
      actor: 'jhone',
      player: 'KBD SUDHAKAR',
      movie: 'VISHWASAM',
      formattedText: 'My favorite actor is jhone, my favorite player is KBD SUDHAKAR, and my favorite movie is VISHWASAM.',
    };

    res.json({
      success: true,
      sourceOrigin: 'laddu/.js & datatypes.js',
      data: {
        primitives,
        studentObject,
        fruitsArray,
        favoritesFunction,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
