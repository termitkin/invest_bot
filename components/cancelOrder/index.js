const api = require('../../utils/api');

const cancelOrder = async (orderId) => {
  try {
    await api.cancelOrder({ orderId });
  } catch (e) {
    console.log(JSON.stringify(e));
    if (/Cannot find order by id/.test(e.payload.message)) {
      return `Не могу найти заявку с номером: "${e.payload.message.replace(/Cannot find order by id /, '')}"`;
    }
    return 'Что-то пошло не так 🤷‍♂️';
  }
  return `Заявка успешно отменена: "${orderId}"`;
};

module.exports = cancelOrder;
