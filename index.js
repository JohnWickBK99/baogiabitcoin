const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TOKEN || !CHAT_ID) {
  console.error('Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
  process.exit(1);
}

async function fetchBitcoinPrice() {
  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    const rate = data.bpi?.USD?.rate_float;
    return rate ? rate.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null;
  } catch (err) {
    console.error('Failed to fetch Bitcoin price:', err);
    return null;
  }
}

async function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
    if (!response.ok) throw new Error(`Telegram error: ${response.status}`);
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
  }
}

async function reportPrice() {
  const price = await fetchBitcoinPrice();
  if (price) {
    const message = `Current Bitcoin price: ${price}`;
    console.log(message);
    await sendTelegramMessage(message);
  }
}

reportPrice();
setInterval(reportPrice, 10 * 60 * 1000);
