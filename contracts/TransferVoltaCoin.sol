// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferVoltaCoin {
    mapping(address => uint256) public balances; // Store user balances

    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor() {
        // Initial minting or setting up balances can be done here if needed
        // For example: balances[msg.sender] = initialSupply;
    }

    function transfer(address payable _to, uint256 _amount) public payable {
    require(msg.value >= _amount, "Insufficient VOLTA sent");
    _to.transfer(_amount);
    emit Transfer(msg.sender, _to, _amount);
    
    }

}
