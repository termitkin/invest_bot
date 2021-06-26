const api = require('../../utils/api');
const dic = require('./utils/dic');
const globalDic = require('../../utils/dic');

const cancelOrder = async (orderId) => {
  try {
    await api.cancelOrder({ orderId });
  } catch (e) {
    console.log(JSON.stringify(e));

    const errorMessage = e?.payload?.message;

    if (errorMessage) {
      return errorMessage;
    }

    return globalDic.somethingWentWrong;
  }
  return `${dic.orderCanceledSuccessfully}: "${orderId}"`;
};

module.exports = cancelOrder;
