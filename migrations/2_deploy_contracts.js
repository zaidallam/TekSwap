const TekToken = artifacts.require("TekToken");
const TekSwap = artifacts.require("TekSwap");

module.exports = async function(deployer) {
  await deployer.deploy(TekToken);
  const token = await TekToken.deployed()

  await deployer.deploy(TekSwap, token.address);
  const tekSwap = await TekSwap.deployed()

  await token.transfer(tekSwap.address, '1000000000000000000000000');
};