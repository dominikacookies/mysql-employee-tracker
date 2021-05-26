const generateChoices = (array, itemName) => {
  return array.map((row) => {
    return {
      name: row[itemName],
      value: row.id,
    };
  });
};

module.exports = generateChoices