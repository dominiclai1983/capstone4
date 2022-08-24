import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { CheckoutState } from './checkoutContext';
import { safeCredentials, handleErrors } from '@components/utils/fetchHelper';

const CheckoutConfirm = () => {
	const { currentOrder } = CheckoutState();
	const handleClick = (currentOrder) => {
		return fetch(
			`/api/charges?id=${currentOrder}&cancel_url=${window.location.pathname}`,
			safeCredentials({
				method: 'POST',
			})
		)
			.then(handleErrors)
			.then((response) => {
				const stripe = Stripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
				console.log(response);
				//TODO:the above is client secret. remember to remove them!!!
				stripe
					.redirectToCheckout({
						// Make the id field from the Checkout Session creation API response
						// available to this file, so you can provide it as parameter here
						// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
						sessionId: response.client_secret,
					})
					.then((result) => {
						// If `redirectToCheckout` fails due to a browser or network
						// error, display the localized error message to your customer
						// using `result.error.message`.
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Container style={{ marginTop: 60 }}>
				<Button
					primary
					size='tiny'
					onClick={() => {
						handleClick(currentOrder);
					}}
				>
					Confirm
				</Button>
			</Container>
		</>
	);
};

export default CheckoutConfirm;
