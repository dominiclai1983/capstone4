import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Step, Container, Header, Button } from 'semantic-ui-react';
import { CheckoutState } from './checkoutContext';

const CheckoutLayout = () => {
	const { pathname } = useLocation();
	const { cart, setCart, currentOrder, setCurrentOrder } = CheckoutState();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);
	const [activeItem, setActiveItem] = useState(path);
	const [isEmpty, setIsEmpty] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
				setCurrentOrder(result.data.current_order);
				if (!result.data.current_order) {
					setIsEmpty(!isEmpty);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/api/order_details/${currentOrder}`);
				let cartItem = result.data.order_details;
				setCart(cartItem);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [currentOrder]);

	const EmptyCart = () => {
		return (
			<>
				<Container style={{ marginTop: 20 }}>
					<Header as='h1'>The cart is empty!</Header>
					<Button primary as='a' href='/'>
						Go Shopping!
					</Button>
				</Container>
			</>
		);
	};

	console.log(`isEmpty ` + isEmpty);

	return (
		<>
			<Container style={{ marginTop: 20 }}>
				<Step.Group widths={3}>
					<Step>
						<Step.Content>
							<Step.Title>Shipping</Step.Title>
							<Step.Description>Choose your shipping options</Step.Description>
						</Step.Content>
					</Step>

					<Step>
						<Step.Content>
							<Step.Title>Confirm</Step.Title>
							<Step.Description>Enter billing information</Step.Description>
						</Step.Content>
					</Step>

					<Step>
						<Step.Content>
							<Step.Title>Confirm Order</Step.Title>
						</Step.Content>
					</Step>
				</Step.Group>
			</Container>
			{isEmpty ? (
				<EmptyCart />
			) : (
				<Outlet context={[activeItem, setActiveItem]} />
			)}
		</>
	);
};

export default CheckoutLayout;
