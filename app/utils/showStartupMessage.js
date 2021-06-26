const getCurrentDate = require('./getCurrentDate');
const { APP_NAME, PORT } = require('./CONSTANTS');

const showStartupMessage = () => {
  console.log(`App ${APP_NAME} STARTS IN ${getCurrentDate()} on port: ${PORT}`);
};

module.exports = showStartupMessage;
