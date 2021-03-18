// eslint-disable-next-line arrow-body-style
const getHelp = () => {
  return (
    'Список команд:\n\n' +
    '/get_balance - Узнать баланс за всё время\n' +
    '/get_portfolio - Получить ожидаемый доход по всему портфелю\n' +
    '/get_usd - Получить последнюю цену доллара\n' +
    '/get_eur - Получить последнюю цену евро\n' +
    '/get_stock_price %stock_ticker% - Получить последнюю цену бумаги\n' +
    '/get_help - Вывести список всех команд'
  );
};

module.exports = getHelp;
