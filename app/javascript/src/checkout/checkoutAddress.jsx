import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Segment, Grid, Container, List, Header } from 'semantic-ui-react';
import Address from '@components/checkout/Address';
import NewAddress from '@components/checkout/NewAddress';
import { CheckoutState } from './checkoutContext';
import axios from 'axios';

const CheckoutAddress = () => {
	const { shippingAddress, setShippingAddress } = CheckoutState();
	const { pathname } = useLocation();
	const [addresses, setAddresses] = useState([]);
	const [raised, setRaised] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('api/addresses');
				if (result.data) {
					setAddresses(result.data.addresses);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	console.log(addresses);

	const AddressCart = (props) => {
		let { address, index } = props;

		return (
			<Segment
				raised={raised === index ? true : false}
				onClick={() => {
					setRaised(index);
					console.log(index);
					setShippingAddress(address);
					console.log(shippingAddress);
				}}
			>
				{address.address1} {address.address2} {address.region}
			</Segment>
		);
	};

	const ShowingAddress = () => {
		return (
			<Grid columns={2} divided>
				<Grid.Row>
					<Grid.Column>
						<Header as='h2'>Shipping Address</Header>
						{addresses.map((address, index) => {
							return (
								<AddressCart address={address} index={index} key={index} />
							);
						})}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	};

	return (
		<>
			<Container style={{ marginTop: 60 }}>
				{addresses.length > 0 && <ShowingAddress />}
				<NewAddress />
			</Container>
		</>
	);
};

export default CheckoutAddress;
