import { StoreState } from '../types/Store'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import products, { productsInitialState } from './reducers/products'
import { createStore, combineReducers, applyMiddleware } from 'redux'

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
