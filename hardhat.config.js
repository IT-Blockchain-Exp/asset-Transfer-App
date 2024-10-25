require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const API_URL = "https://volta-rpc.energyweb.org/"; 
const PRIVATE_KEY = "c617a366800a3ee2ab579afc7cc9f97d193fe58a20917346293e4351d442b0e9"; 

module.exports = {
  solidity: "0.8.0",  // Specify the Solidity version
  networks: {
    volta: {
      url: API_URL || "https://volta-rpc.energyweb.org/",
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
