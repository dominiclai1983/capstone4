import React, { createContext, useContext, useState, useEffect } from 'react';

const Cart = createContext();

const Context = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [shippingAddress, setShippingAddress] = useState({});
	const [billingAddress, setBillingAddress] = useState({});
	const [currentCartID, setCurrentCartID] = useState('');

	return (
		<Cart.Provider
			value={{
				cart,
				setCart,
				currentCartID,
				setCurrentCartID,
				shippingAddress,
				setShippingAddress,
				billingAddress,
				setBillingAddress,
			}}
		>
			{children}
		</Cart.Provider>
	);
};

export const CartState = () => {
	return useContext(Cart);
};

export default Context;
