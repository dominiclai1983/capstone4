import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Grid, Container, List, Header } from 'semantic-ui-react';
import Address from '@components/checkout/Address';
import NewAddress from '@components/checkout/NewAddress';
import { CheckoutState } from './checkoutContext';
import axios from 'axios';

const CheckoutAddress = () => {
	const { pathname } = useLocation();

	const { shippingAddress, setShippingAddress } = CheckoutState();

	const [addresses, setAddresses] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('api/addresses');
				if (result.data) {
					setShippingAddress(result.data.address);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	console.log(pathname);
	console.log(Object.keys(shippingAddress).length);

	const ShowingAddress = () => {
		return (
			<Grid columns={2} divided>
				<Grid.Row>
					<Grid.Column>
						<Header size='small'>Shipping Address</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	};

	return (
		<>
			<Container style={{ marginTop: 60 }}>
				{/* 
				{Object.keys(shippingAddress).length !== 0 && <ShowingAddress />}
				*/}
				<ShowingAddress />
				{Object.keys(shippingAddress).length === 0 && <NewAddress />}
			</Container>
		</>
	);
};

export default CheckoutAddress;
