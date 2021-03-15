const api = require('./utils/api');
const { FIGI_USDRUB } = require('./utils/CONSTANTS');

const getBalance = async () => {
  const usd = await api.orderbookGet({ figi: FIGI_USDRUB, depth: 1 });
  const { positions } = await api.portfolio();
  let sum = 0;

  positions.forEach((item) => {
    if (item.expectedYield.currency === 'RUB') {
      sum += item.expectedYield.value;
    } else {
      sum += item.expectedYield.value * usd.lastPrice;
    }
  });
  return sum.toFixed(2);
};

module.exports = getBalance;
