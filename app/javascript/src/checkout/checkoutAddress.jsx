import React, { useState, useEffect } from 'react';
import { CheckoutState } from './checkoutContext';
import { Segment, Grid, Container, Header } from 'semantic-ui-react';
import NewAddress from '@components/checkout/NewAddress';
import axios from 'axios';

const CheckoutAddress = () => {
	const { setShippingAddress, setShowAddressForm } = CheckoutState();
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

	const AddressCart = (props) => {
		let { address, index } = props;

		return (
			<Segment
				secondary={raised !== index}
				raised={raised === index}
				onClick={() => {
					setRaised(index);
					setShippingAddress(address);
					setShowAddressForm(false);
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
						<Header as='h2'>Choose A Shipping Address</Header>
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
				<NewAddress raised={raised} setRaised={setRaised} />
			</Container>
		</>
	);
};

export default CheckoutAddress;
