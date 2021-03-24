const api = require('../utils/api');
const { FIGI_USDRUB, FIGI_EURRUB } = require('../utils/CONSTANTS');

const getCurrency = async (currency) => {
  if (currency === 'usd') {
    return (await api.orderbookGet({ figi: FIGI_USDRUB, depth: 1 })).lastPrice;
  }
  if (currency === 'eur') {
    return (await api.orderbookGet({ figi: FIGI_EURRUB, depth: 1 })).lastPrice;
  }
  return 'Что-то пошло не так 😢';
};

module.exports = getCurrency;
