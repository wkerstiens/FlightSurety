// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    // DATA VARIABLES
    mapping (address => bool) public authorizedCallers;
    address private _contractOwner;
    bool private _isOperational;

    // EVENTS
    event AuthorizedCaller(address caller);
    event OperationalStatusChanged(bool newStatus);

    // FUNCTION MODIFIERS
    modifier requireIsOperational() {
        require(isOperational(), "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }
    modifier requireContractOwner() {
        require(isOwner(), "Caller is not contract owner");
        _;
    }

    modifier requireAuthorizedCaller() {
        require(authorizedCallers[msg.sender] == true, "Not Authorized Caller");
        _;
    }

    // CONSTRUCTOR
    constructor() public {
        _contractOwner = msg.sender;
        authorizedCallers[_contractOwner] = true;
        _isOperational = true;
    }

    // UTILITY FUNCTIONS
    function isOwner() public view requireAuthorizedCaller returns(bool) {
        return msg.sender == _contractOwner;
    }

    function isOperational() public view requireAuthorizedCaller returns(bool) {
        return _isOperational;
    }

    // SMART CONTRACT FUNCTIONS
    function authorizeCaller(address contractAddress, bool setting) public requireIsOperational requireContractOwner {
        authorizedCallers[contractAddress] = setting;
        emit AuthorizedCaller(contractAddress);
    }

    function setOperationalStatus(bool status) external requireContractOwner {
        require(status != _isOperational, "Can't set status to current status");
        _isOperational = status;
        emit OperationalStatusChanged(_isOperational);
    }

//    function fund() public payable {
//
//    }
//
//    // FALLBACK FUNCTION
//    fallback() external payable {
//        fund();
//    }
}
