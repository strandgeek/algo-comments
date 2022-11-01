import { useEffect, useState } from "react"
import { indexerClient } from "../algo"
import { decodeNote } from "../utils/decodeNote"

const IPFS_GATEWAY_BASE_URL = 'https://strandgeek-ipfs-gateway.infura-ipfs.io'

export interface Comment {
  author: string
  postedAt: number
  message: string
}

interface UseCommentsOptions {
  appId?: number
  slug: string
}

interface UseComments {
  reload: () => void
  comments: Comment[]
}

export const useComments = ({ appId, slug }: UseCommentsOptions): UseComments => {
  const [comments, setComments] = useState<Comment[]>([])
  const load = async () => {
    if (appId) {
      const res = await indexerClient
        .searchForTransactions()
        .applicationID(appId)
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
        return note.startsWith(slug.padEnd(256, '.'))
      })
      const getComment = async (txn: any) => {
        const note = decodeNote(txn.note)
        const cid = note.substring(256, 302)
        const messageUrl =  `${IPFS_GATEWAY_BASE_URL}/ipfs/${cid}`
        const { message } = await fetch(messageUrl).then(res => res.json())
        return {
          author: txn.sender,
          postedAt: txn['round-time'],
          message,
        }
      }
      const comments = await Promise.all(slugTxns.map(getComment))
      console.log(comments)
      setComments(comments)
    }
  }
  useEffect(() => {
    (async () => {
      load()
    })()
  }, [appId, slug])
  return {
    comments,
    reload: load,
  }
}
