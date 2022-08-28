import React, { useState } from 'react';
import { Grid, Form, Button, Header, Radio, Select } from 'semantic-ui-react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import _ from 'lodash';
import { State } from 'country-state-city';

const NewAddress = () => {
	const { setShippingAddress } = CheckoutState();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [billingEmail, setBillingEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [district, setDistrict] = useState('');
	const [value, setValue] = useState(null);

	const info = State.getStatesOfCountry('HK');

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

	const handleSubmit = async () => {
		const address = {
			first_name: firstName,
			last_name: lastName,
			billing_email: billingEmail,
			address_1: address1,
			address_2: address2,
			district: district,
			region: value,
		};
	};

	return (
		<Grid columns={2} divided>
			<Grid.Row>
				<Grid.Column>
					<Header as='h2'>Add a new address</Header>
					<Form>
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
								console.log(setBillingEmail);
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
						<Form.Checkbox inline label='I agree to the terms and conditions' />
						<Button color='blue'>Submit</Button>
					</Form>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column></Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default NewAddress;
