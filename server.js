require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const PORT = process.env.PORT || 3000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TELEGRAM_TOKEN);

app.use(express.json());

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    
    const telegramMessage = `
        📩 Новое сообщение с сайта:
        Имя: ${name}
        Email: ${email || 'Не указан'}
        Сообщение: ${message || 'Нет текста'}
    `;
    
    bot.sendMessage(CHAT_ID, telegramMessage)
        .then(() => res.json({ success: true }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Ошибка отправки' });
        });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
