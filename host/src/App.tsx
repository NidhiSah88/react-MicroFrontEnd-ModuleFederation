import React from 'react';
import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";



const ProductList = React.lazy(() => import('products/ProductList'));
const CartList = React.lazy(() => import('cart/CartList'));



// type Page = "Home" | "Products" | "Cart"

// import products remote in this file so that we can use the exposed modules from the remote in this host app.


function App() {
  // const [page, setPage] = useState<Page>("Home")

  return (
    <BrowserRouter>
    <div className='app'>
      <header className='header'>
        <strong className='brand'>Microshop </strong>

        <nav className='nav'>

          <NavLink to={'/'}
            className={(isActive) => isActive ? "nav-link active" : "nav-link"}

          >
            Home 

            </NavLink>
          <NavLink to={'/products'}
            className={(isActive) => isActive ? "nav-link active" : "nav-link"}

          >
            Products

            </NavLink>
          <NavLink to={'/cart'}
            className={(isActive) => isActive ? "nav-link active" : "nav-link"}

          >
            Cart

            </NavLink>
             {/* // <button type="button" className={page === "Home" ? "nav-link active" : "nav-link"} onClick={() => setPage("Home")}>
          //   Home
          // </button>
          // <button type="button" className={page === "Products" ? "nav-link active" : "nav-link"} onClick={() => setPage("Products")}>
          //   Products
          // </button>
          // <button type="button" className={page === "Cart" ? "nav-link active" : "nav-link"} onClick={() => setPage("Cart")}>
          //   Cart
          // </button> */}

        </nav>

      </header>
      <main className='main'>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<h1>Home</h1>} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/cart' element={<CartList />} />
          </Routes>
        </React.Suspense>

        {/* {page === "Home" && (
          <section className='panel'>
            <h1>Host/Shell </h1>
          </section>
        )}

        {page === "Products" && (
          <section className='panel'>
            <h1>Products </h1>
            <p className='muted'> Products remote will render here</p>
          </section>
        )}

        {page === "Cart" && (
          <section className='panel'>
            <h1>Cart </h1>
            <p className='muted'> Carts remote will render here</p>

          </section>
        )} */}

      </main>
    </div>
    </BrowserRouter>
  )
}



export default App
