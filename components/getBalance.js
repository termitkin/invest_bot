const api = require('../utils/api');
const { FIGI_USDRUB, FIGI_EURRUB } = require('../utils/CONSTANTS');

const getBalance = async () => {
  const usd = await api.orderbookGet({ figi: FIGI_USDRUB, depth: 1 });
  const eur = await api.orderbookGet({ figi: FIGI_EURRUB, depth: 1 });

  const { positions } = await api.portfolio();
  let sum = 0;

  positions.forEach((item) => {
    if (item.expectedYield.currency === 'RUB') {
      sum += item.expectedYield.value;
    } else if (item.expectedYield.currency === 'USD') {
      sum += item.expectedYield.value * usd.lastPrice;
    } else if (item.expectedYield.currency === 'EUR') {
      sum += item.expectedYield.value * eur.lastPrice;
    }
  });

  return sum.toFixed(2);
};

module.exports = getBalance;
