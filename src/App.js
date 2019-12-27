import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Context
import { ProductContext } from './context/ProductContext';
import { CartContext } from './context/CartContext';

// Hooks
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {

	const [products] = useLocalStorage('products', data);
	const [cart, setCart] = useLocalStorage('cart', []);

	//const [products] = useState(data);
	//const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		setCart([...cart, item]);
	};

	const removeItem = item => {
		setCart(cart.filter(product => product.id !== item));
	}

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{ cart, removeItem }}>
			<div className="App">
				<Navigation/>

				{/* Routes */}
				<Route exact path="/" component={Products} />

				<Route path="/cart" component={ShoppingCart} />
			</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
