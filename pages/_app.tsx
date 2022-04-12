import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import GlobalStyle from '../styles/Global';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
