const driver = require('bigchaindb-driver')

const API_PATH = 'http://128.163.232.68:9984/api/v1/'
//var date = new Date();
//var timestamp = date.getTime();

let fs = require('fs')
let filename_pubkey = "DistB.pubkey"
let DistB_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + DistB_pubkey)
let filename_privkey = "DistB.privkey"
let DistB_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + DistB_privkey)
const assetdata = {"Vote": "Brown"}
//const DistrictNode = document.querySelector('meta[name="description"]').content;
const metadata = {"Token":"223456789101112131415", "District":"DistrictB"}
// Construct a transaction payload
const txCreateDistBSimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(DistB_pubkey))
        ],
        DistB_pubkey
)
// Sign the transaction with private keys of DistB to fulfill it
const txCreateDistBSimpleSigned = driver.Transaction.signTransaction(txCreateDistBSimple, DistB_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreateDistBSimpleSigned)
