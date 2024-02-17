# Node.js OKX (OKEX) API SDK

[![npm version](https://img.shields.io/npm/v/okx-api-connector)][1]

## Installation

```bash
npm install okx-api-connector
```

## Usage

```js
// Create rest client
const okxClient = new OKX(process.env.OKX_API_KEY, process.env.OKX_SECRET_KEY, process.env.OKX_API_PASSWD);

// Get balance
const balance = await okxClient.getBalance();
console.log(balance.data.data[0].details);

// Put trade
client.newOrder(symbol, side, type, params);
```