/* eslint-disable consistent-return */
const api = require('./api');
const { FIGI_USDRUB, FIGI_EURRUB } = require('./CONSTANTS');

const convertExpectedYieldToRub = () => {
  let usd;
  let eur;

  let lastCalledTime = null;

  return async (expectedYield) => {
    const currentTime = Number(new Date());

    if (lastCalledTime === null || currentTime - lastCalledTime > 500) {
      lastCalledTime = Number(new Date());

      [usd, eur] = await Promise.all([
        api.orderbookGet({ figi: FIGI_USDRUB, depth: 1 }),
        api.orderbookGet({ figi: FIGI_EURRUB, depth: 1 }),
      ]);
    }

    if (expectedYield.currency === 'RUB') {
      return expectedYield.value;
    }
    if (expectedYield.currency === 'USD') {
      return expectedYield.value * usd.lastPrice;
    }
    if (expectedYield.currency === 'EUR') {
      return expectedYield.value * eur.lastPrice;
    }
  };
};

module.exports = convertExpectedYieldToRub;
