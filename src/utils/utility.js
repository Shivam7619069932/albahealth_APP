function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidPassword(password) {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
}

function isValidPasswordCommon(password) {
  return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
}

function isValidPasswordForOneNumber(password) {
  return /^(?=.*[0-9])/.test(password);
}

function isValidPasswordForOneSpecialCharacter(password) {
  return /^(?=.*[!@#$%^&*])/.test(password);
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidPasswordCommon,
  isValidPasswordForOneNumber,
  isValidPasswordForOneSpecialCharacter
}
