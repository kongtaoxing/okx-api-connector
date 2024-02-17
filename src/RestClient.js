const axios = require('axios');
const crypto = require('crypto');
require("dotenv").config();

class OKX {
  constructor(apiKey, secretKey, password, test = false) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.test = test;
    this.client = axios.create({
      baseURL: process.env.OKX_BASE_URL,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
        "OK-ACCESS-KEY": apiKey,
        "OK-ACCESS-PASSPHRASE": password,
        ...(test && { 'x-simulated-trading': 1 })
      },
      proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 7890,
      }
    });

    this.client.interceptors.request.use(function (config) {
      const method = config.method.toUpperCase();
      const path = config.url;
      const timestamp = new Date().toISOString();

      const hmac = crypto.createHmac('sha256', secretKey);
      hmac.update(timestamp + method + path);
      const sign = hmac.digest('base64');

      config.headers["OK-ACCESS-TIMESTAMP"] = timestamp,
      config.headers['OK-ACCESS-SIGN'] = sign;

      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  }

  async getBalance() {
    return await this.client.get('/api/v5/account/balance');
  }

  async newOrder(symbol, side, type, params) {
    return await this.client.post('/api/v5/trade/order', {
      instId: symbol,
      tdMode: 'cash',
      side: side,
      ordType: type,
      ...params
    });
  }
}

module.exports = { OKX };