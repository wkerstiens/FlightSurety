var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('Flight Surety Tests', async (accounts) => {

    var config;
    before('setup contract', async () => {
        config = await Test.Config(accounts);
        await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
    });

    /****************************************************************************************/
    /* Operations and Settings                                                              */
    /****************************************************************************************/

    it(`Has correct initial isOperational() value`, async function () {

        // Get operating status
        let status = await config.flightSuretyData.isOperational.call();
        assert.equal(status, true, "Incorrect operating status value");

    });
    /*
    it(`(passenger) can withdraw ones insurance`, async function () {

      let passenger = accounts[2];
      await config.flightSuretyApp.buy(1 , "Flight no1", { from: passenger });
      await config.flightSuretyApp.pay({ from: passenger });
      let transffunds = await config.flightSuretyApp.getPassengersInsurance({ from: passenger});
      console.log(transffunds);
      assert.equal(transffunds, 1, "Funds are not transfered.")

    });*/

    it(`Non Contract Owner cannot change operational status`, async function () {

        // Ensure that access is denied for non-Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyData.setOperatingStatus(false, {from: config.testAddresses[2]});
        } catch (error) {
            accessDenied = true;
        }
        assert.equal(accessDenied, true, "Access does not apper to be restricted to Contract Owner");

    });

    it(`Contract Owner can change operational status`, async function () {

        // Ensure that access is allowed for Contract Owner account
        let accessDenied = false;
        try {
            await config.flightSuretyData.setOperatingStatus(false);
        } catch (error) {
            accessDenied = true;
        }
        assert.equal(accessDenied, false, "Access not restricted to Contract Owner");

    });

    it(`Can block access to functions using requireIsOperational when operating status is false`, async function () {

        let reverted = false;
        try {
            await config.flightSuretyApp.registerAirline(0x0000);
        } catch (error) {
            reverted = true;
        }
        assert.equal(reverted, true, "Access not blocked for requireIsOperational");

        // Set it back for other tests to work
        await config.flightSuretyData.setOperatingStatus(true);

    });

    it('Cannot register an Airline using registerAirline() if it is not funded', async () => {
        const newAirline = accounts[2];

        try {
            await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
        } catch (error) {
        }
        const result = await config.flightSuretyData.isAirline(newAirline);
        assert.equal(result, false, "Airline should not be able to register another airline if it hasn't provided funding");
    });

    it('Only existing airline may register a new airline until there are at least four airlines registered', async () => {
        const newAirline = accounts[2];
        const fundingAmount = config.weiMultiple * 10;

        try {
            await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
        } catch (error) {
        }

        let result = await config.flightSuretyData.isAirlineRegistered(newAirline);
        assert.equal(result, false, "Airline was registered but it should not.");

        await config.flightSuretyApp.fundAirline({from: config.firstAirline, value: fundingAmount});

        try {
            await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
        } catch (error) {
            console.log(error);
        }
        result = await config.flightSuretyData.isAirlineRegistered(newAirline);
        assert.equal(result, true, "Airline was not registered but it should.");

    });


    it('Registration of fifth and subsequent airlines requires multi-party consensus of 50% of registered airliner', async () => {
        const newAirline1 = accounts[3];
        const newAirline2 = accounts[4];
        const newAirline3 = accounts[5];
        const newAirline4 = accounts[6];

        const fundingAmount = new BigNumber(config.weiMultiple * 10);

        await config.flightSuretyApp.registerAirline(newAirline1, {from: config.firstAirline});
        let result = await config.flightSuretyData.isAirlineRegistered(newAirline1);
        assert(result, true, 'Airline was not registered');

        await config.flightSuretyApp.registerAirline(newAirline2, {from: config.firstAirline});
        result = await config.flightSuretyData.isAirlineRegistered(newAirline2);
        assert(result, true, 'Airline was not registered');

        await config.flightSuretyApp.registerAirline(newAirline3, {from: config.firstAirline});
        result = await config.flightSuretyData.isAirlineRegistered(newAirline3);
        assert(result, true, 'Airline was not registered');

        // let's fund the other airlines so we can register number4 which is the fifth airline
        await config.flightSuretyApp.fundAirline({from: newAirline1, value: fundingAmount});
        await config.flightSuretyApp.fundAirline({from: newAirline2, value: fundingAmount});
        await config.flightSuretyApp.fundAirline({from: newAirline3, value: fundingAmount});

        await config.flightSuretyApp.registerAirline(newAirline4, {from: newAirline1});
        await config.flightSuretyApp.registerAirline(newAirline4, {from: newAirline2});

        result = await config.flightSuretyApp.isAirlineRegistered(newAirline4);

        assert.equal(result, true, 'Airline was not registered');
    });


    it('Can\'t vote twice for the same airline', async () => {
        const newAirline = accounts[7];
        try {
            await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
            await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
        } catch (error) {
        }
        let result = await config.flightSuretyApp.isAirlineRegistered(newAirline);
        assert.equal(result, false, "Airline was registered but it should not have.");
    });

    it('Can register flight', async () => {
       await config.flightSuretyApp.registerFlight('Test Flight #1', new Date().getTime(), {from: config.firstAirline});
       await config.flightSuretyApp.registerFlight('Test Flight #2', new Date().getTime(), {from: config.firstAirline});
    });

    it('Can get current flights', async () => {
       let results = await config.flightSuretyApp.getCurrentFlights();
       assert.equal(results.length, 2, 'Should only have two flights registered');
    });

    it('Can get flight detail', async () => {
        let flights = await config.flightSuretyApp.getCurrentFlights();
        let results = await config.flightSuretyApp.getFlightInformation(flights[0]);
        assert.equal(results[0], 'Test Flight #1', 'The flights don\'t match');
    });

});
