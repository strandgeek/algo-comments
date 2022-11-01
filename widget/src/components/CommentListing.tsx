import algosdk from 'algosdk'
import React, { FC, useEffect } from 'react'
import { indexerClient } from '../algo'
import { ProjectQuery } from '../generated/graphql'
import { Config } from '../types/config'
import { decodeNote } from '../utils/decodeNote'

export interface CommentListingProps {
  config: Config
  project: ProjectQuery['project']
}

export const CommentListing: FC<CommentListingProps> = ({ project, config }) => {
  useEffect(() => {
    (async () => {
      const res = await indexerClient
        .searchForTransactions()
        .applicationID(project?.appId)
        .limit(100)
        /*
          NOTE: Since the notePrefix is disabled on PureStake, we are going to filter slugs on frontend.
          This approach is not optimized, but it is just for demonstration
        */
        .do()
      const slugTxns = res.transactions.filter((txn: any) => {
        if (!txn.note) {
          return false
        }
        const note = decodeNote(txn.note)
        return note.startsWith(config.slug.padEnd(256, '.'))
      })
      const getComment = async (txn: any) => {
        const note = decodeNote(txn.note)
        const cid = note.substring(256, 302)
        const messageUrl =  `https://strandgeek-ipfs-gateway.infura-ipfs.io/ipfs/${cid}`
        const { message } = await fetch(messageUrl).then(res => res.json())
        return {
          author: txn.sender,
          postedAt: txn['round-time'],
          message,
        }
      }
      const comments = await Promise.all(slugTxns.map(getComment))
      console.log(comments)
    })()
  }, [project])
  if (!project) {
    return null
  }
  return (
    <div>CommentListing</div>
  )
}
