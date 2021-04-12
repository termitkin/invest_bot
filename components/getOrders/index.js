const api = require('../../utils/api');
const currencySigns = require('../../utils/dic');

const getOrders = async () => {
  const orders = await api.orders();

  if (!orders.length) {
    return 'Активных заявок нет';
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
      textToSend += `Запрошено лотов: ${requestedLots}, исполнено лотов: ${executedLots}\n`;
      textToSend += `Цена за бумагу: ${price} ${cur}\n`;
      textToSend += `Бумаг в лоте: ${lot}\n`;
      textToSend += `Цена заявки: ${priceTotal} ${cur}\n`;
      textToSend += `Операция: ${operation}, статус: ${status}, тип: ${type}\n`;
      textToSend += `Минимальный шаг: ${minPriceIncrement}\n`;
      textToSend += `Номер заявки: ${orderId}`;
      textToSend += '\n\n';
    }
  });

  return textToSend.trim();
};

module.exports = getOrders;
