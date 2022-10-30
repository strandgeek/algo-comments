import algosdk from "algosdk";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { algoClient } from "../algo";
import { useMeQuery } from "../generated/graphql";
import { ProjectInfo } from "../hooks/useProjectInfo";

export interface FundAlgorandFormProps {
  projectInfo: ProjectInfo;
  onFinish: () => void;
}

interface FormData {
  amount: string;
}

export const OptInTokenForm: FC<FundAlgorandFormProps> = ({
  projectInfo,
  onFinish,
}) => {
  const { AlgoSigner } = window
  const { data: meData } = useMeQuery()
  const { handleSubmit } = useForm<FormData>();
  const onSubmit = async ({ amount }: FormData) => {
    // TODO: Call the Inner Transaction Builder Opt-In opcode

    const params = await algoClient.getTransactionParams().do();

    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      from: meData?.me?.address!,
      appIndex: projectInfo.appId,
      appArgs:  [
        new Uint8Array(Buffer.from('optin_asset'))
      ],
      suggestedParams: {
        ...params
      },
      foreignAssets: [
        projectInfo.assetId,
      ]
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



    onFinish()
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-t border-base-300 p-12 flex justify-center">
          <div className="opacity-70 mb-12 text-center max-w-md "> 
            Your Smart Contract associated with your project should be able to receive and transfer the {projectInfo.assetUnit} token
          </div>
        </div>
        <div className="border-t border-base-300 p-8 flex justify-end">
          <button type="submit" className="btn btn-primary btn-block">Opt-In Token</button>
        </div>
      </form>
    </>
  );
};
