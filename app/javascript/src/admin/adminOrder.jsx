import React, { useState } from 'react';
import { Container, Header, Input, Dropdown, Divider } from 'semantic-ui-react';

const AdminOrder = () => {
	const dropDownOption = [
		{ key: 1, text: 'Order ID', value: 'id' },
		{ key: 2, text: 'SKU', value: 'sku' },
		{ key: 3, text: 'Customer Email', value: 'email' },
		{ key: 4, text: 'Tracking ID', value: 'tracking' },
	];

	const [dropDownSelection, setDropDownSelection] = useState(
		dropDownOption[0].value
	);
	const [inputField, setInputField] = useState('');

	return (
		<>
			<Container textAlign='center' style={{ marginTop: '15px' }}>
				<Header as='h2' textAlign='left'>
					Order
				</Header>
				<Container textAlign='right'>
					<Dropdown
						selection
						compact
						placeholder='Order ID'
						options={dropDownOption}
						value={dropDownSelection}
						style={{ backgroundColor: '#FBBD08' }}
						onChange={(_, data) => {
							setDropDownSelection(data.value);
						}}
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
					<Divider />
				</Container>
			</Container>
		</>
	);
};

export default AdminOrder;
