import React, { useState } from 'react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import { Header, Icon, Container } from 'semantic-ui-react';
import { State } from 'country-state-city';

const ShippingAddress = () => {
	const { shippingAddress } = CheckoutState();
	const [firstName, setFirstName] = useState(shippingAddress.firstName);
	const [lastName, setLastName] = useState(shippingAddress.lastName);
	const [address1, setAddress1] = useState(shippingAddress.address1);
	const [address2, setAddress2] = useState(shippingAddress.address2);
	const [billingEmail, setBillingEmail] = useState(
		shippingAddress.billingEmail
	);
	const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
	const [district, setDistrict] = useState(shippingAddress.district);
	const [region, setRegion] = useState(shippingAddress.region);

	let info = State.getStatesOfCountry('HK');
	info = info.filter((item) => item.isoCode === district);
	let infoDistrict = info[0].name.replace(' District', '');

	return (
		<>
			<Header as='h4'>
				<Icon name='shipping' />
				1. Your Shipping Address
			</Header>
			<Container style={{ paddingLeft: '25px' }}>
				<p>
					{firstName} {lastName}
				</p>
				<p>
					{address1}
					{address2}
					{infoDistrict} {region}
				</p>
				<p>
					Email Address: {billingEmail} Phone Number: {phoneNumber}
				</p>
			</Container>
		</>
	);
};

export default ShippingAddress;
