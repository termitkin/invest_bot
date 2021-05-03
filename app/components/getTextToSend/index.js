const dic = require('./utils/dic');
const getBalance = require('../getBalance');
const getCurrency = require('../getCurrency');
const getPortfolio = require('../getPortfolio');
const getHelp = require('../getHelp');
const getStockPrice = require('../getStockPrice');
const getOrders = require('../getOrders');
const cancelOrder = require('../cancelOrder');
const placeOrder = require('../placeOrder');

const getTextToSend = async (chatMessage) => {
  let textToSend;

  if (chatMessage === '/get_balance') {
    textToSend = `${dic.balance} ${await getBalance()} ₽`;
  } else if (chatMessage === '/get_portfolio') {
    textToSend = await getPortfolio();
  } else if (chatMessage === '/get_orders') {
    textToSend = await getOrders();
  } else if (/^\/cancel_order /.test(chatMessage)) {
    const orderId = chatMessage.replace(/\/cancel_order /, '');

    textToSend = await cancelOrder(orderId);
  } else if (/^\/place_limit_order /.test(chatMessage)) {
    const limitOrderParams = chatMessage.replace(/\/place_limit_order /, '');

    textToSend = await placeOrder({ orderParams: limitOrderParams, type: 'limit' });
  } else if (/^\/place_market_order /.test(chatMessage)) {
    const marketOrderParams = chatMessage.replace(/\/place_market_order /, '');

    textToSend = await placeOrder({ orderParams: marketOrderParams, type: 'market' });
  } else if (chatMessage === '/get_usd') {
    textToSend = `${dic.usdPrice} ${await getCurrency('FIGI_USDRUB')} ₽`;
  } else if (chatMessage === '/get_eur') {
    textToSend = `${dic.eurPrice} ${await getCurrency('FIGI_EURRUB')} ₽`;
  } else if (chatMessage === '/start' || chatMessage === '/get_help') {
    textToSend = getHelp();
  } else if (/^\/get_stock_price/.test(chatMessage)) {
    const stockTicker = chatMessage.replace(/^\/get_stock_price/, '');

    textToSend = await getStockPrice(stockTicker);
  } else {
    textToSend = dic.commandNotFound;
  }

  return textToSend;
};

module.exports = getTextToSend;
