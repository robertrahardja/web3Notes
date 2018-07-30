
const contractAbi = require("./abi")
const ContractAddress = require("./ContractAddress")

const Tx = require('ethereumjs-tx');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const fromAddress = "0xe43C78D27359a96cc2d641F66914FA3440fC7506";

//for contract variable changes, account needs to be unlocked
web3.eth.defaultAccount = fromAddress
web3.personal.unlockAccount(web3.eth.defaultAccount)

var contractInstance = web3.eth.contract(contractAbi).at(ContractAddress);


//solidity contract has two functions
/*  
function setTestFunction(string _stringParameter, uint _intParameter) public {
       stringName = _stringParameter;
       intName = _intParameter;
   }
   
   function getTestFunction() public constant returns (string, uint) {
       return (stringName, intName);
   }
*/

//set function with two arguments
contractInstance.setTestFunction("yoohoo", 4);
console.log ("Arguments are yoohoo and 4")

//get data
var data = contractInstance.getTestFunction.call();
console.log(data[0])
console.log(data[1].toNumber())
