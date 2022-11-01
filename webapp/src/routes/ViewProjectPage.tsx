import { ExternalLinkIcon } from "@heroicons/react/outline";
import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { algoClient, indexerClient } from "../algo";
import { useProjectInfo } from "../hooks/useProjectInfo";
import { AppLayout } from "../layouts/AppLayout";
import { formatAmount } from "../utils/formatAmount";
import { formatNumber } from "../utils/formatNumber";

export interface ViewProjectPageProps {}

export const ViewProjectPage: FC<ViewProjectPageProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const projectInfo = useProjectInfo(params.projectId as string);
  useEffect(() => {
    if (projectInfo && !projectInfo.activated) {
      navigate(`/app/projects/${params.projectId}/activate`);
    }
  }, [navigate, params.projectId, projectInfo]);

  const rewardPerComment = projectInfo?.rewardPerComment || 0;
  const tokenBalance = projectInfo?.tokenBalance || 0;

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl mt-24">
        <a
          href={`https://testnet.algoexplorer.io/application/${projectInfo?.appId}`}
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge badge-primary badge-outline mb-4">
            App ID: {projectInfo?.appId}{" "}
            <ExternalLinkIcon className="h-3 w-3 ml-2" />
          </div>
        </a>
        <h1 className="text-3xl font-bold mb-8">
          {projectInfo?.name} Overview
        </h1>
        <div className="stats shadow w-full">
          <div className="stat">
            <div className="stat-figure text-primary">
              <img src="/algorand-algo-logo.png" className="w-6" />
            </div>
            <div className="stat-title">Algorand Balance</div>
            <div className="stat-value">
              {formatAmount(projectInfo?.algoBalance, 6)}
            </div>
            <div className="stat-desc">Used on transactions fees</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <img src="/algorand-algo-logo.png" className="w-6" />
            </div>
            <div className="stat-title">{projectInfo?.assetUnit} Balance</div>
            <div className="stat-value">
              {formatAmount(
                projectInfo?.tokenBalance,
                projectInfo?.assetDecimals
              )}
            </div>
            <div className="stat-desc">Used to reward users</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                />
              </svg>
            </div>
            <div className="stat-title">Reward per Comment</div>
            <div className="stat-value">
              {formatAmount(
                projectInfo?.rewardPerComment,
                projectInfo?.assetDecimals
              )}
            </div>
            <div className="stat-desc">In {projectInfo?.assetUnit}</div>
          </div>
        </div>

        <div className="alert shadow-md mt-8">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              You can reward up to{" "}
              <strong>{formatNumber(Math.floor(tokenBalance / rewardPerComment))} comments</strong>{" "}
              with the current {projectInfo?.assetUnit} balance
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
