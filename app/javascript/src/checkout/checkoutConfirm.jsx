import React, { useState, useEffect } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { CheckoutState } from './checkoutContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { safeCredentials, handleErrors } from '@components/utils/fetchHelper';
import StripeCheckoutForm from '@components/checkout/StripeCheckoutForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutConfirm = () => {
	const [clientSecret, setClientSecret] = useState('');

	const appearance = {
		theme: 'stripe',
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className='App'>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<StripeCheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default CheckoutConfirm;
