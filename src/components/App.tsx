import React from 'react';
import { useQuery, queryCache } from 'react-query';

import Header from './Header';
import Axios from '../helpers/axios';
import ProductStream from './ProductStream';
import FiltersOffCanvas from './FiltersOffCanvas';
import styled, { createGlobalStyle } from 'styled-components';
// import { useProductLoader } from '../api/useProductLoader';

const App = () => {
  const { status, data, error, isFetching } = useQuery("posts", async () => {
    const { data } = await Axios.get('/products');

    return data;
  });

  console.log('>>>>>>>>>>>>>>', {
      status,
      data,
      error,
      isFetching
  })

  return (
    <>
      <GlobalStyle />
      <Header />
      <FiltersOffCanvas />
      <Layout>
        <ProductStream products={data || []} />
      </Layout>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Playfair Display', Arial, Helvetica, sans-serif;
  }

  body {
    font-family: 'Playfair Display', Arial, Helvetica, sans-serif;
  }
`;

const Layout = styled.article`
  padding: 0 20px;
`;

export default App;
