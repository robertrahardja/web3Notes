
const contractAbi = require("./odinAbi")
const ContractAddress = require("./odinContractAddress")

const Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const privateKey = "03beed06d9eba8514975f365c71b6276a32a5b5216dfe30deb71e376b62a866e";
//buffer required to sign transaction
var pkBuffer = new Buffer(privateKey, 'hex')

const toAddress = "0xbBaF02b7183066cE2676b38C62363236EDfaec05";
const fromAddress = "0xe43C78D27359a96cc2d641F66914FA3440fC7506";
const amount = 10;
const gasPrice = web3.eth.gasPrice.toNumber() * 2;
var gasLimit = 200000;
var nonce = web3.eth.getTransactionCount(fromAddress);

var contract = web3.eth.contract(contractAbi).at(ContractAddress);

var rawTransaction = {
    "from": fromAddress,
    "nonce": nonce,
    "gasPrice": gasPrice,
    "gasLimit": gasLimit,
    "to": ContractAddress,
    "value": "0x0",
    "data": contract.transfer.getData(toAddress, amount, {from: fromAddress}),
    "chainId": 5780,
};

var tx = new Tx(rawTransaction);

tx.sign(pkBuffer);
var serializedTx = tx.serialize();

web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    if (!err)
        console.log(hash);
    else
        console.log(err);
});


