import algosdk from "algosdk";
import React, { FC, useState } from "react";
import { algoClient } from "../algo";
import {
  Project,
  ProjectQuery,
  useCreateCommentMetadataMutation,
} from "../generated/graphql";
import { Config } from "../types/config";

export interface NewCommentProps {
  config: Config;
  project: ProjectQuery["project"];
  onSubmit: () => void
}
import classnames from 'classnames'

export const NewComment: FC<NewCommentProps> = ({ project, config, onSubmit: onSubmitCallback }) => {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState<any>();
  const [optinNeeded, setOptinNeeded] = useState<boolean>();
  const [message, setMessage] = useState("");
  const [createMetadataMutate] = useCreateCommentMetadataMutation();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true)
    e.preventDefault();
    const { data } = await createMetadataMutate({
      variables: {
        input: {
          message,
        },
      },
    });
    if (!data) {
      return;
    }
    const { url } = data.createCommentMetadata;
    const cid = url.replace("ipfs://", "");

    const { AlgoSigner } = window;
    await AlgoSigner.connect();

    const accounts = await AlgoSigner.accounts({
      ledger: "TestNet",
    });

    const params = await algoClient.getTransactionParams().do();

    const noteStr = config.slug.padEnd(256, ".") + cid;

    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      from: accounts[0].address,
      appIndex: project?.appId,
      appArgs: [new Uint8Array(Buffer.from("post_comment"))],
      note: new Uint8Array(Buffer.from(noteStr)),
      suggestedParams: {
        ...params,
      },
    });

    const txnB64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    const signedTxns = await AlgoSigner.signTxn([{ txn: txnB64 }]);

    const tx = await AlgoSigner.send({
      ledger: "TestNet",
      tx: signedTxns[0].blob,
    });

    const txConfirmed = await algosdk.waitForConfirmation(
      algoClient,
      tx.txId,
      4
    );
    setLoading(false)
    setMessage('')
    onSubmitCallback()
  };

  const optinToken = async () => {
    setLoading(true)
    const { AlgoSigner } = window;
    const params = await algoClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: account.address,
      assetIndex: project?.assetId,
      amount: 0,
      to: account.address,
      suggestedParams: {
        ...params,
      },
    });

    const txnB64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    const signedTxns = await AlgoSigner.signTxn([{ txn: txnB64 }]);

    const tx = await AlgoSigner.send({
      ledger: "TestNet",
      tx: signedTxns[0].blob,
    });

    await algosdk.waitForConfirmation(
      algoClient,
      tx.txId,
      4
    );
    setOptinNeeded(false)
    setLoading(false)
  }

  const connectWallet = async () => {
    setLoading(true)
    const { AlgoSigner } = window;
    await AlgoSigner.connect();
    const accounts = await AlgoSigner.accounts({
      ledger: "TestNet",
    });
    const account = accounts[1];
    const accInfo = await algoClient.accountInformation(account.address).do();
    const assetFound = !!accInfo.assets.find(
      (asset: any) => asset["asset-id"] === project?.assetId
    );
    setOptinNeeded(!assetFound);
    setAccount(account);
    setLoading(false)
  };

  return (
    <div className="card shadow-md">
      <div className="card-body">
        <div className="card-title mb-4">Add a comment</div>
        {account && (
          <>
            {optinNeeded ? (
              <div>
                <p>To receive the reward you need to opt-in the USDT token</p>
                <button className={classnames("btn btn-primary mt-4", { loading })} onClick={optinToken}>
                  Opt-in {project?.assetUnit} token
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <textarea
                  className="textarea textarea-bordered w-full block"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-end">
                  <button className={classnames("btn btn-primary mt-4", { loading })}>Submit</button>
                </div>
              </form>
            )}
          </>
        )}
        {!account && (
          <div>
            <p>Connect your Algorand wallet to comment</p>
            <button className={classnames("btn btn-primary mt-4", { loading })} onClick={connectWallet}>
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
