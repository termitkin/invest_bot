const axios = require('axios');
const buildUrl = require('./buildUrl');

const sendMessage = (text, chatId) => {
  const urlParams = new URLSearchParams({ chat_id: chatId, text }).toString();
  const url = buildUrl(urlParams);

  return axios(url).then((data) => {
    if (data.statusText !== 'OK') {
      throw new Error(data.data);
    }
  });
};

module.exports = sendMessage;
