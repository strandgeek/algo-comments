import React, { FC } from 'react';
import { algoClient } from './algo'
import algosdk from 'algosdk'
import { ApolloClient, ApolloProvider } from '@apollo/client'


import { Menu } from '@headlessui/react'
import { Config } from './types/config';
import { CommentsWidget } from './components/CommentsWidget';

function MyDropdown() {
  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}


const App: FC<{ client: ApolloClient<any>, config: Config }> = ({ client, config }) => {


  const connectWallet = async () => {
    // await AlgoSigner.connect()
  }


  const onCommentClick = async () => {
    // const params = await algoClient.getTransactionParams().do();

    // const txn = algosdk.makeApplicationNoOpTxnFromObject({
    //   // from: meData?.me?.address!,
    //   appIndex: 119731081,
    //   appArgs:  [
    //     new Uint8Array(Buffer.from('optin_asset'))
    //   ],
    //   suggestedParams: {
    //     ...params
    //   },
    // });

    // const txnB64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    // const signedTxns = await AlgoSigner.signTxn([{txn: txnB64}])

    // const tx = await AlgoSigner.send({
    //   ledger: 'TestNet',
    //   tx: signedTxns[0].blob
    // })

    // const txConfirmed = await algosdk.waitForConfirmation(
    //   algoClient,
    //   tx.txId,
    //   4
    // );

    // console.log(txConfirmed)
  }


  return (
    <ApolloProvider client={client}>
      <CommentsWidget config={config} />
    </ApolloProvider>
  );
}

export default App;
