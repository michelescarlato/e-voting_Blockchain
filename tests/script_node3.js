const driver = require('bigchaindb-driver')

const API_PATH = 'http://128.163.232.72:9984/api/v1/'

var date = new Date();
var timestamp = date.getTime();

let fs = require('fs')

let filename_pubkey = "DistC.pubkey"
let DistC_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + DistC_pubkey)

let filename_privkey = "DistC.privkey"
let DistC_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + DistC_privkey)

//let createTxId
const assetdata = {"Vote": "Pink"}
//const DistrictNode = document.querySelector('meta[name="description"]').content;
const metadata = {"Token":"323456789101112131415", "District":"DistrictC"}

//const metadata = {"what": "My first bigchaindb transaction TEST"}
// Construct a transaction payload
const txCreateDistCSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(DistC_pubkey))
        ],
        DistC_pubkey
)
// Sign the transaction with private keys of DistC to fulfill it
const txCreateDistCSimpleSigned = driver.Transaction.signTransaction(txCreateDistCSimple, DistC_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreateDistCSimpleSigned)
