import React from 'react';
import { AppProps } from 'next/app';
import { ProvideAuth } from '../lib/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MenuProvider } from '../context/menuContext';
import GlobalStyle from '../components/styles/GlobalsStyles';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
          <MenuProvider>
            <Component {...pageProps} />
          </MenuProvider>
        </ProvideAuth>
      </QueryClientProvider>
    </>
  );
}

export default App;
