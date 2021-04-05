const express = require('express');
const getBalance = require('./components/getBalance');
const getCurrency = require('./components/getCurrency');
const getPortfolio = require('./components/getPortfolio');
const getHelp = require('./components/getHelp');
const getStockPrice = require('./components/getStockPrice');
const getOrders = require('./components/getOrders');
const cancelOrder = require('./components/cancelOrder');
const placeOrder = require('./components/placeOrder');
const sendMessage = require('./utils/sendMessage');
const currentDate = require('./utils/currentDate');
const { APP_NAME, OWNER_ID, PORT } = require('./utils/CONSTANTS');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`App ${APP_NAME} STARTS IN ${currentDate()} on port: ${PORT}`));

app.post('/', async (req, res) => {
  if (req.body.message && req.body.message.text) {
    const chatId = req.body.message.chat.id;
    const chatMessage = req.body.message.text.trim();
    let textToSend;

    if (Number.parseInt(OWNER_ID, 10) !== Number.parseInt(req.body.message.from.id, 10)) {
      await sendMessage('Управлять ботом может только владелец бота', chatId).catch((e) => {
        res.status(500).send('Что-то пошло не так 🤷‍♂️');
        console.log(JSON.stringify(e));
      });
      res.status(200).send('ok');
      return;
    }

    if (chatMessage === '/get_balance') {
      textToSend = `Баланс ${await getBalance()} ₽`;
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
      textToSend = `Цена доллара ${await getCurrency('FIGI_USDRUB')} ₽`;
    } else if (chatMessage === '/get_eur') {
      textToSend = `Цена евро ${await getCurrency('FIGI_EURRUB')} ₽`;
    } else if (chatMessage === '/start' || chatMessage === '/get_help') {
      textToSend = getHelp();
    } else if (/^\/get_stock_price/.test(chatMessage)) {
      const stockTicker = chatMessage.replace(/^\/get_stock_price/, '');

      textToSend = await getStockPrice(stockTicker);
    } else {
      textToSend = 'Ничего не нашлось 🤷‍♂️';
    }

    sendMessage(textToSend, chatId).catch((e) => {
      res.status(500).send('Что-то пошло не так 🤷‍♂️');
      console.log(JSON.stringify(e));
    });
  }
  res.status(200).send('ok');
});
