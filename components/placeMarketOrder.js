const api = require('../utils/api');
const capitalizeFirstLetter = require('../utils/capitalizeFirstLetter');

const placeMarketOrder = async (marketOrderParams) => {
  const params = marketOrderParams.split(' ');
  // eslint-disable-next-line prefer-const
  let [ticker, lots, operationFromParams] = params;
  operationFromParams = capitalizeFirstLetter(operationFromParams);

  if (params.length !== 3) {
    return 'Команде нужно передать 3 параметра: тикер, количество лотов и операцию';
  }

  const { figi } = await api.searchOne({ ticker });

  try {
    const { orderId, operation, status, requestedLots, executedLots } = await api.marketOrder({
      figi,
      lots: Number.parseInt(lots, 10),
      operation: operationFromParams,
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

module.exports = placeMarketOrder;
