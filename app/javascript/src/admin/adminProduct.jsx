import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Header, Input, Dropdown, Divider } from 'semantic-ui-react';
import ProductTable from '@components/admin/ProductTable';

const AdminProduct = () => {
	const dropDownOption = [
		{ key: 1, text: 'Title', value: 'title' },
		{ key: 2, text: 'SKU', value: 'sku' },
	];

	const [dropDownSelection, setDropDownSelection] = useState(
		dropDownOption[0].value
	);
	const [inputField, setInputField] = useState('');
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/products');
				setProducts(result.data.products);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	console.log(products);

	const handleTitleSearch = async () => {
		try {
			const result = await axios.get(`/api/products?query=${inputField}`);
			setProducts(result.data.products);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSKUSearch = async () => {
		try {
			const result = await axios.get(`/api/products?sku=${inputField}`);
		} catch (err) {
			console.error(err);
		}
	};

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
							if (dropDownSelection === 'title') {
								handleTitleSearch();
							} else {
								handleSKUSearch();
							}
						},
					}}
					placeholder='Search...'
					value={inputField}
					onChange={(e) => {
						setInputField(e.target.value);
					}}
				/>
				<Divider />
				<ProductTable products={products} />
			</Container>
		</>
	);
};

export default AdminProduct;
