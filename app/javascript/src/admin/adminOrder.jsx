import React, { useState, useEffect } from 'react';
import {
	Container,
	Header,
	Input,
	Dropdown,
	Menu,
	Table,
	Image,
} from 'semantic-ui-react';
import OrderTable from '@components/admin/OrderTable';
import axios from 'axios';

const src = 'https://react.semantic-ui.com/images/avatar/small/matt.jpg';

const AdminOrder = () => {
	const dropDownOption = [
		{ key: 1, text: 'Order ID', value: 'id' },
		{ key: 2, text: 'SKU', value: 'sku' },
		{ key: 3, text: 'Customer Email', value: 'email' },
		{ key: 4, text: 'Tracking ID', value: 'tracking' },
	];

	const [orders, setOrder] = useState([]);
	const [totalPages, setTotalPages] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [dropDownSelection, setDropDownSelection] = useState(
		dropDownOption[0].value
	);
	const [inputField, setInputField] = useState('');
	const [activeItem, setActiveItem] = useState('allorders');

	//const handleItemClick = (e, { name }) => setActiveItem(name);

	const handlingAllOrder = async () => {
		try {
			const result = await axios.get('/api/orders_admin');
			setOrder(result.data.orders);
		} catch (err) {
			console.error(err);
		}
	};

	const handleOnPending = async () => {
		try {
			const result = await axios.get('/api/orders_admin?pending=true');
			setOrder(result.data.orders);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCancelled = async () => {
		try {
			const result = await axios.get('/api/orders_admin?cancelled=true');
			setOrder(result.data.orders);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSearchOrderID = async () => {
		try {
			const result = await axios.get(`/api/orders_admin?orderID=${inputField}`);
			setOrder(result.data.orders);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSearchSKU = async () => {
		try {
			const result = await axios.get(`/api/orders_admin?sku=${inputField}`);
			setOrder(result.data.orders);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSearchEmail = async () => {
		try {
			const result = await axios.get(`/api/orders_admin?email=${inputField}`);
			setOrder(result.data.orders);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				handlingAllOrder();
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const handleOnClick = async () => {
		try {
			if (inputField) {
				if (dropDownSelection === 'id') {
					handleSearchOrderID();
				} else if (dropDownSelection === 'sku') {
					handleSearchSKU();
				} else if (dropDownSelection === 'email') {
					handleSearchEmail();
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

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
							handleOnClick();
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
						onClick={(_, data) => {
							handleOnPending();
							setActiveItem(data.name);
						}}
					>
						Pending
					</Menu.Item>
					<Menu.Item
						name='allorders'
						active={activeItem === 'allorders'}
						onClick={(_, data) => {
							handlingAllOrder();
							setActiveItem(data.name);
						}}
					>
						All Orders
					</Menu.Item>
					<Menu.Item
						name='cancelled'
						active={activeItem === 'cancelled'}
						onClick={(_, data) => {
							handleCancelled();
							setActiveItem(data.name);
						}}
					>
						Cancelled
					</Menu.Item>
				</Menu>
				<OrderTable orders={orders} />
			</Container>
		</>
	);
};

export default AdminOrder;
