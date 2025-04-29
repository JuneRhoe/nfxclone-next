import {
  DefaultError,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  SkipToken,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

export function useTanstackQuery<
  TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TError = DefaultError,
  TData = TQueryFnData,
  TPageParam = unknown,
>(
  queryKey: TQueryKey & {},
  queryFn:
    | QueryFunction<TQueryFnData, TQueryKey>
    | Exclude<
        UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>['queryFn'],
        SkipToken
      >
    | Exclude<
        UseInfiniteQueryOptions<
          TQueryFnData,
          TError,
          TData,
          TQueryFnData,
          TQueryKey,
          TPageParam
        >['queryFn'],
        SkipToken
      >,
  enabled: boolean = true,
):
  | DefinedUseQueryResult<TData, TError>
  | UseQueryResult<TData, TError>
  | UseQueryResult<TData, TError> {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    enabled,
  })
}

export function useTanstackMutation<
  TData,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  onSettled: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | unknown,
  onMutate?: (
    variables: TVariables,
  ) => Promise<TContext | undefined> | TContext | undefined,
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext,
  ) => Promise<unknown> | unknown,
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | unknown,
) {
  return useMutation({
    mutationFn,
    onMutate,
    onSuccess,
    onError,
    onSettled,
  })
}
