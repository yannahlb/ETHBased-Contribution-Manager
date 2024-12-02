// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    address public owner;
    uint256 public balance;
    uint256 public totalContributions;
    uint256 public lastContributionTime;
    
    // Fee rate (in basis points, 100 basis points = 1%)
    uint256 public feeRate = 50; // 50 basis points = 0.5%

    // To track the total fees collected
    uint256 public totalFeesCollected;

    // Event declarations
    event Contribution(uint256 amount);
    event FeeCollected(uint256 feeAmount);

    // Constructor to set the owner on deployment
    constructor() {
        owner = msg.sender;
        balance = 0;
        totalContributions = 0;
        lastContributionTime = 0;
    }

    // Modifier to ensure the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    // Contribution function to send funds to the ATM with a fee
    function contribute(uint256 _amount) public payable onlyOwner {
        require(_amount > 0, "Contribution amount must be greater than 0");

        // Calculate the fee
        uint256 fee = (_amount * feeRate) / 10000;  // feeRate is in basis points
        uint256 amountAfterFee = _amount - fee;

        // Increase balance and total contributions
        balance += amountAfterFee;
        totalContributions += amountAfterFee;

        // Update the total fees collected
        totalFeesCollected += fee;

        // Update the last contribution time
        lastContributionTime = block.timestamp;

        // Emit the Contribution event
        emit Contribution(amountAfterFee);
        emit FeeCollected(fee);
    }

    // Getter functions to fetch the state
    function getBalance() public view returns (uint256) {
        return balance;
    }

    function getTotalContributions() public view returns (uint256) {
        return totalContributions;
    }

    function getLastContributionTime() public view returns (uint256) {
        return lastContributionTime;
    }

    function getTotalFeesCollected() public view returns (uint256) {
        return totalFeesCollected;
    }
}
