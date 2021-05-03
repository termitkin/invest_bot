const OpenAPI = require('@tinkoff/invest-openapi-js-sdk');
const { TINKOFF_API_URL, TINKOFF_SOCKET_URL, TINKOFF_SECRET_TOKEN } = require('./CONSTANTS');

const api = new OpenAPI({ apiURL: TINKOFF_API_URL, secretToken: TINKOFF_SECRET_TOKEN, socketURL: TINKOFF_SOCKET_URL });

module.exports = api;
