export interface Product {
  id: number
  image: string | null
  name: string
  price?: string
  brand: 'Marke'
  createdAt: string
  isActive: true
  isNew: true
  isSoldOut: false
  priceUnformatted: number
}
