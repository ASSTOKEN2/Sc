/*-
 *
 * Hedera Hardhat Example Project
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const { ethers } = require('hardhat');

module.exports = async () => {
  //Assign the first signer, which comes from the first privateKey from our configuration in hardhat.config.js, to a wallet variable.
  let wallet = (await ethers.getSigners())[0];

  //Initialize a contract factory object
  //name of contract as first parameter
  //wallet/signer used for signing the contract calls/transactions with this contract
  const LendingToken = await ethers.getContractFactory('LendingToken', wallet);
  // const TokenERC20 = await ethers.getContractFactory('TokenERC20', wallet);
  // const TokenERC721 = await ethers.getContractFactory('TokenERC721', wallet);
  //Using already intilized contract facotry object with our contract, we can invoke deploy function to deploy the contract.
  //Accepts constructor parameters from our contract
  const lendingToken = await LendingToken.deploy();
  // const tokenERC20 = await TokenERC20.deploy("TokenA", "A");
  // const tokenERC721 = await TokenERC721.deploy("NFT", "NFT");

  //We use wait to recieve the transaction (deployment) receipt, which contrains contractAddress
  const contractAddressLendingToken = (
    await lendingToken.deployTransaction.wait()
  ).contractAddress;

  const contractAddressTokenERC20 = (await tokenERC20.deployTransaction.wait())
    .contractAddress;

  const contractAddressTokenERC721 = (
    await tokenERC721.deployTransaction.wait()
  ).contractAddress;

  console.log(`LendingToken deployed to: ${contractAddressLendingToken}`);
  console.log(`TokenERC20 deployed to: ${contractAddressTokenERC20}`);
  console.log(`TokenERC721 deployed to: ${contractAddressTokenERC721}`);

  return {'LendingToken':contractAddressLendingToken,'TokenERC20':contractAddressTokenERC20,'TokenERC721':contractAddressTokenERC721};
};
