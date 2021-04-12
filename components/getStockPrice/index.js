const api = require('../../utils/api');
const currencySigns = require('../../utils/dic');

const getStockPrice = async (stockTicker) => {
  try {
    const { figi, name, currency } = await api.searchOne({ ticker: stockTicker });
    const { lastPrice } = await api.orderbookGet({ figi, depth: 1 });

    return `${name}: ${lastPrice} ${currencySigns[currency]}`;
  } catch (e) {
    console.log(JSON.stringify(e));
    if (e.payload && e.payload.message) {
      return e.payload.message;
    }
    return 'Что-то пошло не так 🤷‍♂️';
  }
};

module.exports = getStockPrice;
