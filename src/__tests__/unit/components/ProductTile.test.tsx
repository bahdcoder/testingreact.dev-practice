import React from 'react'
import { axe } from 'jest-axe'
import { render } from '@testing-library/react'
import ProductTile from '../../../components/ProductTile'

describe('The <ProductTile /> component', () => {
  const defaultProduct = {
    id: 12,
    name: 'Example product name',
    image: '/image.png',
    price: 'from $12.99',
    brand: 'Adidas',
    createdAt: '2020-02-11 00:00:00',
    isActive: true,
  }

  const setupProductTile = (props = defaultProduct) =>
    render(<ProductTile {...(props as any)} />)

  it('renders a product tile with name, image and price', () => {
    const { asFragment, getByText } = setupProductTile()

    expect(getByText(defaultProduct.name)).toBeInTheDocument()
    expect(getByText(defaultProduct.price)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders a product tile with name and price only', () => {
    const { asFragment, getByText, queryByTestId } = setupProductTile({
      ...defaultProduct,
      image: undefined,
    })

    expect(queryByTestId('ProductTileImage')).not.toBeInTheDocument()

    expect(getByText(defaultProduct.name)).toBeInTheDocument()
    expect(getByText(defaultProduct.price)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  it('has no accessibility violations', async () => {
    const { container } = setupProductTile()

    expect(await axe(container)).toHaveNoViolations()
  })
})
