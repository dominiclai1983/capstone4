import React, { createContext, useContext, useState } from 'react';

const Checkout = createContext();

const CheckoutContext = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [shippingAddress, setShippingAddress] = useState({});
	const [billingAddress, setBillingAddress] = useState({});
	const [currentCartID, setCurrentCartID] = useState('');
	return (
		<Checkout.Provider
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
		</Checkout.Provider>
	);
};

export const CheckoutState = () => {
	return useContext(Checkout);
};

export default CheckoutContext;
