import '../styles/globals.css';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { UserProvider } from '../context/context';
import { ParsedUrlQuery } from 'querystring';

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}

interface PageProps {
  query?: ParsedUrlQuery;
}

App.getInitialProps = async function ({ Component, ctx }: AppContextType) {
  let pageProps: PageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default App;
