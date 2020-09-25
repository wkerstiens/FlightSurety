// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    // DATA VARIABLES
    mapping (address => bool) public authorizedCallers;

    // EVENTS
    event AuthorizedCaller(address caller);

    // FUNCTION MODIFIERS

    // UTILITY FUNCTIONS
    function authorizeCaller(address contractAddress) public {
        require(!authorizedCallers[contractAddress], "This caller has already been authorized");
        authorizedCallers[contractAddress] = true;
        emit AuthorizedCaller(contractAddress);
    }

    // SMART CONTRACT FUNCTIONS

    function fund() public payable {

    }

    // FALLBACK FUNCTION
    fallback() external payable {
        fund();
    }
}
