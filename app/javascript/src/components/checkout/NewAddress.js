import React, { useState } from 'react';
import { Grid, Form, Button, Radio, Select, Segment } from 'semantic-ui-react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import { useNavigate, Link } from 'react-router-dom';
import _ from 'lodash';
import { State } from 'country-state-city';
import axios from 'axios';

//note: once

const NewAddress = (props) => {
	const { raised, setRaised } = props;
	const {
		shippingAddress,
		setShippingAddress,
		showAddressForm,
		setShowAddressForm,
	} = CheckoutState();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [billingEmail, setBillingEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [district, setDistrict] = useState('');
	const [value, setValue] = useState(null);

	const info = State.getStatesOfCountry('HK');

	const address = {
		first_name: firstName,
		last_name: lastName,
		billing_email: billingEmail,
		address_1: address1,
		address_2: address2 ? address2 : ' ',
		district: district,
		region: value,
		phone_number: phoneNumber,
		is_billing: false,
	};

	console.log(address);

	const dropDownOption = _.times(info.length, (i) => ({
		key: i,
		value: info[i].isoCode,
		text: info[i].name.replace(' District', ''),
	}));
	//country-state-city ships with wording District, chop them using replace()

	const handleRadioChange = (e, { value }) => {
		setValue(value);
		console.log(value);
	};

	const handleDropDownChange = (e, { value }) => {
		setDistrict(value);
		console.log(district);
	};

	//console.log(showAddressForm);
	console.log(shippingAddress);

	const handleSubmit = async () => {
		try {
			const result = await axios.post('/api/addresses', address);
			console.log(result.data);
			if (result.data) {
				setShippingAddress(result.data.address);
				console.log(result.data.address);
				navigate('../confirm');
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Grid columns={2} divided>
			<Grid.Row>
				<Grid.Column>
					<Segment
						secondary={raised !== 'address'}
						raised={raised === 'address'}
						onClick={() => {
							setShowAddressForm(true);
							setRaised('address');
						}}
					>
						Add a new address
					</Segment>
					{showAddressForm ? (
						<Form onSubmit={handleSubmit}>
							<Form.Group widths='equal'>
								<Form.Input
									fluid
									label='First Name'
									placeholder='First Name'
									type='text'
									value={firstName}
									onChange={(e) => {
										e.preventDefault();
										setFirstName(e.target.value);
										console.log(firstName);
									}}
								/>
								<Form.Input
									fluid
									label='Last Name'
									placeholder='Last Name'
									type='text'
									value={lastName}
									onChange={(e) => {
										e.preventDefault();
										setLastName(e.target.value);
										console.log(lastName);
									}}
								/>
							</Form.Group>
							<Form.Input
								label='Address'
								placeholder='Street Address'
								type='text'
								value={address1}
								onChange={(e) => {
									e.preventDefault();
									setAddress1(e.target.value);
									console.log(address1);
								}}
							/>
							<Form.Input
								label=''
								placeholder='Apt, Suite, Unit, Building, Floor'
								type='text'
								value={address2}
								onChange={(e) => {
									e.preventDefault();
									setAddress2(e.target.value);
									console.log(address1);
								}}
							/>
							<Form.Input
								label='Email'
								placeholder='info@info.com'
								type='email'
								value={billingEmail}
								onChange={(e) => {
									e.preventDefault();
									setBillingEmail(e.target.value);
									console.log(billingEmail);
								}}
							/>
							<Form.Group widths='equal'>
								<Form.Field
									control={Select}
									label='District'
									options={dropDownOption}
									placeholder='District'
									value={district}
									onChange={handleDropDownChange}
								/>
								<Form.Input
									label='Phone Number'
									placeholder='9999 0000'
									type='text'
									value={phoneNumber}
									onChange={(e) => {
										e.preventDefault();
										setPhoneNumber(e.target.value);
										console.log(e.target.value);
									}}
								/>
							</Form.Group>
							<Form.Group inline>
								<label>Region</label>
								<Form.Field>
									<Radio
										label='Hong Kong'
										name='radioGroup'
										value='HK'
										checked={value === 'HK'}
										onChange={handleRadioChange}
									/>{' '}
									<Radio
										label='Kowloon'
										name='radioGroup'
										value='KL'
										checked={value === 'KL'}
										onChange={handleRadioChange}
									/>{' '}
									<Radio
										label='N.T.'
										name='radioGroup'
										value='NT'
										checked={value === 'NT'}
										onChange={handleRadioChange}
									/>
								</Form.Field>
							</Form.Group>
							<Form.Checkbox
								inline
								label='I agree to the terms and conditions'
							/>
							<Button color='yellow'>Submit 1</Button>
						</Form>
					) : (
						<Button
							color='yellow'
							disabled={Object.keys(shippingAddress).length === 0}
							as={Link}
							to='../confirm'
						>
							Submit 2
						</Button>
					)}
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column></Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default NewAddress;
