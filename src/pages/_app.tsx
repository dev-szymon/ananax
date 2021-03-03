import '../styles/globals.css';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { ParsedUrlQuery } from 'querystring';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
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
