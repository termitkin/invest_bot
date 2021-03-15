const api = require('./api');
const { FIGI_USDRUB } = require('./CONSTANTS');

const sortPositionsByYield = async (pos) => {
  const positions = pos.slice();
  const usd = await api.orderbookGet({ figi: FIGI_USDRUB, depth: 1 });

  return positions.sort((a, b) => {
    let aInRub;
    let bInRub;

    if (a.expectedYield.currency !== 'RUB') {
      aInRub = a.expectedYield.value * usd.lastPrice;
    } else {
      aInRub = a.expectedYield.value;
    }
    if (b.expectedYield.currency !== 'RUB') {
      bInRub = b.expectedYield.value * usd.lastPrice;
    } else {
      bInRub = b.expectedYield.value;
    }

    return bInRub - aInRub;
  });
};

module.exports = sortPositionsByYield;
