import React, { useState, useEffect } from 'react';
import { CheckoutState } from './checkoutContext';
import { Container, Icon, Image, Step } from 'semantic-ui-react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutLayout = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { setCart, currentCartID, setCurrentCartID } = CheckoutState();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);
	//10 char = '/checkout/'
	const [loginStatus, setLoginStatus] = useState(false);
	const [activeItem, setActiveItem] = useState(path);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
				if (result.data.authenticated) {
					setCurrentCartID(result.data.current_cart);
					setLoginStatus(result.data.authenticated);
				}
			} catch (err) {
				setLoginStatus(err.response.data.authenticated);
				window.location.replace('/login');
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

	const src = 'https://i.imgur.com/2LrT5Me.png';

	return (
		<>
			{loginStatus && (
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
									<Step.Description>
										Choose Your Shipping Options
									</Step.Description>
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
			)}
		</>
	);
};

export default CheckoutLayout;
