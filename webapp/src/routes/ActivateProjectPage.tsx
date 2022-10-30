import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FundAlgorandForm } from '../components/FundAlgorandForm'
import { FundTokenForm } from '../components/FundTokenForm'
import { OptInTokenForm } from '../components/OptInTokenForm'
import { useActivateProjectMutation } from '../generated/graphql'
import { useProjectInfo } from '../hooks/useProjectInfo'
import { AppLayout } from '../layouts/AppLayout'

export interface ActivateProjectPageProps {
  
}

const STEPS = [
  'FUND_ALGORAND',
  'OPT_IN_TOKEN',
  'FUND_TOKEN',
]

export const ActivateProjectPage: FC<ActivateProjectPageProps> = (props) => {
  const [step, setStep] = useState<string>()
  const navigate = useNavigate()
  const [activateMutate] = useActivateProjectMutation()
  const params = useParams()
  const projectInfo = useProjectInfo(params.projectId as string)
  useEffect(() => {
    console.log(projectInfo)
    if (projectInfo) {
      if (projectInfo.algoBalance != null && projectInfo.algoBalance === 0) {
        setStep('FUND_ALGORAND')
      } else {
        setStep('OPT_IN_TOKEN')
      }
    }
  }, [projectInfo])

  const getStepClassName = (stepIdx: number): string => {
    if (step && STEPS.indexOf(step) >= stepIdx) {
      return 'step step-primary'
    }
    return 'step'
  }

  const onCompleted = async () => {
    await activateMutate({
      variables: {
        input: {
          projectId: projectInfo?.id!,
        }
      }
    })
    navigate(`/app/projects/${projectInfo?.id}`)
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl mt-16 border border-base-300 rounded-md">
        <div className="text-center py-8 border-b">
          <h1 className="text-lg font-bold">Activate Project</h1>
          <p className='mt-4'>
            In order to activate the project we need to fund algorand and {projectInfo?.assetUnit} token
          </p>
        </div>
        <div className="flex justify-center py-4">
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className={getStepClassName(0)}>Fund Algorands</li>
            <li className={getStepClassName(1)}>Opt-in {projectInfo?.assetUnit}</li>
            <li className={getStepClassName(2)}>Fund {projectInfo?.assetUnit}</li>
          </ul>
        </div>
        {projectInfo && (
          <>
            {step === 'FUND_ALGORAND' && (
              <FundAlgorandForm projectInfo={projectInfo} onFinish={() => setStep('OPT_IN_TOKEN')} />
            )}
            {step === 'OPT_IN_TOKEN' && (
              <OptInTokenForm projectInfo={projectInfo} onFinish={() => setStep('FUND_TOKEN')} />
            )}
            {step === 'FUND_TOKEN' && (
              <FundTokenForm projectInfo={projectInfo} onFinish={() => onCompleted()} />
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}
