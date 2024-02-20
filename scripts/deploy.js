require("dotenv").config();
const hre = require("hardhat");
const { ethers } = require("ethers");
const fs = require("fs");

const contractName = process.env.CONTRACT_NAME;

async function main() {
  // deployContract("NAME OF CONTACT", [any constructor arguments seperated by commas], {value : if you need to send eth with deployment})
  //  If you dont have constructor arguments or need to send eth, it will look like this:
  // await hre.ethers.deployContract("TEST")
  try {
    const Contract = await hre.ethers.deployContract(
      `${contractName}`,
      ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", [1]],
      { gasLimit: 7000000 }
    );

    await Contract.waitForDeployment();

    console.log(`Contract deployed to ${Contract.target}`);
    // The amount you want to add liq with goes here. Repalce 0.05
    console.log("Adding Liq..");
    const addLiq = await Contract.addLiq({
      value: ethers.parseEther("0.05"),
      gasLimit: 500000,
    });
    await addLiq.wait();
    console.log(
      "Liquidity Added",
      `https://goerli.etherscan.io/tx/${addLiq.hash}`
    );

    // Uniswap Pair MUST BE PUBLIC for us to fetch it
    const pair = await Contract.uniswapV2Pair();

    fs.writeFile(
      "./scripts/addresses.js",
      `const contractAddress = "${Contract.target}";\n const pairAddress = "${pair}"\n module.exports = { contractAddress, pairAddress };`,
      (error) => {
        if (error) console.log(error);
      }
    );
  } catch (error) {
    console.log(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
