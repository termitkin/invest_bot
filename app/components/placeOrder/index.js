/* eslint-disable comma-dangle */
const api = require('../../utils/api');
const dic = require('./utils/dic');
const globalDic = require('../../utils/dic');
const capitalizeFirstLetter = require('./utils/capitalizeFirstLetter');

const placeOrder = async ({ orderParams, type }) => {
  const params = orderParams.split(' ');

  if (type === 'limit' && params.length !== 4) {
    return dic.limitOrderWrongParamsCount;
  }

  if (type === 'market' && params.length !== 3) {
    return dic.marketOrderWrongParamsCount;
  }

  // eslint-disable-next-line prefer-const
  let [ticker, lots, operationFromParams, price] = params;
  operationFromParams = capitalizeFirstLetter(operationFromParams);
  let figi;

  try {
    figi = (await api.searchOne({ ticker })).figi;
  } catch (e) {
    console.log(JSON.stringify(e));
    return `${dic.instrumentNotFound} "${ticker}"`;
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
      `${dic.orderId}: ${orderId}\n` +
      `${dic.operation}: ${dic[operation]}\n` +
      `${dic.status}: ${dic[status]}\n` +
      `${dic.requestedLots}: ${requestedLots}\n` +
      `${dic.executedLots}: ${executedLots}\n` +
      `${typeof message === 'undefined' ? '' : `${dic.message}: ${message}`}`
    );
  } catch (e) {
    console.log(JSON.stringify(e));
    if (e.payload && e.payload.message) {
      return e.payload.message;
    }
    return globalDic.somethingWentWrong;
  }
};

module.exports = placeOrder;
