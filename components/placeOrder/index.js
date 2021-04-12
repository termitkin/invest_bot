/* eslint-disable comma-dangle */
const api = require('../../utils/api');
const capitalizeFirstLetter = require('./utils/capitalizeFirstLetter');

const placeOrder = async ({ orderParams, type }) => {
  const params = orderParams.split(' ');

  if (type === 'limit' && params.length !== 4) {
    return 'Команде нужно передать 4 параметра: тикер, количество лотов, операцию и цену за лот';
  }

  if (type === 'market' && params.length !== 3) {
    return 'Команде нужно передать 3 параметра: тикер, количество лотов и операцию';
  }

  // eslint-disable-next-line prefer-const
  let [ticker, lots, operationFromParams, price] = params;
  operationFromParams = capitalizeFirstLetter(operationFromParams);
  let figi;

  try {
    figi = (await api.searchOne({ ticker })).figi;
  } catch (err) {
    console.log(JSON.stringify(err));
    return `Инструмент с таким тикером "${ticker}" не найден`;
  }

  try {
    const orderFields = {};

    if (type === 'limit') {
      Object.assign(
        orderFields,
        await api.limitOrder({
          figi,
          lots: Number.parseInt(lots, 10),
          operation: operationFromParams,
          price: Number.parseFloat(price),
        })
      );
    }

    if (type === 'market') {
      Object.assign(
        orderFields,
        await api.marketOrder({
          figi,
          lots: Number.parseInt(lots, 10),
          operation: operationFromParams,
        })
      );
    }

    const { orderId, operation, status, requestedLots, executedLots, message } = orderFields;

    return (
      `orderId: ${orderId}\n` +
      `operation: ${operation}\n` +
      `status: ${status}\n` +
      `requestedLots: ${requestedLots}\n` +
      `executedLots: ${executedLots}\n` +
      `message: ${typeof message === 'undefined' ? '' : message}`
    );
  } catch (e) {
    console.log(JSON.stringify(e));
    if (e.payload && e.payload.message) {
      return e.payload.message;
    }
    return 'Что-то пошло не так 🤷‍♂️';
  }
};

module.exports = placeOrder;
