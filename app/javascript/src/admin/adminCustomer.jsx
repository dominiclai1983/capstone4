import React, { useState } from 'react';
import { Container, Header, Input, Dropdown, Divider } from 'semantic-ui-react';
import CustomerDisplay from '@components/admin/CustomerDisplay';
import axios from 'axios';

const AdminCustomer = () => {
	const dropDownOption = [
		{ key: 1, text: 'Username', value: 'username' },
		{ key: 2, text: 'Email', value: 'email' },
	];

	const [dropDownSelection, setDropDownSelection] = useState(
		dropDownOption[0].value
	);
	const [inputField, setInputField] = useState('');
	const [orders, setOrders] = useState([]);
	const [user, setUser] = useState({});

	const handleOnClick = async () => {
		try {
			if (inputField) {
				if (dropDownSelection === 'email') {
					const result = await axios.get(`/api/users?email=${inputField}`);
					if (result.data) {
						console.log(result.data);
						setUser(result.data.user);
						setOrders(result.data.orders);
					}
				} else {
					const result = await axios.get(`/api/users?username=${inputField}`);
					if (result.data) {
						console.log(result.data);
						setUser(result.data.user);
						setOrders(result.data.orders);
					}
				}
			} else {
				return 0;
			}
		} catch (err) {
			console.error(err);
		}
	};

	const Remainder = () => {
		return (
			<Container textAlign='center' style={{ marginTop: '50px' }}>
				Ecommerce Demo Customer Databank
			</Container>
		);
	};

	return (
		<>
			<Header as='h2' textAlign='left'>
				Customer
			</Header>
			<Container textAlign='right'>
				<Dropdown
					selection
					compact
					placeholder='Username'
					options={dropDownOption}
					value={dropDownSelection}
					onChange={(_, data) => {
						setDropDownSelection(data.value);
					}}
					style={{ backgroundColor: '#FBBD08' }}
				/>

				<Input
					action={{
						content: 'Submit',
						onClick: () => {
							handleOnClick();
						},
					}}
					placeholder='Search...'
					value={inputField}
					onChange={(e) => {
						setInputField(e.target.value);
					}}
				/>
			</Container>
			<Divider />
			{Object.keys(user).length > 0 ? (
				<CustomerDisplay user={user} />
			) : (
				<Remainder />
			)}
		</>
	);
};

export default AdminCustomer;
