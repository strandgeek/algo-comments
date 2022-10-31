import algosdk from "algosdk";
import { useEffect, useState } from "react";
import { algoClient, indexerClient } from "../algo";
import { Project, useProjectQuery } from "../generated/graphql"

export type ProjectInfo = Partial<Project> & {
  algoBalance?: number;
  tokenBalance?: number
  rewardPerComment?: number
}


const getBalances = async (address: string, assetId: number): Promise<{
  algoBalance: number,
  tokenBalance: number,
}> => {
  const info = await algoClient.accountInformation(address).do()
  const asset = info.assets.find((a: any) => a['asset-id'] === assetId)
  return {
    algoBalance: info.amount,
    tokenBalance: asset ? asset.amount : 0,
  }
}

const getRewardPerComment =  async(appId: number): Promise<number> => {
  const applicationInfoResponse = await algoClient.getApplicationByID(appId).do()
  const globalState = applicationInfoResponse['params']['global-state']
  const state = globalState.find((gs: any) => gs.key === 'cmV3YXJkX3Blcl9jb21tZW50')
  return state.value.uint
}


export const useProjectInfo = (projectId: string): ProjectInfo | undefined => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>()
  const { data } = useProjectQuery({
    variables: {
      id: projectId,
    }
  })
  useEffect(() => {
    (async () => {
      if (data && data.project) {
        const {
          algoBalance,
          tokenBalance,
        } = await getBalances(data.project.appAddress, data.project.assetId)
        const rewardPerComment = await getRewardPerComment(data.project.appId)
        setProjectInfo({
          ...data.project,
          algoBalance,
          tokenBalance,
          rewardPerComment,
        })
      }
    })()
  }, [data])
  return projectInfo
}
