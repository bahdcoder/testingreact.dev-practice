import React from 'react'
import { Axios } from '../../helpers/axios'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import { Provider as StoreProvider } from 'react-redux'
import { build, fake } from '@jackfranklin/test-data-bot'

import App from '../../components/App'
import { createStore } from '../../store'
import { FiltersWrapper } from '../../components/FiltersWrapper'

const mockAxios = Axios as any

jest.mock('../../helpers/axios')

const productBuilder = build('Product', {
  fields: {
    id: fake((f) => f.random.number()),
    image: fake((f) => f.image.imageUrl()),
    name: fake((f) => f.lorem.words()),
    price: fake((f) => `from $${f.random.number(100)}`),
  },
})

describe('The app ', () => {
  const setupApp = (store = createStore()) =>
    render(
      <StoreProvider store={store}>
        <FiltersWrapper>
          <App />
        </FiltersWrapper>
      </StoreProvider>,
    )

  const defaultProductsData = [
    productBuilder(),
    productBuilder(),
    productBuilder(),
  ]

  afterEach(() => jest.clearAllMocks())

  test('it fetches and renders all products on the page', async () => {
    mockAxios.get.mockResolvedValue({
      data: defaultProductsData,
    })

    const { findAllByTestId } = setupApp()

    expect(await findAllByTestId('ProductTile')).toHaveLength(
      defaultProductsData.length,
    )
  })

  test('it can open and close the filters panel', async () => {
    mockAxios.get.mockResolvedValue({
      data: defaultProductsData,
    })

    const { getByText, queryByText } = setupApp()

    const filterButton = getByText(/filter/i)

    expect(queryByText(/reset to defaults/i)).toBeNull()

    fireEvent.click(filterButton)

    expect(queryByText(/reset to defaults/i)).not.toBeNull()
    expect(queryByText(/view results/i)).not.toBeNull()

    fireEvent.click(queryByText(/view results/i))

    expect(queryByText(/view results/i)).toBeNull()
  })

  test('it can search products as user types in the search field', async () => {
    jest.useFakeTimers()

    mockAxios.get
      .mockResolvedValueOnce({
        data: defaultProductsData,
      })
      .mockResolvedValueOnce({
        data: [defaultProductsData[0], defaultProductsData[1]],
      })

    const {
      getByText,
      findAllByTestId,
      findByPlaceholderText,
    } = setupApp()

    expect((await findAllByTestId('ProductTile'))).toHaveLength(3)

    fireEvent.click(getByText(/filter/i))

    const searchBox = await findByPlaceholderText(/largo/i)

    fireEvent.change(searchBox, {
      target: {
        value: 'test search',
      },
    })

    act(() => {
        jest.runAllTimers()
    })

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(2))

    expect((await findAllByTestId('ProductTile'))).toHaveLength(2)
  })
})
