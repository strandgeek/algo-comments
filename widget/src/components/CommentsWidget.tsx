import React, { FC, useEffect } from 'react'
import { Config } from '../types/config'
import { useProjectQuery } from '../generated/graphql'
import { NewComment } from './NewComment'
import { CommentListing } from './CommentListing'
import { useComments } from '../hooks/useComments'

export interface CommentsWidgetProps {
  config: Config
}

export const CommentsWidget: FC<CommentsWidgetProps> = ({ config }) => {
  const { data } = useProjectQuery({
    variables: {
      id: config.projectId,
    }
  })
  const { comments, reload } = useComments({
    appId: data?.project?.appId,
    slug: config.slug,
  })
  const { project } = data || {}
  if (!project) {
    return (
      <div>
        Project Not Found
      </div>
    )
  }
  console.log(comments)
  return (
    <>
      <div data-theme="winter">        
        <CommentListing project={project} config={config} comments={comments} />
        <NewComment project={project} config={config} onSubmit={() => reload()} />
      </div>   
    </>
  )
}
