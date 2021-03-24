const api = require('../utils/api');
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

const placeLimitOrder = async (limitOrderParams) => {
  const params = limitOrderParams.split(' ');
  // eslint-disable-next-line prefer-const
  let [ticker, lots, operationFromParams, price] = params;
  operationFromParams = capitalizeFirstLetter(operationFromParams);

  if (params.length !== 4) {
    return 'Команде нужно передать 4 параметра: тикер, количество лотов, операцию и цену за лот';
  }

  const { figi } = await api.searchOne({ ticker });

  try {
    const { orderId, operation, status, requestedLots, executedLots } = await api.limitOrder({
      figi,
      lots: Number.parseInt(lots, 10),
      operation: operationFromParams,
      price: Number.parseInt(price, 10),
    });
    return (
      `orderId: ${orderId}\n` +
      `operation: ${operation}\n` +
      `status: ${status}\n` +
      `requestedLots: ${requestedLots}\n` +
      `executedLots: ${executedLots}`
    );
  } catch (err) {
    console.log(err.payload.message);
    if (err.payload.message === 'Недостаточно активов для сделки') {
      return 'Недостаточно активов для сделки';
    }
    return 'Что-то пошло не так';
  }
};

module.exports = placeLimitOrder;
