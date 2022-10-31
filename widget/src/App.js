import React from 'react';
import { algoClient } from './algo'
import algosdk from 'algosdk'

function App(){


  const connectWallet = async () => {
    await AlgoSigner.connect()
  }


  const onCommentClick = async () => {
    const params = await algoClient.getTransactionParams().do();

    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      // from: meData?.me?.address!,
      appIndex: 119731081,
      appArgs:  [
        new Uint8Array(Buffer.from('optin_asset'))
      ],
      suggestedParams: {
        ...params
      },
    });

    const txnB64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    const signedTxns = await AlgoSigner.signTxn([{txn: txnB64}])

    const tx = await AlgoSigner.send({
      ledger: 'TestNet',
      tx: signedTxns[0].blob
    })

    const txConfirmed = await algosdk.waitForConfirmation(
      algoClient,
      tx.txId,
      4
    );

    console.log(txConfirmed)
  }


  return (
    <div>
      <textarea />
      <button onClick={onCommentClick}>Comment</button>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default App;
