const api = require('./api');
const { FIGI_USDRUB, FIGI_EURRUB } = require('./CONSTANTS');

const sortPortfolioByYield = async (pos) => {
  const positions = pos.slice();
  const usd = await api.orderbookGet({ figi: FIGI_USDRUB, depth: 1 });
  const eur = await api.orderbookGet({ figi: FIGI_EURRUB, depth: 1 });

  return positions.sort((a, b) => {
    if (a.expectedYield.currency === b.expectedYield.currency) {
      return b - a;
    }

    let aInRub;
    let bInRub;

    if (a.expectedYield.currency === 'USD') {
      aInRub = a.expectedYield.value * usd.lastPrice;
    } else if (a.expectedYield.currency === 'EUR') {
      aInRub = a.expectedYield.value * eur.lastPrice;
    }

    if (b.expectedYield.currency === 'USD') {
      bInRub = b.expectedYield.value * usd.lastPrice;
    } else if (b.expectedYield.currency === 'EUR') {
      bInRub = b.expectedYield.value * eur.lastPrice;
    }

    return bInRub - aInRub;
  });
};

module.exports = sortPortfolioByYield;
