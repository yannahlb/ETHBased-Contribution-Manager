const hre = require("hardhat");

async function main() {
  // Remove the initBalance argument since the constructor does not take any
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(); // No arguments passed

  await assessment.deployed();

  console.log(`Contract deployed to ${assessment.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
