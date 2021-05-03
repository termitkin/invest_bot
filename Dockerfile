FROM node:12-alpine

ENV TZ Europe/Moscow

WORKDIR /app
COPY . /app
RUN npm install

CMD ["node", "./app/index.js"]
