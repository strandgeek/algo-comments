import React, { FC, useState } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation, useMeQuery } from "../generated/graphql";
import { useForm } from "react-hook-form";
import { algoClient, indexerClient } from "../algo";
import algosdk from "algosdk";
import { toast } from "react-toastify";
import contract from "../contract.json";
import classNames from "classnames";

export interface CreateProjectPageProps {}

interface FormData {
  name: string;
  assetId: string;
  rewardAmountPerComment: string;
}

interface AssetParams {
  name: string;
  unit: string;
  decimals: number;
}

const getAssetById = async (assetId: string): Promise<AssetParams | null> => {
  try {
    const { asset } = await indexerClient
      .lookupAssetByID(parseInt(assetId))
      .do();
    console.log(asset.params);
    const { params } = asset;
    return {
      name: params.name,
      unit: params["unit-name"],
      decimals: params.decimals,
    };
  } catch (error) {
    return null;
  }
};

export const CreateProjectPage: FC<CreateProjectPageProps> = (props) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();
  const [createProjectMutate] = useCreateProjectMutation();
  const { data: meData } = useMeQuery();

  const deployApp = async ({
    rewardAmountPerComment,
  }: {
    rewardAmountPerComment: number,
  }): Promise<{
    appId: number;
    appAddress: string;
  }> => {
    const { AlgoSigner } = window;
    const params = await algoClient.getTransactionParams().do();

    const txn = algosdk.makeApplicationCreateTxnFromObject({
      suggestedParams: {
        ...params,
      },
      from: meData?.me?.address!,
      numLocalByteSlices: 0,
      numGlobalByteSlices: 2,
      numLocalInts: 0,
      numGlobalInts: 2,
      approvalProgram: new Uint8Array(
        Buffer.from(contract.approval_base64, "base64")
      ),
      clearProgram: new Uint8Array(
        Buffer.from(contract.clear_base64, "base64")
      ),
      appArgs: [
        algosdk.encodeUint64(rewardAmountPerComment)
      ],
      onComplete: 0,
      foreignAssets: [],
    });
    

    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    const signedTxs = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    const tx = await AlgoSigner.send({
      ledger: "TestNet",
      tx: signedTxs[0].blob,
    });

    const confirmedTxn = await algosdk.waitForConfirmation(
      algoClient,
      tx.txId,
      4
    );

    const appId = confirmedTxn["application-index"];
    const appAddress = algosdk.getApplicationAddress(appId);

    return {
      appId,
      appAddress,
    };
  };

  const onSubmit = async ({ name, assetId, rewardAmountPerComment }: FormData) => {
    setLoading(true)
    const asset = await getAssetById(assetId);
    if (!asset) {
      toast.error("Could not locate asset on Testnet");
      return;
    }
    const { appId, appAddress } = await deployApp({
      rewardAmountPerComment: parseFloat(rewardAmountPerComment) * 10**asset.decimals,
    });
    try {
      const res = await createProjectMutate({
        variables: {
          input: {
            appId,
            appAddress,
            assetId: parseInt(assetId),
            assetName: asset.name,
            assetUnit: asset.unit,
            assetDecimals: asset.decimals,
            name,
          },
        },
      });
      navigate(`/app/projects/${res.data?.createProject.id}/activate`);
    } catch (error) {
      toast.error("Could not create project");
    }
    setLoading(false)
  };
  return (
    <AppLayout>
      <div className="mx-auto max-w-xl mt-12">
        <div className="p-4 border border-base-300 rounded-md">
          <div className="font-bold p-2 pb-4">Create a Project</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Project Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. My Blog"
                className="input input-bordered w-full"
                {...register("name")}
              />
            </div>
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">Reward Asset ID</span>
              </label>
              <input
                type="text"
                placeholder="123456"
                className="input input-bordered w-full"
                {...register("assetId")}
              />
              <label className="label">
                <span className="label-text-alt">
                  The asset used to reward users
                </span>
              </label>
            </div>
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">Reward Amount per Comment</span>
              </label>
              <input
                type="text"
                placeholder="5"
                className="input input-bordered w-full"
                {...register("rewardAmountPerComment")}
              />
              <label className="label">
                <span className="label-text-alt">
                  The amount of token a user should be rewarded per comment
                </span>
              </label>
            </div>
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
            Create
          </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
