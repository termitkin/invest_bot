module.exports = {
  TINKOFF_API_URL: 'https://api-invest.tinkoff.ru/openapi',
  TINKOFF_SOCKET_URL: 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws',
  TINKOFF_SECRET_TOKEN: process.env.secretToken,

  TELEGRAM_BOT_API: 'https://api.telegram.org/bot',
  BOT_TOKEN: process.env.BOT_TOKEN,
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  OWNER_ID: process.env.OWNER_ID,

  FIGI_USDRUB: 'BBG0013HGFT4',
  FIGI_EURRUB: 'BBG0013HJJ31',
};
