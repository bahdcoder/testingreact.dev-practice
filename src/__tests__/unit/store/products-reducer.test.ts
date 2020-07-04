import productsReducer from '../../../store/reducers/products'

import { FETCHED_PRODUCTS, FETCHING_PRODUCTS } from '../../../store/constants'

describe('The products reducer', () => {
  it('sets the state to loading when FETCHING_PRODUCTS is dispatched', () => {
    const initialState: any = {
      data: [],
      loading: false,
    }

    const state = productsReducer(initialState, {
      type: FETCHING_PRODUCTS,
    })

    expect(state).toEqual({
      loading: true,
      data: [],
    })
  })

  it('sets the state to loading: false and products when the FETCHED_PRODUCTS is dispatched', () => {
    const initialState: any = {
      data: [],
      loading: false,
    }

    const state = productsReducer(initialState, {
      type: FETCHED_PRODUCTS,
      products: [{}, {}, {}, {}, {}, {}] as Array<any>,
    })

    expect(state.loading).toBe(false)
    expect(state.data).toHaveLength(6)
  })
})
