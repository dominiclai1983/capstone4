import React, { useState, useEffect } from 'react';
import { CheckoutState } from './checkoutContext';
import { Container, Icon, Image, Step } from 'semantic-ui-react';
import { useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

const CheckoutLayout = () => {
	const { pathname } = useLocation();
	const { setCart, currentCartID, setCurrentCartID } = CheckoutState();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);
	//10 char = '/checkout'
	const [activeItem, setActiveItem] = useState(path);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
				if (!result.data.authenticated) {
					window.location.replace('/login');
				}
				setCurrentCartID(result.data.current_cart);
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

	const src = 'https://via.placeholder.com/1250x90.png';

	return (
		<>
			<Container style={{ marginTop: 20 }}>
				<Image src={src} />
				<Step.Group widths={4}>
					<Step active={activeItem === 'home'}>
						<Step.Content>
							<Step.Title>
								<Icon name='shipping' />
								Shipping
							</Step.Title>
							<Step.Description>Choose Your Shipping Options</Step.Description>
						</Step.Content>
					</Step>

					<Step active={activeItem === 'final'}>
						<Step.Content>
							<Step.Title>
								<Icon name='mouse pointer' />
								Confirm
							</Step.Title>
							<Step.Description>
								Confirm Your Order Information
							</Step.Description>
						</Step.Content>
					</Step>

					<Step active={activeItem === 'payment'}>
						<Step.Content>
							<Step.Title>
								<Icon name='payment' />
								Payment
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
			<Outlet context={[activeItem, setActiveItem]} />
		</>
	);
};

export default CheckoutLayout;
