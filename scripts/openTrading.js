require("dotenv").config();
const { ethers } = require("ethers");
const pairAbi = require("../ABIS/pairAbi.json");
// MAKE SURE TO CHANGE THIS
const contractABI = require("../artifacts/contracts/Test.sol/TEST.json").abi;
const { contractAddress, pairAddress } = require("./addresses");
// MAKE SURE TO CHANGE PROVIDER TO DESIRED NETWORK
const rpc = process.env.DEPLOY_RPC;
const provider = new ethers.JsonRpcProvider(rpc);
// Creates the Wallet
const wallet = new ethers.Wallet(process.env.PK, provider);
// Creates Contract Object
const Contract = new ethers.Contract(contractAddress, contractABI, wallet);
const Pair = new ethers.Contract(pairAddress, pairAbi, wallet);

const OpenTrade = async () => {
  // Renounce
  console.log("Enabling Trading");
  const openTrade = await Contract.openTrading({ gasLimit: 200000 });
  await openTrade.wait();
  console.log("Trading Now enabled. Tx Hash: ", openTrade.hash);
};

OpenTrade().catch((error) => {
  if (error) console.log(error);
});
