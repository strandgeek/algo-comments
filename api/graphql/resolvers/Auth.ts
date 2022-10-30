import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../../types/context";
import { Account } from '@generated/type-graphql'
import NodeCache from "node-cache";
import { randomUUID,  } from "crypto";
import algosdk, { decodeSignedTransaction, SignedTransaction } from "algosdk";
import nacl from "tweetnacl";
import { sign, decode, verify, JwtPayload } from 'jsonwebtoken'
import { getMeFromReq } from "../../src/utils/getMeFromReq";


const verifySignedTransaction = (stxn: SignedTransaction): boolean => {
  if (stxn.sig === undefined) return false;

  const pk_bytes = stxn.txn.from.publicKey;

  const sig_bytes = new Uint8Array(stxn.sig);

  const txn_bytes = algosdk.encodeObj(stxn.txn.get_obj_for_encoding());
  const msg_bytes = new Uint8Array(txn_bytes.length + 2);
  msg_bytes.set(Buffer.from("TX"));
  msg_bytes.set(txn_bytes, 2);

  return nacl.sign.detached.verify(msg_bytes, sig_bytes, pk_bytes);
}


const nonceCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

@InputType()
export class GenerateNonceInput {
  @Field()
  address: string;
}

@ObjectType()
export class GenerateNoncePayload {
  @Field()
  nonce: string;
}

@InputType()
export class AuthInput {
  @Field()
  signedTxBase64: string;

  @Field()
  pubKey: string;
}

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;
}


@Resolver()
export class AuthResolver {
  @Query(() => Account, { nullable: true })
  async me(@Ctx() { req, prisma }: Context): Promise<Account | null> {
    return getMeFromReq(req)
  }

  @Mutation(() => GenerateNoncePayload)
  async generateNonce(
    @Arg("input") input: GenerateNonceInput
  ): Promise<GenerateNoncePayload> {
    const nonce = randomUUID()
    nonceCache.set(input.address, nonce)
    return {
      nonce,
    }
  }

  @Mutation(() => AuthPayload)
  async auth(
    @Arg("input") input: AuthInput
  ): Promise<AuthPayload> {
    const stxBuffer = Buffer.from(input.signedTxBase64, "base64")
    const signedTransaction = decodeSignedTransaction(stxBuffer)
    const verified = verifySignedTransaction(signedTransaction)
    if (!verified) {
      throw new Error('Unauthorized')
    }
    const address = algosdk.encodeAddress(signedTransaction.txn.from.publicKey)
    const token = sign({ address: address }, process.env.JWT_SECRET!)
    return {
      token,
    }
  }
}
