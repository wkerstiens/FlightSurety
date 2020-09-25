const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const FlightSuretyData = artifacts.require("FlightSuretyData");
const BigNumber = require('bignumber.js');

exports.TestConfig = async function(accounts) {

    // My ganache-cli accounts and private keys
    // I will be using the accounts as follow:
    //                   0 : Contract Owner
    //              1 - 20 : Airlines
    //             21 - 40 : Oracles
    //             41 - 49 : Passengers
    //
    // Available Accounts
    // ==================
    // (0) 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95 (500 ETH)
    // (1) 0x018C2daBef4904ECbd7118350A0c54DbeaE3549A (500 ETH)
    // (2) 0xCe5144391B4aB80668965F2Cc4f2CC102380Ef0A (500 ETH)
    // (3) 0x460c31107DD048e34971E57DA2F99f659Add4f02 (500 ETH)
    // (4) 0xD37b7B8C62BE2fdDe8dAa9816483AeBDBd356088 (500 ETH)
    // (5) 0x27f184bdc0E7A931b507ddD689D76Dba10514BCb (500 ETH)
    // (6) 0xFe0df793060c49Edca5AC9C104dD8e3375349978 (500 ETH)
    // (7) 0xBd58a85C96cc6727859d853086fE8560BC137632 (500 ETH)
    // (8) 0xe07b5Ee5f738B2F87f88B99Aac9c64ff1e0c7917 (500 ETH)
    // (9) 0xBd3Ff2E3adEd055244d66544c9c059Fa0851Da44 (500 ETH)
    // (10) 0xEF40e53cB249a5eFc159D5aFd88bb02E2B7e8F39 (500 ETH)
    // (11) 0xCAd45f0cf1985E943098953D395d9712a656ab03 (500 ETH)
    // (12) 0xE09D28457b841701210020aa30EB3F46689Cb271 (500 ETH)
    // (13) 0xCdC1B730A7EB4Fa3A64999F3063821Aa5e2e8387 (500 ETH)
    // (14) 0xA3584fAbb2Fc5983dc39d2B56060DBB0635d47C1 (500 ETH)
    // (15) 0xEf7e24f6ff53CB0Bd06F6Fb21BE403c90CdD1ed7 (500 ETH)
    // (16) 0x4607636Caf072d12CFe94b782186AaC7867b4DF5 (500 ETH)
    // (17) 0x2897cFcAE9eD64B3bd1de3f58d377DC6d67D2d59 (500 ETH)
    // (18) 0x93F37B308E13EF9507e9eF79685B16290A5a48f5 (500 ETH)
    // (19) 0x11e28Ad71875bF788eA9B845B63192FC9754BF3a (500 ETH)
    // (20) 0xaFDD6c9449d9Cb80F7Bd763E0f0C392571CcD2e3 (500 ETH)
    // (21) 0xb183705eE6Ec61527fda3160ff2535d3D44cE128 (500 ETH)
    // (22) 0x4fC7bF995e89e49e8B0671808f0EC38Cc6df9D13 (500 ETH)
    // (23) 0x9706c7a4f3A3EB0A1F283ce78E07951AA44AE9cA (500 ETH)
    // (24) 0x2753E353f152E44A2F67931ECCc10F556e75E377 (500 ETH)
    // (25) 0x47b3724De8b41C8bD7e29B0B4301068C70220ea8 (500 ETH)
    // (26) 0x5613C61E2A8bC0dc7eD00573c96b77794fEF193b (500 ETH)
    // (27) 0x957533ee2c478183D3cb21615634bb4271f1E1eb (500 ETH)
    // (28) 0x8ACdc91CE4C4FCD9C2eD856f535A1d3243b6AE1f (500 ETH)
    // (29) 0xb26d4BD9322Acd67FB9AE035D9109f20C6De362d (500 ETH)
    // (30) 0xcf3258cdDD7Dc1861d5fC1Db27581466CAD564BB (500 ETH)
    // (31) 0x340b844B25B648A1FAb9C5aEA0f2CF8CEbbb7305 (500 ETH)
    // (32) 0xB1A18c25302e808a8Ce6f34CCBb231dF66334908 (500 ETH)
    // (33) 0x1bE76fA1187B1762B3744737eF53486fAc0566d2 (500 ETH)
    // (34) 0x5701E18Fd0825a8DE7dbEAe53d1475acbCe4330c (500 ETH)
    // (35) 0xa48CBA405225540d0763735105aee1c452353EdD (500 ETH)
    // (36) 0x810831e542Ba91678ae85adbafA9690f22b9809B (500 ETH)
    // (37) 0xA9CE92Ad84c18Bd90768013a7aF71E1Cc7DeAcdB (500 ETH)
    // (38) 0xc2382F18e3aCE202719A98E5c562606A26e94637 (500 ETH)
    // (39) 0x79Ec268C8e72d21DDE74AEdEE0129c99d740a63b (500 ETH)
    // (40) 0xaaBb6AdABc0E91f1D2908dD97fb4034f3a30b8A4 (500 ETH)
    // (41) 0x3404d480371E64B63f6551b5D5B4C718Cc8c41ec (500 ETH)
    // (42) 0xc24ADC6B0eDA6c504105448Fe4Ed132531854699 (500 ETH)
    // (43) 0xfe17e3956cC4c339b7150E5C49c48c76DD1A6B7A (500 ETH)
    // (44) 0xD9fdC7452da0C407cedC637d150Ca4d8981e34Fc (500 ETH)
    // (45) 0x6E90b9bc4b7aC46B0aCc473A9C4bDF7CeF2d13D8 (500 ETH)
    // (46) 0x5E57F886aEFecAf1710ed4427D118A1D1F84BBDd (500 ETH)
    // (47) 0x9BE819e8f7118c393d9C26a398BE30c839167036 (500 ETH)
    // (48) 0xbCe7e2542636e56d7728915aD13b48DfFb22d194 (500 ETH)
    // (49) 0x0F73A4A1086ea3F6D02077b26ec7d6b7EF68cA97 (500 ETH)

    // Private Keys
    // ==================
    // (0) 0x9137dc4de37d28802ff9e5ee3fe982f1ca2e5faa52f54a00a6023f546b23e779
    // (1) 0x18911376efeff48444d1323178bc9f5319686b754845e53eb1b777e08949ee9b
    // (2) 0xf948c5bb8b54d25b2060b5b19967f50f07dc388d6a5dada56e5904561e19f08b
    // (3) 0xfad19151620a352ab90e5f9c9f4282e89e1fe32e070f2c618e7bc9f6d0d236fb
    // (4) 0x19d1242b0a3f09e1787d7868a4ec7613ac4e85746e95e447797ce36962c7f68b
    // (5) 0x3bb675f8c07099816e23a3e283090cfb0f793ab625b73ca51a2d027a3c1f2d0e
    // (6) 0x0faf45306c7daf14d86c266690ce54490e8c0104154cafa87d9e93724efc239d
    // (7) 0xf2a921dee0ebd7bfaba1a271bcd48c99baa6341a1cdf84ba843521a5555e0273
    // (8) 0x62734594840dade92a24448c8f676cc3c59fd68909837303417295f2c0f27963
    // (9) 0xc29afb730456eb83415046550faf8065c8531765396156db8d97fd1fd64c6a6e
    // (10) 0xa7aa81f5e8d3e94853cb123b921eceda93d56e03963e5fe68377bb03260cad97
    // (11) 0xa28ff87990aa1003ee7b41b27999d668c548ae223a5ee2e9a235133f0a9c4034
    // (12) 0xdf8a527a50d95882c014fc5f380c5453d11ef5d4253c833f6bacfeeddc383bdc
    // (13) 0xce88867b1623b8b9344401bd71a45088dbf6f80d570320fd080b656e709864a3
    // (14) 0x9b6640526f045f6ef7f6d28b04f7e563803b06a5d1f950e0beea703700406edd
    // (15) 0x5129f66d2cd5fab723b45dcc654e42969ea6bc409ac9766613cf7685ef2bc607
    // (16) 0x452bf40538e1dd10807e9e6871f4bb260e48600c0017a0c2830b63e78fc0cf14
    // (17) 0x197f967dcd5572cdfb37c0059620c5c3ce13df5e35cab729a618cfc1e6edfb8d
    // (18) 0x35d1bc6d9774c1a675958844020e6a29f88a6e7afc5baeb1e1897e7209826b5c
    // (19) 0x969704467159dd72084d3f48ceb2fe688180c03abe008982b7e507abc74cb8eb
    // (20) 0x01db2e2b2370a03adf6d886e9bfdc6ff886e558b36bdb5063aa656b40b48149b
    // (21) 0xeb356d818aa8ff0fcb95f09a1f0bd84c2dad3291addead4c0dacb6443bd30000
    // (22) 0x9f2cb642e8129849f35891c2a304a3c97cc6b8c479ce20b4c8a1d074697af877
    // (23) 0x48de69f3c3e219d81995f6acae0fb792858d4c0dd35f2d0b632b729c429f51f2
    // (24) 0xab23b5aa1048e5ef8871cd162e1ad4032e3d78c654f428a16c5ec5f93bdd8411
    // (25) 0xd8bd61a220038285d42746a8d9e9e20a65e3a2da6ceb903778789eb87ae5bae2
    // (26) 0x5147b71ff1120ca2ba2ebbcb55ec892775bfa5649d662216a01ed584b736b35b
    // (27) 0xcf860ff0ca8cf642e9af41ce97931faf9a0b73df386db30e04456e923465fbb8
    // (28) 0x78375d071a40220a9c23fc7aebc578572e89dcf74052aff3f81d8b52b8806ec6
    // (29) 0x8e218f212769875ff989d64a1acbd61b2cc2f182e309096116725db9e0489f2d
    // (30) 0x85d2e4a5f435f51520c1557e354fdad41d1bd43b6eff15622e118953bad4a385
    // (31) 0x5c105859f0ee5fa2d540e9e432025ddaf8d6bccd09d18db3a81c2ef14824bc3a
    // (32) 0x447c6ccb80b0f793606d46a01cf2f61a5e74060ddfca9d4868361e0484d9dd6d
    // (33) 0xd74b4ee6a20cf9af3c3b64797a4436793ce92b354c30fc7f507f46c4794c404c
    // (34) 0x9017fc5be8bdb1cf746a8265970e671ba150af5b071d7291f25a56a760f829ce
    // (35) 0x6c18db9a1f91bd9fe305a7afa4ed02f35ea99cccfff08e971d068f22fee36c4d
    // (36) 0xef1ba8e9da4d137a84e5c5355b89ddbae2d6f408cc82493e06885f9d812be97f
    // (37) 0x1dc2ca0a93145ed93bb96190b55011de79c7b2e8acb1360bd27a705e6b7a644a
    // (38) 0x7952c5f139bb1026105d2affdac902f568aae3c805b64f58351d66f13811e8db
    // (39) 0x5eed9b490e63708bceafceb4ac61812e1d616dbeb15d10b93b326ba4244990d9
    // (40) 0xe607838d073bcdce8654b2bd99bf6eea5632ff989dae0e1ecb203b8c6544ab0d
    // (41) 0xd7d71608822c96d4cbeca5745d6785e0c8aee4c1e2becd0830c26c658071b834
    // (42) 0xecaba43a0866c39f73c140be70b762a44a65198e797c8f7edd52766e4dbb15d8
    // (43) 0xc641e8b32fa2f140902a25eac43083a4bfda4ec96fafccac97c314e5282e22c8
    // (44) 0x8a59b9cff00a9e3e810a1d129588715153a69aa22851c6f06267e4c08503fd5a
    // (45) 0x381b3ae9c8dc735d3f168e3a2c9a89b579f8baaabea99540898edae6e3c0a70e
    // (46) 0xb003a7c628e6b1835e6d4a0bba12a2a1e2ac3bb7fb0beba6d29120f056895dcd
    // (47) 0x3805b5f6dc48059ee65564a487c9314d5f48e38ede5f5ede439cb5c6ca31f19c
    // (48) 0x2c0cf7ed9481059792f869ef46876519a8f5f171219dec07b4c078544f5ea5fb
    // (49) 0xdb3af5efc3a613ebc53454ddef92eac6834b4fc1b927ff27a7640be867ff865a

    // These test addresses are useful when you need to add
    // multiple users in test scripts
    const testAddresses = [
        "0x69e1CB5cFcA8A311586e3406ed0301C06fb839a2",
        "0xF014343BDFFbED8660A9d8721deC985126f189F3",
        "0x0E79EDbD6A727CfeE09A2b1d0A59F7752d5bf7C9",
        "0x9bC1169Ca09555bf2721A5C9eC6D69c8073bfeB4",
        "0xa23eAEf02F9E0338EEcDa8Fdd0A73aDD781b2A86",
        "0x6b85cc8f612d5457d49775439335f83e12b8cfde",
        "0xcbd22ff1ded1423fbc24a7af2148745878800024",
        "0xc257274276a4e539741ca11b590b9447b26a8051",
        "0x2f2899d6d35b1a48a4fbdc93a37a72f264a9fca7"
    ];

    const owner = accounts[0];
    let firstAirline = accounts[1];

    const flightSuretyData = await FlightSuretyData.new();
    const flightSuretyApp = await FlightSuretyApp.new();

    return {
        owner: owner,
        firstAirline: firstAirline,
        weiMultiple: (new BigNumber(10)).pow(18),
        testAddresses: testAddresses,
        flightSuretyData: flightSuretyData,
        flightSuretyApp: flightSuretyApp
    }
};