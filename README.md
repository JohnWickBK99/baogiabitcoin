# Bitcoin Price Telegram Bot

This Node.js script fetches the current Bitcoin price every 10 minutes and sends it to a Telegram chat.

## Setup
1. Create a Telegram bot and obtain its token.
2. Find your chat ID (e.g., using `@userinfobot`).
3. Set the following environment variables:
   - `TELEGRAM_BOT_TOKEN`: your bot token
   - `TELEGRAM_CHAT_ID`: the chat ID to receive messages

## Usage
Install dependencies (none are required besides Node.js 18+).
Run the script:

```bash
node index.js
```

The script will immediately send the current Bitcoin price and continue updating every 10 minutes.
