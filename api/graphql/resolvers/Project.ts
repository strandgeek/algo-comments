import { Arg, Authorized, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Project } from '@generated/type-graphql'
import { Context } from "../../types/context";
import { generateRandomToken } from "../../src/utils/generateRandomToken";

@InputType()
export class ProjectCreateInput {
  @Field()
  name: string;

  @Field()
  assetId: number;

  @Field()
  assetName: string;

  @Field()
  assetUnit: string;

  @Field()
  assetDecimals: number;

  @Field()
  appId: number;

  @Field()
  appAddress: string;
}

@InputType()
export class ActivateProjectInput {
  @Field()
  projectId: string;
}

@Resolver()
export class ProjectResolver {
  @Authorized()
  @Mutation(() => Project)
  async createProject(
    @Arg("input") input: ProjectCreateInput,
    @Ctx() ctx: Context
  ): Promise<Project | null> {
    const { me, prisma } = ctx
    if (!me) {
      return null
    }
    const project = await prisma.project.create({
      data: {
        name: input.name,
        ownerId: me.id,
        apiToken: generateRandomToken(64),
        assetId: input.assetId,
        assetName: input.assetName,
        assetUnit: input.assetUnit,
        assetDecimals: input.assetDecimals,
        appId: input.appId,
        appAddress: input.appAddress,
      }
    })
    return project
  }

  @Authorized()
  @Mutation(() => Project)
  async activateProject(
    @Arg("input") input: ActivateProjectInput,
    @Ctx() ctx: Context
  ): Promise<Project | null> {
    const { me, prisma } = ctx
    if (!me) {
      return null
    }
    const project = await prisma.project.findUnique({
      where: {
        id: input.projectId,
      },
      include: {
        owner: true,
      }
    })
    if (!project) {
      throw new Error('project not found')
    }
    if (project.owner.address != ctx.me?.address) {
      throw new Error('forbidden')
    }
    return prisma.project.update({
      data: {
        activated: true,
      },
      where: {
        id: project.id,
      }
    })
  }

  @Query(() => Project, { nullable: true })
  async project(
    @Arg("id") id: string,
    @Ctx() ctx: Context
  ): Promise<Project | null> {
    const { prisma } = ctx
    return prisma.project.findUniqueOrThrow({
      where: {
        id,
      }
    })
  }
}
