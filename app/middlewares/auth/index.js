const dic = require('./utils/dic');
const globalDic = require('../../utils/dic');
const { OWNER_ID } = require('../../utils/CONSTANTS');
const sendMessage = require('../../components/sendMessage');

// eslint-disable-next-line consistent-return
const auth = async (req, res, next) => {
  const chatId = req.body.message?.chat?.id;

  if (Number.parseInt(OWNER_ID, 10) !== Number.parseInt(req.body.message.from.id, 10)) {
    await sendMessage(dic.permissionDeniedMessage, chatId).catch((e) => {
      console.log(JSON.stringify(e));
      res.status(500).send(globalDic.somethingWentWrong);
    });

    res.status(200).send('ok');
  }
  next();
};

module.exports = auth;
