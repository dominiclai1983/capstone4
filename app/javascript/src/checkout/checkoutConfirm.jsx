import React, { useState, useEffect } from 'react';
import { CheckoutState } from './checkoutContext';
import { Grid, Container, Header, Card } from 'semantic-ui-react';
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
	const [amountInCent, setAmountInCent] = useState(0);
	const amount = parseInt(amountInCent) / 100;
	const { shippingAddress, currentCartID, shippingFee } = CheckoutState();

	//TODO: change to use the safeCredentials() and handleErrors
	useEffect(() => {
		setActiveItem(path);
		// Create PaymentIntent as soon as the page loads
		fetch(
			'/api/charges_intent',
			safeCredentials({
				method: 'POST',
				body: JSON.stringify({
					metadata: {
						cart_id: currentCartID,
						address_id: shippingAddress.id,
						shipping_fee: shippingFee,
					},
				}),
			})
		)
			.then(handleErrors)
			.then((data) => {
				setClientSecret(data.client_secret);
				setAmountInCent(data.amount);
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
		<Grid columns={2} divided style={{ marginTop: '25px' }}>
			{amount && (
				<Grid.Column>
					<Header as='h2' style={{ marginTop: '8px' }}>
						Credit Card Details
					</Header>
					<Container textAlign='left'>
						<Card style={{ minWidth: '500px' }}>
							<Card.Content>
								<Card.Header color='yellow'>
									Total Amount: HK${amount === 0 ? null : amount}
								</Card.Header>
							</Card.Content>
						</Card>
						<div className='checkoutConfirm'>
							{clientSecret && (
								<Elements options={options} stripe={stripePromise}>
									<StripeCheckoutForm />
								</Elements>
							)}
						</div>
					</Container>
				</Grid.Column>
			)}
		</Grid>
	);
};

export default CheckoutConfirm;
