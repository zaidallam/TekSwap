const TekToken = artifacts.require("TekToken");
const TekSwap = artifacts.require("TekSwap");

module.exports = async function(deployer) {
  await deployer.deploy(TekToken);
  const token = await TekToken.deployed()

  await deployer.deploy(TekSwap, token.address);
  const ethSwap = await TekSwap.deployed()

  await token.transfer(ethSwap.address, '1000000');
};