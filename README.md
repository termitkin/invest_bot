# Invest Bot

Бот для телеграма использует Тинькофф Инвестиции OpenAPI

Список команд:

```
/get_balance - Узнать баланс (доход за всё время)
/get_portfolio - Получить ожидаемый доход по всему портфелю
/get_orders - Получить список активных заявок
/cancel_order %order_id% - Отменить заявку. order_id можно взять из /get_orders
/place_limit_order %ticker% %count% %sell|buy% %price% - Разместить лимитную заявку. Порядок параметров важен, регистр нет. Пример - /place_limit_order ozon 1 sell 4200
/get_usd - Получить курс доллара
/get_eur - Получить курс евро
/get_stock_price %APPL% - Получить последнюю цену бумаги по тикеру
/get_help - Вывести список всех команд
```

Для работы боту нужны четыре переменные из окружения:

```
PORT - порт, на котором будет работать бот
APP_NAME - имя. Выводится в консоль при старте бота
BOT_TOKEN - токен телеграм бота
OWNER_ID - id владельца бота в телеграме. В телеграме все боты публичные. То есть обращаться к ним может кто угодно. Поэтому нужно указывать id владельца, чтобы управлять ботом мог только владелец бота
secretToken - токен Тинькофф Инвестиций
```

Команда для сборки бота в докер образ:

```
docker build -t termitkin/invest_bot .
```

Команда для запуска контейнера с ботом:

```
sudo docker run -d -p 3005:3002 --restart unless-stopped --name invest_bot -e PORT=3002 -e APP_NAME=Invest_bot -e secretToken=TINKOFF_SECRET_TOKEN -e BOT_TOKEN=TELEGRAM_BOT_TOKEN -e OWNER_ID=TELEGRAM_OWNER_ID termitkin/invest_bot:latest
```

Блок относящийся к боту в nginx:

```
# Invest Bot Docker
location ^~ /bots/invest_bot/TELEGRAM_BOT_TOKEN {
    proxy_pass http://0.0.0.0:3005/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```
