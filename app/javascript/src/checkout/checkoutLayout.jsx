import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Step, Container, Header, Button, Image } from 'semantic-ui-react';
import { CheckoutState } from './checkoutContext';

const CheckoutLayout = () => {
	const { pathname } = useLocation();
	const { cart, setCart, currentCartID, setCurrentCartID } = CheckoutState();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);
	//10 char = '/checkout'
	const [activeItem, setActiveItem] = useState(path);
	const [isEmpty, setIsEmpty] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
				if (!result.data.authenticated) {
					window.location.replace('/login');
				}
				setCurrentCartID(result.data.current_cart);
				if (!result.data.current_cart) {
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
				if (currentCartID) {
					const result = await axios.get(`/api/cart_details/${currentCartID}`);
					setCart(result.data.cart_details);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [currentCartID]);

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

	const src = 'https://via.placeholder.com/1250x90.png';

	return (
		<>
			<Container style={{ marginTop: 20 }}>
				<Image src={src} />
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
