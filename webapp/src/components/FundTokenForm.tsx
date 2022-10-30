import algosdk from "algosdk";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { algoClient } from "../algo";
import { useMeQuery } from "../generated/graphql";
import { ProjectInfo } from "../hooks/useProjectInfo";

export interface FundTokenFormProps {
  projectInfo: ProjectInfo;
  onFinish: () => void;
}

interface FormData {
  amount: string;
}

export const FundTokenForm: FC<FundTokenFormProps> = ({
  projectInfo,
  onFinish,
}) => {
  const { AlgoSigner } = window
  const { data: meData } = useMeQuery()
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = async ({ amount }: FormData) => {
    const params = await algoClient.getTransactionParams().do();
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: meData?.me?.address!,
      to: projectInfo.appAddress!,
      amount: parseFloat(amount) * 10**projectInfo.assetDecimals!,
      suggestedParams: { ...params },
      assetIndex: projectInfo.assetId,
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

    onFinish()
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-t border-base-300 p-12">
          <div className="opacity-70 mb-12">
            Current Algorand Balance: {(projectInfo?.algoBalance || 0) * 10**-6}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Fund Token</span>
            </label>
            <input
              type="string"
              placeholder="1000"
              className="input input-bordered w-full"
              {...register("amount")}
            />
          </div>
        </div>
        <div className="border-t border-base-300 p-8 flex justify-end">
          <button type="submit" className="btn btn-primary btn-block">Fund {projectInfo.assetUnit}</button>
        </div>
      </form>
    </>
  );
};
