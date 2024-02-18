# Node.js OKX (OKEX) API SDK

[![npm version](https://img.shields.io/npm/v/okx-api-connector)](https://www.npmjs.com/package/okx-api-connector)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node version](https://img.shields.io/node/v/okx-api-connector.svg?style=flat)](http://nodejs.org/download/)

## Installation

```sh
npm install okx-api-connector
```

## Usage

```js
import { OKXRestClient } from 'okx-api-connector';
// or use common js
const { OKXRestClient } = require("okx-api-connector");
// Create rest client
const okxClient = new OKX(process.env.OKX_API_KEY, process.env.OKX_SECRET_KEY, process.env.OKX_API_PASSWD);

// Create client with option
const okxClient = new OKX(
  process.env.OKX_API_KEY, 
  process.env.OKX_SECRET_KEY, 
  process.env.OKX_API_PASSWD,
  {
    baseURL: process.env.OKX_BASE_URL,  // Replace the base url
    isTestClient: true,  // Config if the client is a test client
    config: {
      proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 7890,
      }
    }
  });

// Get balance
const balance = await okxClient.getBalance();
console.log(balance.data.data[0].details);

// Check specific token balance
const balance = await okxClient.getBalance({
  tokens: ['USDC', 'USDT']
});

// Put trade, all params please refer to [OKX api](https://www.okx.com/docs-v5/en/#order-book-trading-trade-post-place-order)
okxClient.newOrder(instId, tdMode, side, ordType, otherParams);

// Transfer assets
okxClient.transfer({
  ccy: 'USDT',
  amt: '10',
  from: '18',
  to: '6',
});

// Other usage
okxClient.client.get(url);
okxClient.client.post(url, data);
```