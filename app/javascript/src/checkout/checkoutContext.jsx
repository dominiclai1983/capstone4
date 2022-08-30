import React, { createContext, useContext, useState } from 'react';

const Checkout = createContext();

const CheckoutContext = ({ children }) => {
	const [billingAddress, setBillingAddress] = useState({});
	const [cart, setCart] = useState([]);
	const [currentCartID, setCurrentCartID] = useState('');
	const [shippingAddress, setShippingAddress] = useState({});
	const [showAddressForm, setShowAddressForm] = useState(false);

	return (
		<Checkout.Provider
			value={{
				billingAddress,
				setBillingAddress,
				cart,
				setCart,
				currentCartID,
				setCurrentCartID,
				shippingAddress,
				setShippingAddress,
				showAddressForm,
				setShowAddressForm,
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
