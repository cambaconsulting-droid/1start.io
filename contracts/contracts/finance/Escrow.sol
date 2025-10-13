// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is Ownable {
    address public buyer;
    address payable public seller;
    uint256 public depositAmount;

    enum State { Created, Locked, Released, Refunded }
    State public currentState;

    event FundsDeposited(address indexed buyer, uint256 amount);
    event FundsReleased(address indexed seller, uint256 amount);
    event FundsRefunded(address indexed buyer, uint256 amount);

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Escrow: Caller is not the buyer");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Escrow: Caller is not the seller");
        _;
    }

    constructor(address payable _seller, uint256 _depositAmount) Ownable(msg.sender) {
        buyer = msg.sender;
        seller = _seller;
        depositAmount = _depositAmount;
        currentState = State.Created;
    }

    function deposit() external payable onlyBuyer {
        require(currentState == State.Created, "Escrow: Already locked");
        require(msg.value == depositAmount, "Escrow: Incorrect deposit amount");
        currentState = State.Locked;
        emit FundsDeposited(buyer, msg.value);
    }

    function releaseFunds() external onlyBuyer {
        require(currentState == State.Locked, "Escrow: Not locked");
        currentState = State.Released;
        (bool success, ) = seller.call{value: depositAmount}("");
        require(success, "Escrow: Transfer failed");
        emit FundsReleased(seller, depositAmount);
    }

    function refundFunds() external onlySeller {
        require(currentState == State.Locked, "Escrow: Not locked");
        currentState = State.Refunded;
        (bool success, ) = payable(buyer).call{value: depositAmount}("");
        require(success, "Escrow: Transfer failed");
        emit FundsRefunded(buyer, depositAmount);
    }
}