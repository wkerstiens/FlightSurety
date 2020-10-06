let BigNumber = require('bignumber.js');
const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const FlightSuretyData = artifacts.require("FlightSuretyData");

contract('Flight Surety Tests', (accounts) => {
    it('has correct isOperational() value', async () => {
        const flightSuretyData = await FlightSuretyData.deployed();
        const flightSuretyApp = await FlightSuretyApp.deployed();
        await flightSuretyData.authorizeCaller(flightSuretyApp.address, true);
        let status = await flightSuretyData.isOperational.call({from: flightSuretyApp.address});
        assert.equal(status, true, 'Operational status should be true');
    });

    it('can change the state of is operational and when disabled can\'t call authorizeCaller', async() => {
        const flightSuretyData = await FlightSuretyData.deployed();
        const flightSuretyApp = await FlightSuretyApp.deployed();
        let currentState = await flightSuretyData.isOperational.call({from: flightSuretyApp.address});
        assert.equal(currentState, true, 'Operational status should be true');
        await flightSuretyData.setOperationalStatus(false, {from: accounts[0]});
        currentState = await flightSuretyData.isOperational.call({from: flightSuretyApp.address});
        assert.equal(currentState, false, 'Operational status should be true');

        let deniedAccess = false;
        try {
            await flightSuretyData.authorizeCaller(accounts[2], true);
        } catch (err) {
            deniedAccess = true;
        }
        assert.equal(deniedAccess, true, 'Access was not granted when not operational');
    });

    it('reenable operational status', async () => {
        const flightSuretyData = await FlightSuretyData.deployed();
        const flightSuretyApp = await FlightSuretyApp.deployed();
        await flightSuretyData.setOperationalStatus(true, {from: accounts[0]});
        let currentState = await flightSuretyData.isOperational.call({from: flightSuretyApp.address});
        assert.equal(currentState, true, 'Operational status should be true');
    });

    // it('AuthorizedCaller fired when adding a new caller', async () => {
    //     const result = await config.flightSuretyData.authorizeCaller(accounts[3], true);
    //     const isAuthorizedCallerFired = result.logs[0].event;
    //     assert.equal(isAuthorizedCallerFired, 'AuthorizedCaller', 'AuthorizedCaller event was not emitted');
    // });
    //
    // it('OperationalStatusChanged fired when changing status', async () => {
    //     const result = await config.flightSuretyData.setOperationalStatus(false, {from: accounts[0]});
    //     const isOperationalStatusChanged = result.logs[0].event;
    //     assert.equal(isOperationalStatusChanged, 'OperationalStatusChanged', 'AuthorizedCaller event was not emitted');
    // });
});