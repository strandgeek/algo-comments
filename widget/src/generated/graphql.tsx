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

export type CreateCommentMetadataMutationVariables = Exact<{
  input: CreateCommentMetadataInput;
}>;


export type CreateCommentMetadataMutation = { __typename?: 'Mutation', createCommentMetadata: { __typename?: 'CreateCommentMetadataPayload', url: string } };

export type ProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: string, name: string, appId: any, appAddress: string, assetId: any, assetName: string, assetUnit: string, assetDecimals: number, activated: boolean } | null };


export const CreateCommentMetadataDocument = gql`
    mutation CreateCommentMetadata($input: CreateCommentMetadataInput!) {
  createCommentMetadata(input: $input) {
    url
  }
}
    `;
export type CreateCommentMetadataMutationFn = Apollo.MutationFunction<CreateCommentMetadataMutation, CreateCommentMetadataMutationVariables>;

/**
 * __useCreateCommentMetadataMutation__
 *
 * To run a mutation, you first call `useCreateCommentMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMetadataMutation, { data, loading, error }] = useCreateCommentMetadataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMetadataMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMetadataMutation, CreateCommentMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMetadataMutation, CreateCommentMetadataMutationVariables>(CreateCommentMetadataDocument, options);
      }
export type CreateCommentMetadataMutationHookResult = ReturnType<typeof useCreateCommentMetadataMutation>;
export type CreateCommentMetadataMutationResult = Apollo.MutationResult<CreateCommentMetadataMutation>;
export type CreateCommentMetadataMutationOptions = Apollo.BaseMutationOptions<CreateCommentMetadataMutation, CreateCommentMetadataMutationVariables>;
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
    