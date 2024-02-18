1. Add your contract to the contracts folder

2. Check that your .env file has your PK and etherscan API KEY

3. deploy.js must have the correct name and any constructor arguments

4. "npx hardhat run scripts/deploy.js --network goerli" to deploy and add liq. You can change network to eth

5. To verify without constructor arguments:{
   npx hardhat verify DEPLOYED_CONTRACT_ADDRESS --network goerli
   }
   To verify WITH constructor arguments:{
   add them to arguments.js in order
   "npx hardhat verify --constructor-args scripts/arguments.js DEPLOYED_CONTRACT_ADDRESS --network goerli"
   }

6. Burn LP and Renounce, must check that all the info is correct (RPC, addresses automatically saved in addresses.js )

7. "npx hardhat run scripts/burnLpAndRenounce.js"

8. Terminal will print all the info you need
