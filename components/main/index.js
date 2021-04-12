const sendMessage = require('../sendMessage');
const getTextToSend = require('../getTextToSend');

const main = async (req, res) => {
  const chatId = req.body.message.chat.id;
  const chatMessage = req.body.message.text.trim();
  const textToSend = await getTextToSend(chatMessage);

  sendMessage(textToSend, chatId).catch((e) => {
    res.status(500).send('Что-то пошло не так 🤷‍♂️');
    console.log(JSON.stringify(e));
  });

  return res.status(200).send('ok');
};

module.exports = main;
