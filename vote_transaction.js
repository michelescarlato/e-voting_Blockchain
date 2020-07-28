
function sendTransatcionToBigChainDB (assetdata){
      // BigchainDB server instance or testnetwork (e.g. https://example.com/api/v1/)
      //const API_PATH = 'http://192.168.100.126:9984/api/v1/'
      const API_PATH = 'http://localhost:9984/api/v1/'
      // Create a new keypair for Alice and Bob
      const alice = new BigchainDB.Ed25519Keypair()
      let createTxId
      const DistrictNode = document.querySelector('meta[name="description"]').content;
      
      const metadata = {"Token":"123456789101112131415", "District":+DistrictNode+""}
      // Construct a transaction payload
      const txCreateAliceSimple = BigchainDB.Transaction.makeCreateTransaction(
              assetdata,
              metadata,
              // A transaction needs an output
              [ BigchainDB.Transaction.makeOutput(
                              BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))
              ],
              alice.publicKey
      )

      // Sign the transaction with private keys of Alice to fulfill it
      const txCreateAliceSimpleSigned = BigchainDB.Transaction.signTransaction(txCreateAliceSimple, alice.privateKey)
      // Send the transaction off to BigchainDB
      let conn = new BigchainDB.Connection(API_PATH)
      conn.postTransactionCommit(txCreateAliceSimpleSigned)
      .then(res => {
            createTxId = res.id
            document.body.innerHTML ='<h3>Transaction created</h3>';
            document.body.innerHTML+=API_PATH
            document.body.innerHTML+='transactions/'
            document.body.innerHTML+=txCreateAliceSimpleSigned.id
            document.body.innerhtml.href = API_PATH + 'transactions/' + txCreateAliceSimpleSigned.id

        })
      return;
}
