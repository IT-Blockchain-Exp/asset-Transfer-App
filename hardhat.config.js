require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    volta: {
      url: "https://volta-rpc.energyweb.org",
      accounts: ["b9bf7aed5350cd6e079c6f757a9f69038614f96973408f6a16db91464d4c52fe"] // Use your actual private key securely
    }
  }
};
