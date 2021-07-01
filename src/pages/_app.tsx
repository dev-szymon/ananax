import React from 'react';
import { AppProps } from 'next/app';
import { ProvideAuth } from '../lib/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IngredientSelectorProvider } from '../context/ingredientsSelectorContext';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../lib/theme';
function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <link
          key="lato_font"
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=Lato:400,700,500&display=swap`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          key="rock_salt_font"
          href={`https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
          <ChakraProvider theme={theme}>
            <IngredientSelectorProvider>
              <Component {...pageProps} />
            </IngredientSelectorProvider>
          </ChakraProvider>
        </ProvideAuth>
      </QueryClientProvider>
    </>
  );
}

export default App;
