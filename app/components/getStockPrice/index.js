const api = require('../../utils/api');
const globalDic = require('../../utils/dic');
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
    return globalDic.somethingWentWrong;
  }
};

module.exports = getStockPrice;
