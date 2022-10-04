import React, { useEffect, useState } from 'react';
import { Grid, Container, Header, Icon, Button } from 'semantic-ui-react';
//import { useBeforeunload } from 'react-beforeunload';
import { useLocation, useOutletContext } from 'react-router-dom';
import axios from 'axios';
//useBeforeunload() is a hook to handle onbeforeunload event
/* 
fire an api call to change dispatch_confirm to true when the page is close 
and prevent the revisit of the page
*/
const CheckoutSuccess = () => {
	const { pathname } = useLocation();
	const [activeItem, setActiveItem, loginStatus, setLoginStatus] =
		useOutletContext();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);
	const clientSecret = new URLSearchParams(window.location.search).get(
		'payment_intent_client_secret'
	);
	const [orderDetail, setOrderDetail] = useState({});

	const handleRemoveCurrentCart = async () => {
		const order_id = {
			order_id: orderDetail.id,
		};
		try {
			const result = await axios.post('/api/remove_current_cart', order_id);
			console.log(result.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		setActiveItem(path);
		const fetchData = async () => {
			try {
				const result = await axios.get(
					`/api/charges_intent?checkout_session_id=${clientSecret}`
				);
				if (result.data.order) {
					setOrderDetail(result.data.order);
					handleRemoveCurrentCart();
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Grid columns={2} divided style={{ marginTop: '25px' }}>
				<Grid.Column>
					<Header as='h2'>We Received Your Order!</Header>
					<Container textAlign='center'>
						<Icon
							name='check square'
							color='yellow'
							size='huge'
							style={{ margin: '15px' }}
						/>
						<p>Thank you for your purchase.</p>
						<p>Your order number is {orderDetail.id}</p>
						<p style={{ marginTop: '10px' }}>
							<Button
								animated='fade'
								color='yellow'
								onClick={() => {
									window.location.replace('/');
								}}
							>
								<Button.Content visible>Return To Home Page</Button.Content>
								<Button.Content hidden>
									<Icon name='home' />
								</Button.Content>
							</Button>
						</p>
					</Container>
				</Grid.Column>
			</Grid>
		</>
	);
};

export default CheckoutSuccess;
