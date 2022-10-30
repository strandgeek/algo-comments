import { useEffect, useState } from "react";
import { algoClient, indexerClient } from "../algo";
import { Project, useProjectQuery } from "../generated/graphql"

export type ProjectInfo = Partial<Project> & {
  algoBalance?: number;
  tokenBalance?: number
}


const getAlgoBalance = async (address: string): Promise<number> => {
  const info = await algoClient.accountInformation(address).do()
  return info.amount
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
        const algoBalance = await getAlgoBalance(data.project.appAddress)
        setProjectInfo({
          ...data.project,
          algoBalance,
          tokenBalance: 0, // TODO: Get Token Balance
        })
      }
      // indexerClient
    })()
  }, [data])
  return projectInfo
}
