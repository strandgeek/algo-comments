import algosdk from 'algosdk'
import React, { FC, useState } from 'react'
import { algoClient } from '../algo'
import { Project, ProjectQuery, useCreateCommentMetadataMutation } from '../generated/graphql'
import { Config } from '../types/config'

export interface NewCommentProps {
  config: Config
  project: ProjectQuery['project']
}

export const NewComment: FC<NewCommentProps> = ({ project, config }) => {
  const [message, setMessage] = useState('')
  const [createMetadataMutate] = useCreateCommentMetadataMutation()
  const onSubmit : React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const { data } = await createMetadataMutate({
      variables: {
        input: {
          message,
        }
      }
    })
    if (!data) {
      return
    }
    const { url } = data.createCommentMetadata
    const cid = url.replace('ipfs://', '')


    const { AlgoSigner } = window
    await AlgoSigner.connect()

    const accounts = await AlgoSigner.accounts({
      ledger: 'TestNet'
    })

    const params = await algoClient.getTransactionParams().do();

    const noteStr = config.slug.padEnd(256, '.') + cid
    console.log(noteStr.length)

    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      from: accounts[0].address,
      appIndex: project?.appId,
      appArgs:  [
        new Uint8Array(Buffer.from('post_comment'))
      ],
      note: new Uint8Array(Buffer.from(noteStr)),
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
      <form onSubmit={onSubmit}>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  )
}
