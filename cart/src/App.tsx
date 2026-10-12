import { useEffect, useState } from 'react'
import {readCartItems, writeCartItems, CART_ADD_EVENT} from "@microshop/cart-contract";
import './App.css'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

// const DEMO_ITEMS: CartItem[] = [
//   { id: 'p1', name: 'Product 1', price: 19.99, quantity: 2 },
//   { id: 'p2', name: 'Product 2', price: 29.99, quantity: 1 }
// ]

function App() {
  // const [items, setItems] = useState(DEMO_ITEMS);
  const [items, setItems] = useState<CartItem[]>(() => readCartItems());


  useEffect(() => {
    const onAdd = () => {
      setItems(readCartItems());
    }

    window.addEventListener(CART_ADD_EVENT, onAdd);
    return () => {
      window.removeEventListener(CART_ADD_EVENT, onAdd);
    }
  },[]);


  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeItem = (id: string) => {
    // setItems(prevItems => prevItems.filter(item => item.id !== id));
    const next = items.filter(item => item.id !== id);
    writeCartItems(next); 
    setItems(next);

  };

  const clearCart = () => {
    writeCartItems([]);

    setItems([]);
  };


  return (
    <>
      <div className='app'>
        <header className='header'>
          <div className=''>
            <p className='eyebrow'> Cart MFE - Standalone </p>
            <h1>Cart</h1>
          </div>
        </header>

        <main className='main'>
          <section className='panel'>
            
            <h2>Cart Items</h2>


            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className='cart-list'>
                {items.map(item => (
                  <li key={item.id} className='cart-item'>
                    <div>
                      <strong>  {item.name}</strong> -   ${item.price.toFixed(2)} x {item.quantity}
                    </div>
                    <button type="button" className='btn btn-remove' onClick={() => removeItem(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
            {items.length > 0 && (
              <>
                <div className='cart-summary'>
                  <p>Total Items: {totalCount}</p>
                  <p>Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
                <button type="button" className='btn btn-clear' onClick={clearCart}>Clear Cart</button>
              </>
            )}
          </section>
        </main>
      </div>
    </>
  )
}

export default App
