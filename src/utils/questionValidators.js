const validateAnswerLength = (answer, numberOfChars = 30) => {
  if (answer.length > numberOfChars) {
    return "Please enter a title that's shorter than 30 characters."
  } else {
    return true
  }  
}

const validateIsNumber = (answer) => {
  if (answer) {
    return 'Please enter a numerical salary value. Do not enter the currency.';
  } else {
    return true;
  }
}

module.exports = {
  validateAnswerLength,
  validateIsNumber
}