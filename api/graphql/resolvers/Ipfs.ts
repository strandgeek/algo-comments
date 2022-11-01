import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { uploadJsonDataToIPFS } from "../../src/utils/ipfs";
import { Context } from "../../types/context";

@InputType()
export class CreateCommentMetadataInput {
  @Field()
  message: string;
}

@ObjectType()
export class CreateCommentMetadataPayload {
  @Field()
  url: string;
}

@Resolver()
export class IpfsResolver {
  @Mutation(() => CreateCommentMetadataPayload)
  async createCommentMetadata(
    @Arg("input") input: CreateCommentMetadataInput,
    @Ctx() ctx: Context
  ): Promise<CreateCommentMetadataPayload | null> {
    const { message } = input
    const jsonData = JSON.stringify({ message })
    return uploadJsonDataToIPFS(jsonData)
  }
}
