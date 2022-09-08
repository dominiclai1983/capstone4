import React, { useState } from 'react';
import { Container, Header, Input, Dropdown, Divider } from 'semantic-ui-react';

const AdminProduct = () => {
	const dropDownOption = [
		{ key: 1, text: 'Title', value: 'title' },
		{ key: 2, text: 'SKU', value: 'sku' },
	];

	const [dropDownSelection, setDropDownSelection] = useState(
		dropDownOption[0].value
	);
	const [inputField, setInputField] = useState('');
	return (
		<>
			<Header as='h2' textAlign='left'>
				Product
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
		</>
	);
};

export default AdminProduct;
