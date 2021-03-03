import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import merge from 'deepmerge';
import { onError } from '@apollo/link-error';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    return null;
  }
  // This sets up the connection to your endpoint, will vary widely.
  else {
    return new HttpLink({
      uri: 'http://localhost:5000/graphql',
      credentials: 'include',
    });
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link:
      // ApolloLink.from([
      // onError(({ graphQLErrors, networkError }) => {
      //   if (graphQLErrors)
      //     graphQLErrors.forEach(({ message, locations, path }) =>
      //       console.log(
      //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      //       )
      //     );
      //   if (networkError)
      //     console.log(
      //       `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
      //     );
      // }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createIsomorphLink(),
    // ]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
