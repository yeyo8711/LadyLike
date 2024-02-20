require("dotenv").config();
const { ethers } = require("ethers");
const pairAbi = require("../ABIS/pairAbi.json");
const contractName = process.env.CONTRACT_NAME;
const contractABI =
  require(`../artifacts/contracts/${contractName}.sol/${contractName}.json`).abi;
const { contractAddress, pairAddress } = require("./addresses");
// MAKE SURE TO CHANGE PROVIDER TO DESIRED NETWORK
const rpc = process.env.DEPLOY_RPC;
const provider = new ethers.JsonRpcProvider(rpc);
// Creates the Wallet
const wallet = new ethers.Wallet(process.env.PK, provider);
// Creates Contract Object
const Contract = new ethers.Contract(contractAddress, contractABI, wallet);
const Pair = new ethers.Contract(pairAddress, pairAbi, wallet);

const Burn = async () => {
  // Get LP balance of deployer wallet
  const LPBalance = await Pair.balanceOf(wallet.address);
  console.log(`Deployer has ${ethers.formatEther(LPBalance)} of LP.`);
  console.log("Burning..");
  const burnLP = await Pair.transfer(ethers.ZeroAddress, LPBalance);
  await burnLP.wait();
  console.log("Burn finished. Transaction Hash: ", burnLP.hash);
};

Burn().catch((error) => {
  if (error) console.log(error);
});
