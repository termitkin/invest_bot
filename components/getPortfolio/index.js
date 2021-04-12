const api = require('../../utils/api');
const dic = require('./utils/dic');
const sortPortfolioByYield = require('./utils/sortPortfolioByYield');
const groupPortfolioByType = require('./utils/groupPortfolioByType');
const getPortfolioTextToSend = require('./utils/getPortfolioTextToSend');

const getPortfolio = async () => {
  let textToSend = '';
  let { positions } = await api.portfolio();

  if (!positions.length) {
    return dic.positionsNotFound;
  }

  const positionsCount = positions.length;

  positions = await sortPortfolioByYield(positions);
  positions = groupPortfolioByType(positions);

  if (positions.stocks.length) {
    textToSend += getPortfolioTextToSend({ type: 'stocks', positions: [...positions.stocks] });
  }

  if (positions.etfs.length) {
    textToSend += getPortfolioTextToSend({ type: 'etfs', positions: [...positions.etfs] });
  }

  if (positions.bonds.length) {
    textToSend += getPortfolioTextToSend({ type: 'bonds', positions: [...positions.bonds] });
  }

  if (positions.currencies.length) {
    textToSend += getPortfolioTextToSend({ type: 'currencies', positions: [...positions.currencies] });
  }

  textToSend += `\n${dic.positionsCount} ${positionsCount}\n`;

  return textToSend.trim();
};

module.exports = getPortfolio;
