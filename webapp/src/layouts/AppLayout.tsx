import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Topbar } from '../components/Topbar'
import { useMeQuery } from '../generated/graphql'

export interface AppLayoutProps {
  noProjectLinks?: boolean;
  children: React.ReactNode
}

export const AppLayout: FC<AppLayoutProps> = ({ noProjectLinks, children}) => {
  const navigate = useNavigate()
  const { data: meData, loading, client } = useMeQuery()
  useEffect(() => {
    if (!loading && !meData?.me) {
      console.log(loading, meData)
      navigate('/')
    }
  }, [meData, loading])
  const me = meData?.me
  if (!me) {
    return null
  }
  return (
    <div>
      <Topbar me={me as any} noProjectLinks={noProjectLinks} />
      <div>
        {children}
      </div>
    </div>
  )
}
