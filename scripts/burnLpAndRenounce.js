require("dotenv").config();
const { ethers } = require("ethers");
const pairAbi = require("../ABIS/pairAbi.json");
// MAKE SURE TO CHANGE THIS
const contractABI = require("../artifacts/contracts/Test.sol/TEST.json").abi;
const { contractAddress, pairAddress } = require("./addresses");
// MAKE SURE TO CHANGE PROVIDER TO DESIRED NETWORK
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
// Creates the Wallet
const wallet = new ethers.Wallet(process.env.PK, provider);
// Creates Contract Object
const Contract = new ethers.Contract(contractAddress, contractABI, wallet);
const Pair = new ethers.Contract(pairAddress, pairAbi, wallet);

const BurnAndRenounce = async () => {
  // Get LP balance of deployer wallet
  const LPBalance = await Pair.balanceOf(wallet.address);
  console.log(`Deployer has ${ethers.formatEther(LPBalance)} of LP.`);
  console.log("Burning..");
  const burnLP = await Pair.transfer(ethers.ZeroAddress, LPBalance);
  await burnLP.wait();
  console.log("Burn finished. Transaction Hash: ", burnLP.hash);

  // Renounce
  console.log("Renounce initiated");
  const renounce = await Contract.renounceOwnership();
  await renounce.wait();
  console.log("Renounced. Tx Hash: ", renounce.hash);
};

BurnAndRenounce().catch((error) => {
  if (error) console.log(error);
});
