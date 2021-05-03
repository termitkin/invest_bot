const express = require('express');
const main = require('./components/main');
const auth = require('./middlewares/auth');
const checkReqData = require('./middlewares/checkReqData');
const showStartupMessage = require('./utils/showStartupMessage');
const { PORT } = require('./utils/CONSTANTS');

const app = express();
app.listen(PORT, showStartupMessage);

app.use(express.json());
app.use(checkReqData);
app.use(auth);

app.post('/', main);
