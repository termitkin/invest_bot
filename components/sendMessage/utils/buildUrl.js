const { TELEGRAM_BOT_API, BOT_TOKEN } = require('../../../utils/CONSTANTS');

const buildUrl = (messageParams) => `${TELEGRAM_BOT_API}${BOT_TOKEN}/sendMessage?${messageParams}`;

module.exports = buildUrl;
