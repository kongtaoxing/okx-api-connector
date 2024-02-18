import { expect } from 'chai';
import { OKXClient } from '../src/index.js';

describe('OKXClient', function() {
  it('Should load OKX Rest Client', function() {
    const client = new OKXClient();
    expect(client.isTestClient).to.equal(false);
  });
});
