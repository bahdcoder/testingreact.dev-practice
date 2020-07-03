import React from 'react'
import { render } from '@testing-library/react'
import ProductStream from '../../../components/ProductStream'

describe('The <ProductStream /> component', () => {
    const defaultProducts = [{
        id: 12,
        image: 'image.png',
        price: 'from $12.99',
        brand: 'Adidas',
        createdAt: '2020-02-11 00:00:00',
        isActive: true,
    }, {
        id: 13,
        image: 'image-1.png',
        price: 'from $42.99',
        brand: 'Nike',
        createdAt: '2020-02-11 00:00:00',
        isActive: true,
    }]

    it('renders a list of Product tiles for each product passed to it', async () => {
        const { asFragment, findAllByTestId } = render(
            <ProductStream products={defaultProducts as Array<any>} />
        )

        expect(asFragment()).toMatchSnapshot()
        expect((await findAllByTestId('ProductTile'))).toHaveLength(defaultProducts.length)
    })
})
