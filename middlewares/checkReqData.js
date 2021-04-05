// eslint-disable-next-line consistent-return
const checkReqData = async (req, res, next) => {
  if (!(req.body.message && req.body.message.chat && req.body.message.chat.id)) {
    console.log('Нет .chat.id', JSON.stringify(req.body));
    return res.status(200).send('ok');
  }
  if (!(req.body.message && req.body.message.text)) {
    console.log('Нет текста сообщения', JSON.stringify(req.body));
    return res.status(200).send('ok');
  }
  next();
};

module.exports = checkReqData;
