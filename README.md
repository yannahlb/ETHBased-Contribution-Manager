# Ethereum Based Contribution Manager

This project demonstrates how to create a decentralized application (DApp) that allows users to deposit Ether (ETH) into a smart contract. The application enables users to contribute ETH to a contract, track the total contributions, view the last deposit date, and toggle the visibility of the connected wallet address.


## Description

The smart contract provides functions to:

- Contribute ETH: Deposit ETH into the contract.
- Balance Tracking: View the contract’s balance
- Contribution Tracking: Track total contributions.
- Date Tracking:Show the last contribution time.
- Account Visibility Toggle: Toggle the visibility of the connected account address.
- User Authentication: Interact with the contract using MetaMask to make transactions.

This DApp offers an easy way to deposit and track ETH contributions on the Ethereum blockchain. It introduces basic Ethereum functionality for balance tracking and allows for managing contributions from a decentralized web interface.

## Getting Started

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.
After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Authors

Reannah Lobaton
@yannahlb

## License

This project is licensed under the MIT License - see the LICENSE.md file for details


## Preview:

![image](https://github.com/user-attachments/assets/17162488-e726-47dc-a63a-5cd7d9926804)
