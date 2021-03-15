# Invest Bot

Бот для телеграма использует Тинькофф Инвестиции OpenAPI

Список команд:

```
/get_balance - Узнать баланс (доход за всё время)
/get_usd - Получить курс доллара
/get_eur - Получить курс евро
/get_expected_yield - Получить ожидаемый доход по всему портфелю
/get_stock_price APPL - Получить последнюю цену бумаги по тикеру
/get_help - Вывести список всех команд
```

Для работы боту нужны четыре переменные из окружения:

```
PORT - порт, на котором будет работать бот
APP_NAME - имя. Выводится в консоль при старте бота
BOT_TOKEN - токен телеграм бота
secretToken - токен Тинькофф Инвестиций
```

Команда для сборки бота в докер образ:

```
docker build -t termitkin/invest_bot .
```

Команда для запуска контейнера с ботом:

```
sudo docker run --rm -d -p 3005:3002 --name invest_bot -e PORT=3002 -e APP_NAME=Invest_bot -e secretToken=TINKOFF_SECRET_TOKEN -e BOT_TOKEN=TELEGRAM_BOT_TOKEN termitkin/invest_bot
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
