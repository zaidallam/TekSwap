// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TekToken.sol";

contract TekSwap {
    string public name = "TekSwap Decentralized Exchange";
    TekToken public token;
    uint256 public rate = 100;

    event Sold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event Purchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(TekToken _token) {
        token = _token;
    }

    function buy() public payable {
        uint256 tokenAmount = msg.value * rate;

        require(token.balanceOf(address(this)) >= tokenAmount, "Token liquidity is insufficient");

        token.transfer(msg.sender, tokenAmount);
        emit Purchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sell(uint256 _amount) public {
        require(token.balanceOf(msg.sender) >= _amount);

        uint256 etherAmount = _amount / rate;

        require(address(this).balance >= etherAmount, "Ether liquidity is insufficient");

        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);

        emit Sold(msg.sender, address(token), _amount, rate);
    }
}
