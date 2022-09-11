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
	const [amountInCent, setAmountInCent] = useState(null);
	const amount = isNaN(parseInt(amountInCent) / 100)
		? ''
		: parseInt(amountInCent) / 100;
	const { shippingAddress, currentCartID, shippingFee } = CheckoutState();

	useEffect(() => {
		setActiveItem(path);
		// Create PaymentIntent as soon as the page loads
		//protect the route by check login and the pervious route is checkout/final
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
			<Grid.Column>
				<Header as='h2' style={{ marginTop: '8px' }}>
					Credit Card Details
				</Header>
				{amount && (
					<Container textAlign='left'>
						<Card style={{ minWidth: '500px' }}>
							<Card.Content>
								<Card.Header>Total Amount: HK$ {amount}</Card.Header>
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
				)}
			</Grid.Column>
		</Grid>
	);
};

export default CheckoutConfirm;
