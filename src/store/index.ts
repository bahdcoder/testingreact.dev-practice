import { createStore, combineReducers, applyMiddleware } from 'redux'

import { StoreState } from '../types/Store'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import products, { productsInitialState } from '../store/reducers/products'

const initalState: StoreState = {
  products: productsInitialState,
}

const store = createStore(
  combineReducers<StoreState>({
    products,
  }),
  initalState,
  applyMiddleware(thunk as ThunkMiddleware<StoreState>),
)

export default store
