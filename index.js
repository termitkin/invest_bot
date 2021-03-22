const express = require('express');
const getBalance = require('./scripts/getBalance');
const getCurrency = require('./scripts/getCurrency');
const getPortfolio = require('./scripts/getPortfolio');
const getHelp = require('./scripts/getHelp');
const getStockPrice = require('./scripts/getStockPrice');
const sendMessage = require('./scripts/sendMessage');
const getOrders = require('./scripts/getOrders');
const currentDate = require('./scripts/utils/currentDate');
const { APP_NAME, OWNER_ID, PORT } = require('./scripts/utils/CONSTANTS');

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
    } else if (chatMessage === '/get_usd') {
      textToSend = `Цена доллара ${await getCurrency('usd')} ₽`;
    } else if (chatMessage === '/get_eur') {
      textToSend = `Цена евро ${await getCurrency('eur')} ₽`;
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
