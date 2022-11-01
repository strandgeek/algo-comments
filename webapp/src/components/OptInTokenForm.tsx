import algosdk from "algosdk";
import classNames from "classnames";
import React, { FC, useState } from "react";
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
  const [loading, setLoading] = useState(false)
  const { data: meData } = useMeQuery()
  const { handleSubmit } = useForm<FormData>();
  const onSubmit = async ({ amount }: FormData) => {
    setLoading(true)
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

    await algosdk.waitForConfirmation(
      algoClient,
      tx.txId,
      4
    );

    setLoading(false)
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
          <button
            type="submit"
            className={classNames(
              "btn btn-primary btn-block",
              {
                loading,
                'opacity-70': loading,
              }
            )}
          >
            Opt-In Token
          </button>
        </div>
      </form>
    </>
  );
};
