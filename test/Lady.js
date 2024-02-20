const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  let owner, otherAccount, test;
  this.beforeAll("Setup", async function () {
    // Contracts are deployed using the first signer/account by default
    [owner, otherAccount] = await ethers.getSigners();
    const Test = await ethers.getContractFactory("TEST2");
    test = await Test.deploy([owner.address, [1]]);
  });

  it("Deployed", async function () {
    console.log(test.address);
  });
});
