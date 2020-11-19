const driver = require('bigchaindb-driver')
const fs = require('fs');


let dista = new driver.Ed25519Keypair()
let distb = new driver.Ed25519Keypair()
let distc = new driver.Ed25519Keypair()

global.dista_pubkey = dista.publicKey;
global.dista_privkey = dista.privateKey;

global.distb_pubkey = distb.publicKey;
global.distb_privkey = distb.privateKey;

global.distc_pubkey = distc.publicKey;
global.distc_privkey = distc.privateKey;


console.log('DistrictA public key: ', dista_pubkey)
console.log('DistrictA private key: ', dista_privkey)

console.log('DistrictB public key: ', distb_pubkey)
console.log('DistrictB private key: ', distb_privkey)

console.log('DistrictC public key: ', distc_pubkey)
console.log('DistrictC private key: ', distc_privkey)




fs.writeFileSync('dista.pubkey', dista_pubkey);
fs.writeFileSync('dista.privkey', dista_privkey);
fs.writeFileSync('distb.pubkey', distb_pubkey);
fs.writeFileSync('distb.privkey', distb_privkey);
fs.writeFileSync('distc.pubkey', distc_pubkey);
fs.writeFileSync('distc.privkey', distc_privkey);
