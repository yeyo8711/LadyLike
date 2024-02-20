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

const arguments = require("./arguments");

const Verify = async () => {
  await hre.run("verify:verify", {
    address: contractAddress,
    contract: `contracts/${contractName}.sol:${contractName}`,
    constructorArguments: arguments,
  });
};

Verify().catch((error) => {
  if (error) console.log(error);
});
