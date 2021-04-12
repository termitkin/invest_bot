const api = require('../../utils/api');
const currencySigns = require('../../utils/dic');

const getStockPrice = async (stockTicker) => {
  try {
    const { figi, name, currency } = await api.searchOne({ ticker: stockTicker });
    const { lastPrice } = await api.orderbookGet({ figi, depth: 1 });

    return `${name}: ${lastPrice} ${currencySigns[currency]}`;
  } catch (e) {
    return 'Что-то пошло не так 🤷‍♂️';
  }
};

module.exports = getStockPrice;
