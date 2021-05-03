const api = require('../../utils/api');
const globalDic = require('../../utils/dic');
const CONSTANTS = require('../../utils/CONSTANTS');

const getCurrency = async (currency) => {
  try {
    return (await api.orderbookGet({ figi: CONSTANTS[currency], depth: 1 })).lastPrice;
  } catch (e) {
    console.log(JSON.stringify(e));
    if (e.payload && e.payload.message) {
      return e.payload.message;
    }
    return globalDic.somethingWentWrong;
  }
};

module.exports = getCurrency;
