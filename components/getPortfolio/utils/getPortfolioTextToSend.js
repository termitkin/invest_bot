const dic = require('../../../utils/dic');

const getPortfolioTextToSend = ({ type, positions }) => {
  let textToSend = '';

  textToSend += `\n${dic[type]} (${positions.length} шт):\n`;

  positions.forEach((item) => {
    textToSend += `${item.ticker} `;
    textToSend += `Доход: ${item.expectedYield.value} ${dic[item.expectedYield.currency]}, `;

    if (type === 'currencies') {
      textToSend += `Количество: ${item.balance}, `;
    } else {
      textToSend += `Лотов: ${item.lots}, `;
    }

    textToSend += `Средняя: ${item.averagePositionPrice.value} ${dic[item.averagePositionPrice.currency]}\n`;
  });

  return textToSend;
};

module.exports = getPortfolioTextToSend;
