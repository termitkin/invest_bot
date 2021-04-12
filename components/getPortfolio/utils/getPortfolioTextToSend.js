const currencySigns = require('../../../utils/dic');
const dic = require('./dic');

const getPortfolioTextToSend = ({ type, positions }) => {
  let textToSend = '';

  textToSend += `\n${dic[type]} (${positions.length} ${dic.pcs}):\n`;

  positions.forEach((item) => {
    textToSend += `${item.ticker} `;
    textToSend += `${dic.expectedYield}: ${item.expectedYield.value} ${currencySigns[item.expectedYield.currency]}, `;

    if (type === 'currencies') {
      textToSend += `${dic.balance}: ${item.balance}, `;
    } else {
      textToSend += `${dic.lots}: ${item.lots}, `;
    }

    textToSend += `${dic.averagePositionPrice}: ${item.averagePositionPrice.value} ${
      currencySigns[item.averagePositionPrice.currency]
    }\n`;
  });

  return textToSend;
};

module.exports = getPortfolioTextToSend;
