const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "spirit supply whale amount human item harsh scare congress discover talent hamster";

module.exports = {
    networks: {
        development: {
            provider: function() {
                return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/", 0, 100);
            },
            network_id: '*'
        }
    },
    compilers: {
        solc: {
            version: "^0.6.0"
        }
    }
};