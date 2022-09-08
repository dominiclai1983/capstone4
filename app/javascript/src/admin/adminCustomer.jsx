import React, { useState } from 'react';
import { Container, Header, Input, Dropdown, Divider } from 'semantic-ui-react';

const AdminCustomer = () => {
	const dropDownOption = [
		{ key: 1, text: 'Username', value: 'username' },
		{ key: 2, text: 'Email', value: 'email' },
	];

	const [dropDownSelection, setDropDownSelection] = useState(
		dropDownOption[0].value
	);
	const [inputField, setInputField] = useState('');

	return (
		<>
			<Container textAlign='center' style={{ marginTop: '15px' }}>
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
			</Container>
		</>
	);
};

export default AdminCustomer;
