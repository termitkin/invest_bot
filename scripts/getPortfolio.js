const api = require('./utils/api');
const currencySigns = require('./utils/CONSTANTS');
const sortPositionsByYield = require('./utils/sortPositionsByYield');

const getPortfolio = async () => {
  let textToSend = '';
  const { positions } = await api.portfolio();

  const pos = await sortPositionsByYield(positions);

  pos.forEach((item) => {
    textToSend += `${item.ticker} ${item.name}: ${item.expectedYield.value} ${
      currencySigns[item.expectedYield.currency]
    }\n`;
  });

  return textToSend;
};

module.exports = getPortfolio;
