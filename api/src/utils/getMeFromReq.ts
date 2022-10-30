import { ExpressContext } from "apollo-server-express"
import { JwtPayload, verify } from "jsonwebtoken"
import { prisma } from "../db"

export const getMeFromReq = async (req: ExpressContext['req']) => {
  const bearer = req.headers.authorization?.split(' ')
  if (bearer?.length !== 2) {
    return null
  }
  const token = bearer[1]
  const payload = verify(token, process.env.JWT_SECRET!) as JwtPayload
  if (!payload || !payload.address) {
    return null
  }
  const { address } = payload
  const acc = await prisma.account.upsert({
    create: {
      address,
    },
    update: {},
    where: {
      address,
    }
  })
  return acc || null
}
