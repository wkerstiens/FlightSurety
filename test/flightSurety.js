const TestConfig = require('../config/testConfig');
const BigNumber = require('bignumber.js');

contract('Flight Surety Tests', async(accounts) => {
    let config;
    before('setup contract', async() => {
        config = await TestConfig(accounts);
        await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
    });
});