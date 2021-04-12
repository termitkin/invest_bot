const capitalizeFirstLetter = (str) => {
  let result = '';

  result += str[0].toUpperCase();
  result += str.slice(1).toLowerCase();

  return result;
};

module.exports = capitalizeFirstLetter;
