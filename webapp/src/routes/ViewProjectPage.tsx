import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProjectInfo } from '../hooks/useProjectInfo'

export interface ViewProjectPageProps {
  
}

export const ViewProjectPage: FC<ViewProjectPageProps> = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const projectInfo = useProjectInfo(params.projectId as string)
  useEffect(() => {
    if (projectInfo && !projectInfo.activated) {
      navigate(`/app/projects/${params.projectId}/activate`)
    }
  }, [navigate, params.projectId, projectInfo])
  return (
    <div>ViewProjectPage</div>
  )
}
