const api = require('../../utils/api');
const CONSTANTS = require('../../utils/CONSTANTS');

const getCurrency = async (currency) => {
  try {
    return (await api.orderbookGet({ figi: CONSTANTS[currency], depth: 1 })).lastPrice;
  } catch (e) {
    console.log(e.payload.message);
    return 'Что-то пошло не так 😢';
  }
};

module.exports = getCurrency;
