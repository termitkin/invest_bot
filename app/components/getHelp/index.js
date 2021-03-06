/* eslint-disable max-len */
// eslint-disable-next-line arrow-body-style
const getHelp = () => {
  return (
    'Список команд:\n\n' +
    '/get_balance - Узнать баланс (доход за всё время)\n' +
    '/get_portfolio - Получить ожидаемый доход по каждой бумаге в портфеле\n' +
    '/get_orders - Получить список активных заявок\n' +
    '/cancel_order %order_id% - Отменить заявку. order_id можно взять из /get_orders\n' +
    '/place_limit_order %ticker% %count% %sell|buy% %price% - Разместить лимитную заявку. Порядок параметров важен, регистр нет. Пример - /place_limit_order ozon 1 sell 4200\n' +
    '/place_market_order %ticker% %count% %sell|buy% - Разместить рыночную заявку. Порядок параметров важен, регистр нет. Пример - /place_market_order ozon 1 sell\n' +
    '/get_usd - Получить последнюю цену доллара\n' +
    '/get_eur - Получить последнюю цену евро\n' +
    '/get_stock_price %stock_ticker% - Получить последнюю цену бумаги по тикеру\n' +
    '/get_help - Вывести список всех команд'
  );
};

module.exports = getHelp;
