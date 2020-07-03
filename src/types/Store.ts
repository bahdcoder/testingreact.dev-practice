import { Product } from './Product'

export interface ProductsReducerState {
  data: Product[]
}

export interface StoreState {
  products: ProductsReducerState
}
