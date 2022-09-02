import React, { useState, useEffect } from 'react';
import { CheckoutState } from './checkoutContext';
import {
	Button,
	Container,
	Header,
	Icon,
	Image,
	Step,
} from 'semantic-ui-react';
import { useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

const CheckoutLayout = () => {
	const { pathname } = useLocation();
	const { setCart, currentCartID, setCurrentCartID } = CheckoutState();
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
	console.log(`currentCartID` + currentCartID);

	const src = 'https://via.placeholder.com/1250x90.png';

	return (
		<>
			<Container style={{ marginTop: 20 }}>
				<Image src={src} />
				<Step.Group widths={3}>
					<Step active={activeItem === 'home'}>
						<Step.Content>
							<Step.Title>
								<Icon name='shipping' />
								Shipping
							</Step.Title>
							<Step.Description>Choose Your Shipping Options</Step.Description>
						</Step.Content>
					</Step>

					<Step active={activeItem === 'confirm'}>
						<Step.Content>
							<Step.Title>
								<Icon name='payment' />
								Confirm
							</Step.Title>
							<Step.Description>
								Enter Your Credit Card Information
							</Step.Description>
						</Step.Content>
					</Step>

					<Step active={activeItem === 'success'}>
						<Step.Content>
							<Step.Title>
								<Icon name='mail' />
								Order Success!!!
							</Step.Title>
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
