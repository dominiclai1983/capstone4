import React, { useState } from 'react';
import { Container, Header, Input, Dropdown, Divider } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';
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

	const handleOnClick = async () => {
		try {
			if (dropDownSelection === 'email') {
				const result = await axios.get(`/api/users?email=${inputField}`);
			} else {
				const result = await axios.get(`/api/users?username=${inputField}`);
			}
		} catch (err) {
			console.error(err);
		}
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
							console.log('eeee');
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
			<Outlet />
		</>
	);
};

export default AdminCustomer;
