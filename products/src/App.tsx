
import { useState } from 'react'
import './App.css'

import { addProductToCart } from '@microshop/cart-contract';



type Products = {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string

}

const PRODUCTS: Products[] = [
  { id: 'p1', name: 'Product 1', price: 19.99, description: 'Description for Product 1', imageUrl: '../src/assets/hero.png' },
  { id: 'p2', name: 'Product 2', price: 29.99, description: 'Description for Product 2', imageUrl: '../src/assets/hero.png' },
  { id: 'p3', name: 'Product 3', price: 39.99, description: 'Description for Product 3', imageUrl: '../src/assets/hero.png' },
  { id: 'p4', name: 'Product 4', price: 49.99, description: 'Description for Product 4', imageUrl: '../src/assets/hero.png' },
  { id: 'p5', name: 'Product 5', price: 19.99, description: 'Description for Product 5', imageUrl: '../src/assets/hero.png' },
  { id: 'p6', name: 'Product 6', price: 29.99, description: 'Description for Product 6', imageUrl: '../src/assets/hero.png' }

]

function App() {
  const [message, setMessage] = useState<string | null>('');

  const handleAddToCart = (product: Products) => {
    // Here you can implement the logic to add the product to the cart
    console.log(`Adding ${product.name} to cart`);
    addProductToCart(product);
    setMessage(`${product.name} added to cart!`);
  };


  return (
    <>
    <div className='app'>
      
      <header className='header'>
        <div className=''>
          <p className='eyebrow'> Products MFE - Standalone </p>
          <h1>Products</h1>
          <p> {message} </p>
        </div>
      </header>

      <main className='main'>
        <div className='grid'>
          {
            PRODUCTS.map((product) => (
              <article className='card' key={product.id}>
                <h2>{product.name}</h2>
                <p className='price'>${product.price.toFixed(2)}</p>
                <p className='description'>{product.description}</p>

                <img src={product.imageUrl} alt={product.name} />

                <button type="button" className='btn' onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>

              </article>
            )
            )
          }
        </div>
      </main>

    </div>
     
    </>
  )
}

export default App
