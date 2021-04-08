/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const api = require('../utils/api');
const convertExpectedYieldToRub = require('../utils/convertExpectedYieldToRub')();

const getBalance = async () => {
  const { positions } = await api.portfolio();

  let sum = 0;

  for (const position of positions) {
    sum += await convertExpectedYieldToRub(position.expectedYield);
  }

  return sum.toFixed(2);
};

module.exports = getBalance;
