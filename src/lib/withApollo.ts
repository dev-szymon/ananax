import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';

const createClient = (ctx: NextPageContext) => {
  return new ApolloClient({
    uri: `${process.env.API_ENDPOINT as string}/graphql`,
    credentials: 'include',
    headers: {
      cookie: ctx?.req?.headers.cookie || '',
    },
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
