const driver = require('bigchaindb-driver')
const fs = require('fs');


let DistA = new driver.Ed25519Keypair()
let DistB = new driver.Ed25519Keypair()
let DistC = new driver.Ed25519Keypair()

global.DistA_pubkey = DistA.publicKey;
global.DistA_privkey = DistA.privateKey;

global.DistB_pubkey = DistB.publicKey;
global.DistB_privkey = DistB.privateKey;

global.DistC_pubkey = DistC.publicKey;
global.DistC_privkey = DistC.privateKey;


console.log('DistrictA public key: ', DistA_pubkey)
console.log('DistrictA private key: ', DistA_privkey)

console.log('DistrictB public key: ', DistB_pubkey)
console.log('DistrictB private key: ', DistB_privkey)

console.log('DistrictC public key: ', DistC_pubkey)
console.log('DistrictC private key: ', DistC_privkey)




fs.writeFileSync('DistA.pubkey', DistA_pubkey);
fs.writeFileSync('DistA.privkey', DistA_privkey);
fs.writeFileSync('DistB.pubkey', DistB_pubkey);
fs.writeFileSync('DistB.privkey', DistB_privkey);
fs.writeFileSync('DistC.pubkey', DistC_pubkey);
fs.writeFileSync('DistC.privkey', DistC_privkey);
