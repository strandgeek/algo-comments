import algosdk from "algosdk";
import React, { FC, useEffect } from "react";
import { indexerClient } from "../algo";
import { ProjectQuery } from "../generated/graphql";
import { Config } from "../types/config";
import { decodeNote } from "../utils/decodeNote";
import { Comment } from "../hooks/useComments";
import { AddressInfoLabel } from "./AddressInfoLabel";
import { formatTime } from "../utils/formatTime";

export interface CommentListingProps {
  config: Config;
  project: ProjectQuery["project"];
  comments: Comment[];
}

export const CommentListing: FC<CommentListingProps> = ({
  project,
  config,
  comments,
}) => {
  return (
    <div>
      {comments.map((comment) => (
        <div className="card border p-8 mb-1">
          <div className="">
            <AddressInfoLabel address={comment.author} short={true} />
            <div className="opacity-80 text-xs mt-2 mb-4">
              {formatTime(comment.postedAt)}
            </div>
          </div>
          {comment.message}
        </div>
      ))}
    </div>
  );
};
