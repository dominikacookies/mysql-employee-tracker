const generateChoices = (array, itemName, value) => {
  return array.map((row) => {
    return {
      name: row[itemName],
      value: row[value],
    };
  });
};

module.exports = generateChoices