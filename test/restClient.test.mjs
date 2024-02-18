import { expect } from 'chai';
import { OKXRestClient } from '../src/index.js';

describe('OKXClient', function() {
  it('Should load OKX Rest Client', function() {
    const client = new OKXRestClient();
    expect(client.isTestClient).to.equal(false);
  });
});
