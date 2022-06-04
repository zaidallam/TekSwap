// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TekToken is ERC20 {
    constructor() ERC20("Tek Token", "TEKT") {
        _mint(msg.sender, 1000000e18);
    }
}