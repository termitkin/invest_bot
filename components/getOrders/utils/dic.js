module.exports = {
  orderId: 'Номер заявки',
  operation: 'Операция',
  status: 'Статус',
  requestedLots: 'Запрошено лотов',
  executedLots: 'Исполнено лотов',
  name: 'Имя',
  type: 'Тип',
  price: 'Цена',
  currency: 'Валюта',
  minPriceIncrement: 'Минимальный шаг',
  lot: 'Бумаг в лоте',
  priceTotal: 'Цена заявки',
  ordersNotFound: 'Активных заявок нет',

  // Возможные статусы заявки:
  New: 'Новая',
  PendingNew: 'Создаётся',
  PartiallyFill: 'Частично исполнена',
  Fill: 'Исполнена',
  Cancelled: 'Отменена',
  PendingCancel: 'Ожидается отмена',
  Replaced: 'Перевыставление',
  PendingReplace: 'Ожидание перевыставления',
  Rejected: 'Не создана',

  // Возможные типы бумаг:
  Stock: 'Акция',
  Bond: 'Облигация',
  Etf: 'Фонд',
  Currency: 'Валюта',

  // Возможные операции над бумагой:
  Sell: 'Продажа',
  Buy: 'Покупка',
};
