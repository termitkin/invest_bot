const api = require('./utils/api');
const currencySigns = require('./utils/CONSTANTS');
const sortPositionsByYield = require('./utils/sortPositionsByYield');

const getExpectedYield = async () => {
  let result = '';
  const { positions } = await api.portfolio();

  const pos = await sortPositionsByYield(positions);

  pos.forEach((item) => {
    result += `${item.name}: ${item.expectedYield.value} ${currencySigns[item.expectedYield.currency]}\n`;
  });

  return result;
};

module.exports = getExpectedYield;
