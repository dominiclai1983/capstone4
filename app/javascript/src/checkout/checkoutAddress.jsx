import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button, Grid, Container, List, Header } from 'semantic-ui-react';
import Address from '@components/checkout/Address';
import NewAddress from '@components/checkout/NewAddress';
import { CheckoutState } from './checkoutContext';
import axios from 'axios';

const CheckoutAddress = () => {
	const { pathname } = useLocation();

	const {
		shippingAddress,
		setShippingAddress,
		billingAddress,
		setBillingAddress,
	} = CheckoutState();

	const [editAddress, setEditAddress] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('api/addresses');
				if (result.data) {
					let addresses = result.data.addresses;

					let billing = addresses.filter(
						(address) => address.isBilling === true
					);
					billing = Object.assign({}, ...billing);

					let shipping = addresses.filter(
						(address) => address.isBilling === false
					);
					shipping = Object.assign({}, ...shipping);
					setShippingAddress(shipping);

					if (!billing) {
						billing = shipping;
					}
					setBillingAddress(billing);
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
						<Header size='small'>Billing Address</Header>
						<List>
							<List.Item>
								{billingAddress.firstName} {billingAddress.lastName}
							</List.Item>
							<List.Item>{billingAddress.address1}</List.Item>
							{billingAddress.address2 ? (
								<List.Item>{billingAddress.address2}</List.Item>
							) : null}
							<List.Item>
								{billingAddress.district} {billingAddress.region}
							</List.Item>
							<List.Item
								onClick={() => {
									setEditAddress(!editAddress);
									console.log(editAddress);
								}}
							>
								Edit Address
							</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column>
						<Header size='small'>Shipping Address</Header>
						<List>
							<List.Item>
								{shippingAddress.firstName} {shippingAddress.lastName}
							</List.Item>
							<List.Item>{shippingAddress.address1}</List.Item>
							{shippingAddress.address2 ? (
								<List.Item>{shippingAddress.address2}</List.Item>
							) : null}
							<List.Item>
								{shippingAddress.district} {shippingAddress.region}
							</List.Item>
							<List.Item>
								<Button primary size='tiny' as={Link} to='/checkout/confirm'>
									Confirm
								</Button>
							</List.Item>
						</List>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	};

	console.log(shippingAddress);
	console.log(Object.keys(shippingAddress).length);
	console.log(billingAddress);

	return (
		<>
			<Container style={{ marginTop: 60 }}>
				{Object.keys(shippingAddress).length !== 0 && <ShowingAddress />}
				{editAddress && <Address />}
				{Object.keys(shippingAddress).length === 0 && <NewAddress />}
			</Container>
		</>
	);
};

export default CheckoutAddress;
