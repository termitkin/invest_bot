const api = require('../../utils/api');

const cancelOrder = async (orderId) => {
  try {
    await api.cancelOrder({ orderId });
  } catch (e) {
    console.log(JSON.stringify(e));
    if (e.payload && e.payload.message) {
      return e.payload.message;
    }
    return 'Что-то пошло не так 🤷‍♂️';
  }
  return `Заявка успешно отменена: "${orderId}"`;
};

module.exports = cancelOrder;
