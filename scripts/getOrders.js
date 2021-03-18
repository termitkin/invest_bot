const api = require('./utils/api');
const currencySign = require('./utils/CONSTANTS');

const getOrders = async () => {
  const orders = await api.orders();
  let textToSend = '';

  for (const order of orders) {
    const { name, currency } = await api.searchOne({ figi: order.figi });
    textToSend += `${name}\n`;
    textToSend += `Операция: ${order.operation}, статус: ${order.status}, тип: ${order.type}\n`;
    textToSend += `Количество: ${order.requestedLots}, цена: ${order.price} ${currencySign[currency]}\n`;
    textToSend += `Номер заявки: ${order.orderId}`;
    textToSend += '\n\n';
  }

  // orders.forEach(async (order) => {
  //   const { name } = (await api.searchOne({ figi: order.figi })).name;
  //   textToSend += `${name}\n`;
  // });

  return textToSend.trim();
};

module.exports = getOrders;
