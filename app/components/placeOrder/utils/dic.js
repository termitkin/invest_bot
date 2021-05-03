module.exports = {
  limitOrderWrongParamsCount: 'Команде нужно передать 4 параметра: тикер, количество лотов, операцию и цену за лот',
  marketOrderWrongParamsCount: 'Команде нужно передать 3 параметра: тикер, количество лотов и операцию',
  instrumentNotFound: 'Инструмент с таким тикером не найден',
  orderId: 'Номер заявки',
  operation: 'Операция',
  status: 'Статус',
  requestedLots: 'Запрошено лотов',
  executedLots: 'Исполнено лотов',
  message: 'Сообщение',

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

  // Возможные операции над бумагой:
  Sell: 'Продажа',
  Buy: 'Покупка',
};
