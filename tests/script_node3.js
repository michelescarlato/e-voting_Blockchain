const driver = require('bigchaindb-driver')

const API_PATH = 'http://128.163.232.72:9984/api/v1/'

var date = new Date();
var timestamp = date.getTime();

let fs = require('fs')

let filename_pubkey = "distc.pubkey"
let distc_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + distc_pubkey)

let filename_privkey = "distc.privkey"
let distc_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + distc_privkey)

//let createTxId
const assetdata = { "Vote": "Pink" }
//const DistrictNode = document.querySelector('meta[name="description"]').content;
const metadata = { "Token": "323456789101112131415" }//, "District": "DistrictC" }

//const metadata = {"what": "My first bigchaindb transaction TEST"}
// Construct a transaction payload
const txCreatedistcSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(distc_pubkey))
        ],
        distc_pubkey
)
// Sign the transaction with private keys of distc to fulfill it
const txCreatedistcSimpleSigned = driver.Transaction.signTransaction(txCreatedistcSimple, distc_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreatedistcSimpleSigned)
