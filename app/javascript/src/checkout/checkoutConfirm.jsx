import React, { useState, useEffect } from 'react';
import { CheckoutState } from './checkoutContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { safeCredentials, handleErrors } from '@components/utils/fetchHelper';
import StripeCheckoutForm from '@components/checkout/StripeCheckoutForm';
import { useLocation, useOutletContext } from 'react-router-dom';
import '@src/css/checkoutConfirm.scss';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutConfirm = () => {
	const { pathname } = useLocation();
	const [activeItem, setActiveItem] = useOutletContext();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);
	const [clientSecret, setClientSecret] = useState('');
	const { shippingAddress, currentCartID } = CheckoutState();

	//TODO: change to use the safeCredentials() and handleErrors
	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch(
			'/api/charges_intent',
			safeCredentials({
				method: 'POST',
				body: JSON.stringify({
					metadata: { cart_id: currentCartID, address_id: shippingAddress.id },
				}),
			})
		)
			.then(handleErrors)
			.then((data) => {
				console.log(data);
				setClientSecret(data.client_secret);
				setActiveItem(path);
			});
	}, []);

	const appearance = {
		theme: 'stripe',
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className='checkoutConfirm'>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<StripeCheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default CheckoutConfirm;
