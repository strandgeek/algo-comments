import algosdk from "algosdk";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { algoClient } from "../algo";
import { useMeQuery, useUpdateProjectMutation } from "../generated/graphql";
import { ProjectInfo, useProjectInfo } from "../hooks/useProjectInfo";
import { AppLayout } from "../layouts/AppLayout";

export interface ConfigPageProps {}

interface GeneralFormData {
  name: string;
}

const GeneralForm: FC<{ projectInfo: ProjectInfo }> = ({ projectInfo }) => {
  const [loading, setLoading] = useState(false);
  const [updateMutate] = useUpdateProjectMutation()
  const { register, handleSubmit } = useForm<GeneralFormData>({
    defaultValues: {
      name: projectInfo.name,
    }
  });
  const onSubmit = async ({ name }: GeneralFormData) => {
    setLoading(true);
    await updateMutate({
      variables: {
        input: {
          name,
          projectId: projectInfo.id!,
        }
      }
    })
    toast.success('Project updated!')
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card card-compact bg-base-100 shadow-md mt-8">
        <div className="card-body">
          <h2 className="card-title">General</h2>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Project Name</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              {...register("name")}
            />
          </div>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className={classNames("btn btn-primary", {
                loading,
                "opacity-70": loading,
              })}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

interface RewardFormData {
  rewardAmountPerComment: string;
}

const RewardForm: FC<{ projectInfo: ProjectInfo }> = ({ projectInfo }) => {
  const { data: meData } = useMeQuery();
  const [loading, setLoading] = useState(false);
  const rewardAmountPerCommentDefault = (projectInfo.rewardPerComment || 0) *10**-projectInfo.assetDecimals!
  const { register, handleSubmit } = useForm<RewardFormData>({
    defaultValues: {
      rewardAmountPerComment: rewardAmountPerCommentDefault.toString(),
    }
  });
  const onSubmit = async ({ rewardAmountPerComment }: RewardFormData) => {
    const { AlgoSigner } = window;
    setLoading(true);

    const params = await algoClient.getTransactionParams().do();

    const amount = parseFloat(rewardAmountPerComment) * 10**projectInfo.assetDecimals!
    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      from: meData?.me?.address!,
      appIndex: projectInfo.appId,
      appArgs:  [
        new Uint8Array(Buffer.from('set_reward_per_comment')),
        algosdk.encodeUint64(Math.floor(amount))
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
    toast.success('Project updated!')
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card card-compact bg-base-100 shadow-md mt-8">
        <div className="card-body">
          <h2 className="card-title">Reward Preferences</h2>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Reward Per Comment</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              {...register("rewardAmountPerComment")}
            />
          </div>
          <div className="card-actions justify-end">
            <button
              type="submit"
              className={classNames("btn btn-primary", {
                loading,
                "opacity-70": loading,
              })}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export const ConfigPage: FC<ConfigPageProps> = (props) => {
  const params = useParams();
  const projectInfo = useProjectInfo(params.projectId as string);
  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl mt-24">
        <h1 className="text-3xl font-bold">
          {projectInfo?.name} Configuration
        </h1>
        {projectInfo && (
          <>
            <GeneralForm projectInfo={projectInfo} />
            <RewardForm projectInfo={projectInfo} />
          </>
        )}
      </div>
    </AppLayout>
  );
};
