import React, { FC, useEffect } from 'react'
import { Config } from '../types/config'
import { useProjectQuery } from '../generated/graphql'
import { NewComment } from './NewComment'
import { indexerClient } from '../algo'
import { CommentListing } from './CommentListing'

export interface CommentsWidgetProps {
  config: Config
}

export const CommentsWidget: FC<CommentsWidgetProps> = ({ config }) => {
  const { data } = useProjectQuery({
    variables: {
      id: config.projectId,
    }
  })
  const { project } = data || {}
  if (!project) {
    return (
      <div>
        Project Not Found
      </div>
    )
  }
  return (
    <>    
      <div>ProjectID: {config.projectId}</div>
      <div>Slug: {config.slug}</div>
      <hr />
      <CommentListing project={project} config={config} />
      <NewComment project={project} config={config} />
    </>
  )
}
