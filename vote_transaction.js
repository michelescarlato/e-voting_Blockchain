
function sendTransatcionToBigChainDB (assetdata){
      // BigchainDB server instance or testnetwork (e.g. https://example.com/api/v1/)
      //const API_PATH = 'http://192.168.100.126:9984/api/v1/'
      const API_PATH = 'http://localhost:9984/api/v1/'
      const DNode = new BigchainDB.Ed25519Keypair()
      let createTxId
      const DistrictNode = document.querySelector('meta[name="description"]').content;

      const metadata = {"Token":"123456789101112131415", "District":+DistrictNode+""}
      // Construct a transaction payload
      const txCreateDNodeSimple = BigchainDB.Transaction.makeCreateTransaction(
              assetdata,
              metadata,
              // A transaction needs an output
              [ BigchainDB.Transaction.makeOutput(
                              BigchainDB.Transaction.makeEd25519Condition(DNode.publicKey))
              ],
              DNode.publicKey
      )

      // Sign the transaction with private keys of DNode to fulfill it
      const txCreateDNodeSimpleSigned = BigchainDB.Transaction.signTransaction(txCreateDNodeSimple, DNode.privateKey)
      // Send the transaction off to BigchainDB
      let conn = new BigchainDB.Connection(API_PATH)
      conn.postTransactionCommit(txCreateDNodeSimpleSigned)
      .then(res => {
            createTxId = res.id
            document.body.innerHTML ='<h3>Transaction created</h3>';
            document.body.innerHTML+=API_PATH
            document.body.innerHTML+='transactions/'
            document.body.innerHTML+=txCreateDNodeSimpleSigned.id
            document.body.innerhtml.href = API_PATH + 'transactions/' + txCreateDNodeSimpleSigned.id

        })
      return;
}
