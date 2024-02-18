require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    // Main Nets
    bsc: {
      url: "https://rpc.ankr.com/bsc/",
      accounts: [process.env.PK],
    },
    eth: {
      url: "https://rpc.ankr.com/eth",
      accounts: [process.env.PK],
    },
    matic: {
      url: "https://rpc.ankr.com/polygon/",
      accounts: [process.env.PK],
    },
    // Test Nets
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [process.env.PK],
    },
    sepolia: {
      url: "https://rpc.ankr.com/eth_sepolia/",
      accounts: [process.env.PK],
    },
    tbsc: {
      url: "https://rpc.ankr.com/bsc_testnet_chapel/",
      accounts: [process.env.PK],
    },
    tarb: {
      url: "https://arbitrum-goerli.blockpi.network/v1/rpc/public",
      accounts: [process.env.PK],
    },
    fuji: {
      url: "https://rpc.ankr.com/avalanche_fuji-c",
      accounts: [process.env.PK],
    },
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai/",
      accounts: [process.env.PK],
    },
  },
  etherscan: {
    //apiKey: "2EHDUE4VIK9UZQ9PXYFZYY1QQTTTSBUB5G", // bsc
    apiKey: process.env.ETHERSCAN_API_KEY, // eth
  },
  sourcify: {
    enabled: true,
  },
  solidity: {
    version: "0.8.22",

    settings: {
      evmVersion: "paris",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
