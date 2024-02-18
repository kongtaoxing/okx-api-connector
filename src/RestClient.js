const axios = require('axios');
const crypto = require('crypto');

class OKXRestClient {
  constructor(apiKey, secretKey, password, options = {}) {
    this.isTestClient = options.isTestClient || false;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.baseURL = options.baseURL || "https://aws.okx.com";
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 20000,
      headers: {
        "Content-Type": "application/json",
        "OK-ACCESS-KEY": apiKey,
        "OK-ACCESS-PASSPHRASE": password,
        ...(this.isTestClient && { 'x-simulated-trading': 1 })
      },
      ...options.config
    });

    this.client.interceptors.request.use(function (config) {
      const method = config.method.toUpperCase();
      const path = (config.url + (config.params ? '?' + new URLSearchParams(config.params).toString() : '')).replace('\%2C', '\,');
      const body = config.data ? JSON.stringify(config.data) : '';
      const timestamp = new Date().toISOString();

      const hmac = crypto.createHmac('sha256', secretKey);
      hmac.update(timestamp + method + path + body);
      const sign = hmac.digest('base64');

      // Update headers
      config.headers["OK-ACCESS-TIMESTAMP"] = timestamp,
      config.headers['OK-ACCESS-SIGN'] = sign;

      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  }

  async getBalance({tokens = []}) {
    if (tokens.length > 0) {
      return this.client.get('/api/v5/account/balance', {
        params: {
          ccy: tokens.join(',')
        }
      });
    }
    return this.client.get('/api/v5/account/balance');
  }

  async transfer({ ccy, amt, from, to, ...params }) {
    return this.client.post('/api/v5/asset/transfer', {
      ccy: ccy,
      amt: amt,
      from: from,
      to: to,
      ...params
    });
  }

  async spotOrder({instId, tdMode, side, ordType, ...params}) {
    return this.client.post('/api/v5/trade/order', {
      instId: instId,
      tdMode: tdMode,
      side: side,
      ordType: ordType,
      ...params
    });
  }
}

module.exports = OKXRestClient;