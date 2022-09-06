import React, { useState, useEffect } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import { Link } from 'react-router-dom';

const OrderSummary = (props) => {
	const { chooseShipping } = props;
	const { cart, shippingFee } = CheckoutState();
	const [total, setTotal] = useState(0);
	const fee = shippingFee === null ? 0 : shippingFee;
	const orderTotal = parseFloat(total) + parseFloat(fee);

	useEffect(() => {
		setTotal(cart.reduce((acc, cur) => acc + Number(cur.total), 0));
	}, [cart]);

	return (
		<>
			<Card style={{ width: '100%' }}>
				<Card.Content>
					<Card.Header style={{ textAlign: 'left' }}>Order Summary</Card.Header>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column style={{ textAlign: 'left' }}>SubTotal:</Grid.Column>
							<Grid.Column style={{ textAlign: 'right' }}>
								${total.toFixed(2)}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column style={{ textAlign: 'left' }}>
								Shipping Fee:
							</Grid.Column>
							<Grid.Column style={{ textAlign: 'right' }}>
								${shippingFee ? shippingFee.toFixed(2) : 0}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column style={{ textAlign: 'left' }}>
								Order Total:
							</Grid.Column>
							<Grid.Column style={{ textAlign: 'right' }}>
								${orderTotal.toFixed(2)}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Card.Content>
			</Card>
			<Button
				fluid
				color='yellow'
				disabled={!chooseShipping}
				as={Link}
				to='../payment'
			>
				Pay Now!
			</Button>
		</>
	);
};

export default OrderSummary;
