import React from 'react';
import '../components/styles/global.css';
import { AppProps } from 'next/app';
import { ProvideAuth } from '../lib/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MenuProvider } from '../context/menuContext';

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProvideAuth>
        <MenuProvider>
          <Component {...pageProps} />
        </MenuProvider>
      </ProvideAuth>
    </QueryClientProvider>
  );
}

export default App;
