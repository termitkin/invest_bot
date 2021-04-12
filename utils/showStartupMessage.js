const currentDate = require('./currentDate');
const { APP_NAME, PORT } = require('./CONSTANTS');

const showStartupMessage = () => {
  console.log(`App ${APP_NAME} STARTS IN ${currentDate()} on port: ${PORT}`);
};

module.exports = showStartupMessage;
