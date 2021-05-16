import React from 'react';
import { AppProps } from 'next/app';
import { ProvideAuth } from '../lib/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MenuProvider } from '../context/menuContext';
import GlobalStyle from '../components/styles/GlobalsStyles';
import { IngredientSelectorProvider } from '../context/ingredientsSelectorContext';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <link
          key="roboto_font"
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=Lato:400,700,500&display=swap`}
        />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
          <MenuProvider>
            <IngredientSelectorProvider>
              <Component {...pageProps} />
            </IngredientSelectorProvider>
          </MenuProvider>
        </ProvideAuth>
      </QueryClientProvider>
    </>
  );
}

export default App;
