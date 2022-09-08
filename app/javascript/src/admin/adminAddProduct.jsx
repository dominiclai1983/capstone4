import React, { useState, useEffect } from 'react';
import {
	Menu,
	Container,
	Header,
	Segment,
	Form,
	Button,
	Select,
} from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminAddProduct = () => {
	const [activeItem, setActiveItem] = useState('info');
	const handleItemClick = (e, { name }) => setActiveItem(name);

	const [title, setTitle] = useState('');
	const [sku, setSKU] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [codes, setCodes] = useState([]);
	const [productCode, setProductCode] = useState('');
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/codes');
				if (result.data) {
					setCodes(result.data.codes);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const product = {
		title,
		sku,
		price,
		description,
		codes,
		productCode,
		quantity,
	};

	console.log(codes);

	const dropDownOption = _.times(codes.length, (i) => ({
		key: i,
		value: codes[i].code,
		text: _.startCase(codes[i].desc),
	}));

	const handleDropDownChange = (e, { value }) => {
		setProductCode(value);
	};

	const handleSubmit = async () => {
		try {
			const result = await axios.post('api/products', product);
			if (result.data) {
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Header as='h2'></Header>
			<Container textAlign='center' style={{ marginTop: '25px' }}>
				<Menu compact secondary>
					<Menu.Item
						name='info'
						active={activeItem === 'info'}
						onClick={handleItemClick}
					/>

					<Menu.Item
						name='photo'
						active={activeItem === 'photo'}
						onClick={handleItemClick}
					/>
				</Menu>
			</Container>
			<Container style={{ width: '600px' }}>
				<Segment attached='bottom'>
					<Form>
						<Form.Field>
							<Form.Input
								fluid
								label='Title'
								placeholder='16+ Inches Good Product'
								value={title}
								onChange={(e) => {
									e.preventDefault();
									setTitle(e.target.value);
								}}
							/>
						</Form.Field>
						<Form.Group widths='equal'>
							<Form.Input
								fluid
								label='SKU'
								placeholder='A1234'
								value={sku}
								onChange={(e) => {
									e.preventDefault();
									setSKU(e.target.value);
								}}
							/>
							<Form.Input
								fluid
								label='Price'
								placeholder='$16.99'
								value={price === 0 ? '' : price}
								onChange={(e) => {
									e.preventDefault();
									setPrice(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group widths='equal'>
							<Form.Input
								fluid
								label='Quantity'
								placeholder='A1234'
								value={quantity}
								onChange={(e) => {
									e.preventDefault();
									setQuantity(e.target.value);
								}}
							/>
							<Form.Field
								control={Select}
								label='Category'
								options={dropDownOption}
								placeholder='Bracelet'
								value={productCode}
								onChange={handleDropDownChange}
							/>
						</Form.Group>
						<Form.TextArea
							label='About'
							placeholder='Tell us more about you...'
							value={description}
							onChange={(e) => {
								e.preventDefault();
								setDescription(e.target.value);
							}}
						/>
						<Button as={Link} to='/admin/home'>
							Cancel
						</Button>
						<Button type='submit' floated='right' color='yellow'>
							Submit
						</Button>
					</Form>
				</Segment>
			</Container>
		</>
	);
};

export default AdminAddProduct;
