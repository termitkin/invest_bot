const api = require('../../utils/api');
const dic = require('./utils/dic');
const currencySigns = require('../../utils/dic');

const getOrders = async () => {
  const orders = await api.orders();

  if (!orders.length) {
    return dic.ordersNotFound;
  }

  let instrumentsByOrders = [];
  let textToSend = '';

  orders.forEach((order) => {
    instrumentsByOrders.push(api.searchOne({ figi: order.figi }));
  });

  instrumentsByOrders = await Promise.all(instrumentsByOrders);

  const mergedInstrumentsAndOrders = orders.map((order, ind) => {
    /*
      По идее в двух массивах один и тот же инструмент должен иметь один и тот же индекс.
      Но на всякий случай проверим это ифчиком
    */
    if (order.figi === instrumentsByOrders[ind].figi) {
      return {
        ...order,
        ...instrumentsByOrders[ind],
      };
    }
    return null;
  });

  mergedInstrumentsAndOrders.forEach((order) => {
    if (order) {
      const {
        name,
        operation,
        status,
        type,
        requestedLots,
        price,
        currency,
        orderId,
        ticker,
        minPriceIncrement,
        executedLots,
        lot,
      } = order;

      const cur = currencySigns[currency];
      const requestedCount = lot * requestedLots;
      const priceTotal = price * requestedCount;

      textToSend += `${ticker} ${name}\n`;
      textToSend += `${dic.requestedLots}: ${requestedLots}, ${dic.executedLots}: ${executedLots}\n`;
      textToSend += `${dic.price}: ${price} ${cur}\n`;
      textToSend += `${dic.lot}: ${lot}\n`;
      textToSend += `${dic.priceTotal}: ${priceTotal} ${cur}\n`;
      textToSend += `${dic.operation}: ${dic[operation]}, ${dic.status}: ${dic[status]}, ${dic.type}: ${dic[type]}\n`;
      textToSend += `${dic.minPriceIncrement}: ${minPriceIncrement}\n`;
      textToSend += `${dic.orderId}: ${orderId}`;
      textToSend += '\n\n';
    }
  });

  return textToSend.trim();
};

module.exports = getOrders;
