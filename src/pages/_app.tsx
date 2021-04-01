import React from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ProvideAuth } from '../lib/auth';

function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default App;
