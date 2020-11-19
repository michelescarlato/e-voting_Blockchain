const driver = require('bigchaindb-driver')

const API_PATH = 'http://128.163.232.68:9984/api/v1/'
//var date = new Date();
//var timestamp = date.getTime();

let fs = require('fs')
let filename_pubkey = "distb.pubkey"
let distb_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + distb_pubkey)
let filename_privkey = "distb.privkey"
let distb_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + distb_privkey)
const assetdata = { "Vote": "Brown" }
//const DistrictNode = document.querySelector('meta[name="description"]').content;
const metadata = { "Token": "223456789101112131415" }//, "District": "DistrictB" }
// Construct a transaction payload
const txCreatedistbSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(distb_pubkey))
        ],
        distb_pubkey
)
// Sign the transaction with private keys of distb to fulfill it
const txCreatedistbSimpleSigned = driver.Transaction.signTransaction(txCreatedistbSimple, distb_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreatedistbSimpleSigned)
