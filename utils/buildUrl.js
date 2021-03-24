const { TELEGRAM_BOT_API, BOT_TOKEN } = require('./CONSTANTS');

const buildUrl = (messageParams) => `${TELEGRAM_BOT_API}${BOT_TOKEN}/sendMessage?${messageParams}`;

module.exports = buildUrl;
