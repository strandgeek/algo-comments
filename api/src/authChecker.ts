import { AuthChecker } from "type-graphql";
import { Context } from "../types/context";
import { getMeFromReq } from "./utils/getMeFromReq";

export const authChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles,
) => {
  const me = await getMeFromReq(context.req)
  context.me = me
  return !!me
};
