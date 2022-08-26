import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Header, Icon } from 'semantic-ui-react';
import { State } from 'country-state-city';
import { CheckoutState } from '@src/checkout/checkoutContext';

const BillingAddress = (props) => {
	const { checkBoxValue, setCheckBoxValue } = props;
	const { billingAddress, setBillingAddress } = CheckoutState();
	const [addressID, setAddressID] = useState(billingAddress.addressID);
	const [firstName, setFirstName] = useState(billingAddress.firstName);
	const [lastName, setLastName] = useState(billingAddress.lastName);
	const [address1, setAddress1] = useState(billingAddress.address1);
	const [address2, setAddress2] = useState(billingAddress.address2);
	const [billingEmail, setBillingEmail] = useState(billingAddress.billingEmail);
	const [phoneNumber, setPhoneNumber] = useState(billingAddress.phoneNumber);
	const [district, setDistrict] = useState(billingAddress.district);
	const [region, setRegion] = useState(billingAddress.region);

	let info = State.getStatesOfCountry('HK');
	info = info.map((item) => item.name);

	let newAddress = {
		first_name: firstName,
		last_name: lastName,
		billing_email: billingEmail,
		phone_number: phoneNumber,
		address_1: address1,
		address_2: address2,
		district: district,
		region: region,
		is_billing: true,
	};

	const handleSubmit = async () => {
		try {
			const result = await axios.post(`api/addresses/${addressID}`, newAddress);
			console.log(result.data);
			if (result.data) {
				setBillingAddress(result.data.address);
				setTimeout(location.reload(), 1500);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Header as='h2'>
				<Icon name='address card' />
				<Header.Content>Billing Address</Header.Content>
			</Header>
			<Form onSubmit={handleSubmit}>
				<Form.Group unstackable widths={2}>
					<Form.Input
						label='First name'
						placeholder='First name'
						value={firstName}
						onChange={(e) => {
							e.preventDefault();
							setFirstName(e.target.value);
						}}
					/>
					<Form.Input
						label='Last name'
						placeholder='Last name'
						value={lastName}
						onChange={(e) => {
							e.preventDefault();
							setLastName(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group unstackable widths={2}>
					<Form.Input
						label='Address 1'
						placeholder='Address 1'
						value={address1}
						onChange={(e) => {
							e.preventDefault();
							setAddress1(e.target.value);
						}}
					/>
					<Form.Input
						label='Address 2'
						placeholder='Address 2'
						value={address2}
						onChange={(e) => {
							e.preventDefault();
							setAddress2(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group unstackable widths={2}>
					<Form.Input
						label='Billing email'
						placeholder='you@email.com'
						value={billingEmail}
						onChange={(e) => {
							e.preventDefault();
							setBillingEmail(e.target.value);
						}}
					/>
					<Form.Input
						label='Phone'
						placeholder=''
						value={phoneNumber}
						onChange={(e) => {
							e.preventDefault();
							setPhoneNumber(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group unstackable widths={2}>
					<Form.Field
						label='Region'
						control='select'
						value={region}
						onChange={(e) => {
							e.preventDefault();
							setRegion(e.target.value);
						}}
					>
						<option value='HK'>Hong Kong</option>
						<option value='KL'>Kowloon</option>
						<option value='NT'>New Territories</option>
					</Form.Field>
					<Form.Field
						label='District'
						control='select'
						value={district}
						onChange={(e) => {
							e.preventDefault();
							setDistrict(e.target.value);
						}}
					>
						{info.map((item, key) => {
							return (
								<option key={key} value={item}>
									{item}
								</option>
							);
						})}
					</Form.Field>
				</Form.Group>
				<Form.Checkbox
					label='Billing Address Is Different From Shipping Address'
					onClick={() => {
						setCheckBoxValue(!checkBoxValue);
						console.log(checkBoxValue);
					}}
				/>
				<Button type='submit'>Submit</Button>
			</Form>
		</>
	);
};

export default BillingAddress;
