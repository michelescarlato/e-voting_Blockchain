const driver = require('bigchaindb-driver')

const API_PATH = 'http://128.163.232.67:9984/api/v1/'


var date = new Date();
var timestamp = date.getTime();


let fs = require('fs')

let filename_pubkey = "DistA.pubkey"
let DistA_pubkey = fs.readFileSync(process.cwd() + "/" + filename_pubkey).toString()
//console.log("Public key " + DistA_pubkey)

let filename_privkey = "DistA.privkey"
let DistA_privkey = fs.readFileSync(process.cwd() + "/" + filename_privkey).toString()
//console.log("Private key " + DistA_privkey)



const assetdata = {"Vote": "White"}
//const DistrictNode = document.querySelector('meta[name="description"]').content;
const metadata = {"Token":"123456789101112131415", "District":"DistrictA"}
// Construct a transaction payload
const txCreateDistASimple = driver.Transaction.makeCreateTransaction(
        assetdata,
        metadata,
        // A transaction needs an output
        [ driver.Transaction.makeOutput(
                        driver.Transaction.makeEd25519Condition(DistA_pubkey))
        ],
        DistA_pubkey
)
// Sign the transaction with private keys of DistA to fulfill it
const txCreateDistASimpleSigned = driver.Transaction.signTransaction(txCreateDistASimple, DistA_privkey)
// Send the transaction off to driver
let conn = new driver.Connection(API_PATH)
conn.postTransactionCommit(txCreateDistASimpleSigned)
