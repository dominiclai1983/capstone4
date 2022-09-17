import React, { useState, useEffect } from 'react';
import {
	Container,
	Header,
	Input,
	Dropdown,
	Divider,
	Menu,
} from 'semantic-ui-react';
import axios from 'axios';

const AdminOrder = () => {
	const dropDownOption = [
		{ key: 1, text: 'Order ID', value: 'id' },
		{ key: 2, text: 'SKU', value: 'sku' },
		{ key: 3, text: 'Customer Email', value: 'email' },
		{ key: 4, text: 'Tracking ID', value: 'tracking' },
	];

	const [orders, setOrders] = useState([]);
	const [totalPages, setTotalPages] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [dropDownSelection, setDropDownSelection] = useState(
		dropDownOption[0].value
	);
	const [inputField, setInputField] = useState('');
	const [activeItem, setActiveItem] = useState('allorders');

	const handleItemClick = (e, { name }) => setActiveItem(name);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/orders?admin_checker=true');
				if (result.data) {
					setOrders(result.data.orders);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	console.log(orders);

	return (
		<>
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
				<Menu pointing secondary>
					<Menu.Item
						name='pending'
						active={activeItem === 'pending'}
						onClick={handleItemClick}
					>
						Pending
					</Menu.Item>
					<Menu.Item
						name='allorders'
						active={activeItem === 'allorders'}
						onClick={handleItemClick}
					>
						All Orders
					</Menu.Item>
					<Menu.Item
						name='cancelled'
						active={activeItem === 'cancelled'}
						onClick={handleItemClick}
					>
						Cancelled
					</Menu.Item>
				</Menu>
			</Container>
		</>
	);
};

export default AdminOrder;
