import React, { FC } from "react";
import { AppLayout } from "../layouts/AppLayout";
import { useNavigate } from 'react-router-dom'
import { useCreateProjectMutation } from "../generated/graphql";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export interface CreateProjectPageProps {}

interface FormData {
  name: string
}

export const CreateProjectPage: FC<CreateProjectPageProps> = (props) => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>();
  const [createProjectMutate] = useCreateProjectMutation()
  const onSubmit = async ({ name }: FormData) => {
    try {      
      const res = await createProjectMutate({
        variables: {
          input: {
            name,
          }
        }
      })
      navigate(`/app/projects/${res.data?.createProject.id}`)
    } catch (error) {
      toast.error('Could not create project')
    }
  }
  return (
    <AppLayout>
      <div className="mx-auto max-w-xl mt-12">
        <div className="p-4 border border-base-300 rounded-md">
          <div className="font-bold p-2 pb-4">Create a Project</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Project Name"
              className="my-6 input input-bordered w-full"
              {...register('name')}
            />
            <button type="submit" className="btn btn-primary mt-4 w-full">
              Create
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
