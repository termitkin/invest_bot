const api = require('../../utils/api');
const globalDic = require('../../utils/dic');
const CONSTANTS = require('../../utils/CONSTANTS');

const getCurrency = async (currency) => {
  try {
    return (await api.orderbookGet({ figi: CONSTANTS[currency], depth: 1 })).lastPrice;
  } catch (e) {
    console.log(JSON.stringify(e));

    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      return errorMessage;
    }
    return globalDic.somethingWentWrong;
  }
};

module.exports = getCurrency;
