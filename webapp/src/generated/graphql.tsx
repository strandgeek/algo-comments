import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  _count?: Maybe<AccountCount>;
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  projects: Array<Project>;
};


export type AccountProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};

export type AccountCount = {
  __typename?: 'AccountCount';
  projects: Scalars['Int'];
};

export type AccountOrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  projects?: InputMaybe<ProjectOrderByRelationAggregateInput>;
};

export type AccountRelationFilter = {
  is?: InputMaybe<AccountWhereInput>;
  isNot?: InputMaybe<AccountWhereInput>;
};

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  address?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  projects?: InputMaybe<ProjectListRelationFilter>;
};

export type ActivateProjectInput = {
  projectId: Scalars['String'];
};

export type AuthInput = {
  pubKey: Scalars['String'];
  signedTxBase64: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export type BigIntFilter = {
  equals?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type CreateCommentMetadataInput = {
  message: Scalars['String'];
};

export type CreateCommentMetadataPayload = {
  __typename?: 'CreateCommentMetadataPayload';
  url: Scalars['String'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type GenerateNonceInput = {
  address: Scalars['String'];
};

export type GenerateNoncePayload = {
  __typename?: 'GenerateNoncePayload';
  nonce: Scalars['String'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateProject: Project;
  auth: AuthPayload;
  createCommentMetadata: CreateCommentMetadataPayload;
  createProject: Project;
  generateNonce: GenerateNoncePayload;
  updateProject: Project;
};


export type MutationActivateProjectArgs = {
  input: ActivateProjectInput;
};


export type MutationAuthArgs = {
  input: AuthInput;
};


export type MutationCreateCommentMetadataArgs = {
  input: CreateCommentMetadataInput;
};


export type MutationCreateProjectArgs = {
  input: ProjectCreateInput;
};


export type MutationGenerateNonceArgs = {
  input: GenerateNonceInput;
};


export type MutationUpdateProjectArgs = {
  input: ProjectUpdateInput;
};

export type NestedBigIntFilter = {
  equals?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  activated: Scalars['Boolean'];
  apiToken: Scalars['String'];
  appAddress: Scalars['String'];
  appId: Scalars['BigInt'];
  assetDecimals: Scalars['Int'];
  assetId: Scalars['BigInt'];
  assetName: Scalars['String'];
  assetUnit: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner: Account;
  ownerId: Scalars['String'];
};

export type ProjectCreateInput = {
  appAddress: Scalars['String'];
  appId: Scalars['Float'];
  assetDecimals: Scalars['Float'];
  assetId: Scalars['Float'];
  assetName: Scalars['String'];
  assetUnit: Scalars['String'];
  name: Scalars['String'];
};

export type ProjectListRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>;
  none?: InputMaybe<ProjectWhereInput>;
  some?: InputMaybe<ProjectWhereInput>;
};

export type ProjectOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProjectOrderByWithRelationInput = {
  activated?: InputMaybe<SortOrder>;
  apiToken?: InputMaybe<SortOrder>;
  appAddress?: InputMaybe<SortOrder>;
  appId?: InputMaybe<SortOrder>;
  assetDecimals?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  assetName?: InputMaybe<SortOrder>;
  assetUnit?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  owner?: InputMaybe<AccountOrderByWithRelationInput>;
  ownerId?: InputMaybe<SortOrder>;
};

export enum ProjectScalarFieldEnum {
  Activated = 'activated',
  ApiToken = 'apiToken',
  AppAddress = 'appAddress',
  AppId = 'appId',
  AssetDecimals = 'assetDecimals',
  AssetId = 'assetId',
  AssetName = 'assetName',
  AssetUnit = 'assetUnit',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  OwnerId = 'ownerId'
}

export type ProjectUpdateInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  activated?: InputMaybe<BoolFilter>;
  apiToken?: InputMaybe<StringFilter>;
  appAddress?: InputMaybe<StringFilter>;
  appId?: InputMaybe<BigIntFilter>;
  assetDecimals?: InputMaybe<IntFilter>;
  assetId?: InputMaybe<BigIntFilter>;
  assetName?: InputMaybe<StringFilter>;
  assetUnit?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  owner?: InputMaybe<AccountRelationFilter>;
  ownerId?: InputMaybe<StringFilter>;
};

export type ProjectWhereUniqueInput = {
  apiToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Account>;
  project?: Maybe<Project>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type ActivateProjectMutationVariables = Exact<{
  input: ActivateProjectInput;
}>;


export type ActivateProjectMutation = { __typename?: 'Mutation', activateProject: { __typename?: 'Project', id: string, name: string, activated: boolean } };

export type AuthMutationVariables = Exact<{
  input: AuthInput;
}>;


export type AuthMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthPayload', token: string } };

export type CreateProjectMutationVariables = Exact<{
  input: ProjectCreateInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string } };

export type GenerateNonceMutationVariables = Exact<{
  input: GenerateNonceInput;
}>;


export type GenerateNonceMutation = { __typename?: 'Mutation', generateNonce: { __typename?: 'GenerateNoncePayload', nonce: string } };

export type UpdateProjectMutationVariables = Exact<{
  input: ProjectUpdateInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', name: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', id: string, address: string, projects: Array<{ __typename?: 'Project', id: string, name: string }> } | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, appId: any, appAddress: string, assetId: any, assetName: string, assetUnit: string, assetDecimals: number, activated: boolean } | null };


export const ActivateProjectDocument = gql`
    mutation ActivateProject($input: ActivateProjectInput!) {
  activateProject(input: $input) {
    id
    name
    activated
  }
}
    `;
export type ActivateProjectMutationFn = Apollo.MutationFunction<ActivateProjectMutation, ActivateProjectMutationVariables>;

/**
 * __useActivateProjectMutation__
 *
 * To run a mutation, you first call `useActivateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateProjectMutation, { data, loading, error }] = useActivateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivateProjectMutation(baseOptions?: Apollo.MutationHookOptions<ActivateProjectMutation, ActivateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateProjectMutation, ActivateProjectMutationVariables>(ActivateProjectDocument, options);
      }
export type ActivateProjectMutationHookResult = ReturnType<typeof useActivateProjectMutation>;
export type ActivateProjectMutationResult = Apollo.MutationResult<ActivateProjectMutation>;
export type ActivateProjectMutationOptions = Apollo.BaseMutationOptions<ActivateProjectMutation, ActivateProjectMutationVariables>;
export const AuthDocument = gql`
    mutation Auth($input: AuthInput!) {
  auth(input: $input) {
    token
  }
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, options);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = Apollo.MutationResult<AuthMutation>;
export type AuthMutationOptions = Apollo.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: ProjectCreateInput!) {
  createProject(input: $input) {
    id
    name
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const GenerateNonceDocument = gql`
    mutation GenerateNonce($input: GenerateNonceInput!) {
  generateNonce(input: $input) {
    nonce
  }
}
    `;
export type GenerateNonceMutationFn = Apollo.MutationFunction<GenerateNonceMutation, GenerateNonceMutationVariables>;

/**
 * __useGenerateNonceMutation__
 *
 * To run a mutation, you first call `useGenerateNonceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateNonceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateNonceMutation, { data, loading, error }] = useGenerateNonceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateNonceMutation(baseOptions?: Apollo.MutationHookOptions<GenerateNonceMutation, GenerateNonceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateNonceMutation, GenerateNonceMutationVariables>(GenerateNonceDocument, options);
      }
export type GenerateNonceMutationHookResult = ReturnType<typeof useGenerateNonceMutation>;
export type GenerateNonceMutationResult = Apollo.MutationResult<GenerateNonceMutation>;
export type GenerateNonceMutationOptions = Apollo.BaseMutationOptions<GenerateNonceMutation, GenerateNonceMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: ProjectUpdateInput!) {
  updateProject(input: $input) {
    name
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    address
    projects {
      id
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: String!) {
  project(id: $id) {
    id
    name
    appId
    appAddress
    assetId
    assetName
    assetUnit
    assetDecimals
    activated
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    