const generateChoices = (array, keyName, value) => {
  return array.map((row) => {
    return {
      name: row[keyName],
      value: row[value],
    };
  });
};

module.exports = generateChoices