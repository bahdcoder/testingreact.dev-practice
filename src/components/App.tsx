import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from './Header'
import ProductStream from './ProductStream'
import FiltersOffCanvas from './FiltersOffCanvas'
import styled, { createGlobalStyle } from 'styled-components'

import { StoreState } from '../types/Store'
import { fetchProducts } from '../store/action-creators'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const products = useSelector<StoreState, StoreState['products']>(
    (state) => state.products,
  )

  return (
    <>
      <GlobalStyle />
      <Header />
      <FiltersOffCanvas />
      <Layout>
        <ProductStream products={products.data} />
      </Layout>
    </>
  )
}

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
`

const Layout = styled.article`
  padding: 0 20px;
`

export default App
