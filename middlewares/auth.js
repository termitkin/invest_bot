const { OWNER_ID } = require('../utils/CONSTANTS');
const sendMessage = require('../components/sendMessage');

// eslint-disable-next-line consistent-return
const auth = async (req, res, next) => {
  const chatId = req.body.message.chat.id;

  if (Number.parseInt(OWNER_ID, 10) !== Number.parseInt(req.body.message.from.id, 10)) {
    await sendMessage('Управлять ботом может только владелец бота', chatId).catch((err) => {
      res.status(500).send('Что-то пошло не так 🤷‍♂️');
      console.log(JSON.stringify(err));
    });

    return res.status(200).send('ok');
  }
  next();
};

module.exports = auth;
