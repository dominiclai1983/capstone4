import React, { createContext, useContext, useState } from 'react';

const Checkout = createContext();

const CheckoutContext = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [currentCartID, setCurrentCartID] = useState('');
	const [shippingAddress, setShippingAddress] = useState({});
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [shippingFee, setShippingFee] = useState(null);

	return (
		<Checkout.Provider
			value={{
				cart,
				setCart,
				currentCartID,
				setCurrentCartID,
				shippingAddress,
				setShippingAddress,
				showAddressForm,
				setShowAddressForm,
				shippingFee,
				setShippingFee,
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
