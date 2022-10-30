import React, { FC, useEffect } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { Link, useNavigate } from "react-router-dom";
import { Account, Project, useMeQuery } from "../generated/graphql";

export interface ProjectsPageProps {}

export const ProjectsPage: FC<ProjectsPageProps> = (props) => {
  const navigate = useNavigate()
  const { data: meData } = useMeQuery();
  useEffect(() => {
    if (meData?.me?.projects.length === 0) {
      navigate('/app/projects/create')
    }
  }, [meData])
  const me = meData?.me;
  return (
    <AppLayout noProjectLinks>
      <div className="mx-auto max-w-xl mt-12">
        <div className="p-4">
          <div className="font-bold p-2 pb-4">Select a Project</div>
          <ul className="menu menu-compact lg:menu-normal bg-base-300 w-full p-2 rounded-box">
            {me?.projects.map((project) => (
              <li>
                <Link
                  to={`/app/projects/${project.id}`}
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="btn btn-primary mt-4 w-full"
            to="/app/projects/create"
          >
            Create Project
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};
