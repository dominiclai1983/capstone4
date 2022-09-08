import React, { useState, useEffect } from 'react';
import {
	Menu,
	Container,
	Header,
	Segment,
	Form,
	Button,
	Select,
	Icon,
} from 'semantic-ui-react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminAddProduct = () => {
	const [activeItem, setActiveItem] = useState('info');
	const [submitActive, setSubmitActive] = useState(true);
	const [codes, setCodes] = useState([]);

	const [title, setTitle] = useState('');
	const [sku, setSKU] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
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
		quantity,
		productCode,
		description,
	};

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const productChecker = () => {
		let everyChecker = Object.values(product).every((item) => item);
		let descriptionLengthChecker = Object.values(product)[5].length > 10;
		let skuChecker = Object.values(product)[1].length < 10;
		let quantityChecker = Object.values(product)[3] > -1;
		let finalChecker =
			everyChecker && descriptionLengthChecker && skuChecker && quantityChecker;
		setSubmitActive(!finalChecker);
	};

	const dropDownOption = _.times(codes.length, (i) => ({
		key: i,
		value: codes[i].code,
		text: _.startCase(codes[i].desc),
	}));

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
			<Menu secondary>
				<Menu.Item style={{ marginLeft: '20px', marginBottom: '-10px' }}>
					<Header as='h6' icon>
						<Icon name='shopping bag' color='yellow' />
						Ecommerce Demo
					</Header>
				</Menu.Item>
			</Menu>

			<Container textAlign='center'>
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
					{activeItem === 'info' ? (
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
										productChecker();
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
										productChecker();
									}}
								/>
								<Form.Input
									fluid
									label='Price'
									placeholder='$16.99'
									type='number'
									value={price === 0 ? '' : price}
									onChange={(e) => {
										e.preventDefault();
										setPrice(e.target.value);
										productChecker();
									}}
								/>
							</Form.Group>
							<Form.Group widths='equal'>
								<Form.Input
									fluid
									label='Quantity'
									placeholder='0'
									type='number'
									value={quantity}
									onChange={(e) => {
										e.preventDefault();
										setQuantity(e.target.value);
										productChecker();
									}}
								/>
								<Form.Field
									control={Select}
									label='Category'
									options={dropDownOption}
									placeholder='Bracelet'
									value={productCode}
									onChange={(_, data) => {
										setProductCode(data.value);
										productChecker();
									}}
								/>
							</Form.Group>
							<Form.TextArea
								label='About'
								placeholder='Tell us more about you...'
								value={description}
								type='text'
								onChange={(e) => {
									e.preventDefault();
									setDescription(e.target.value);
									productChecker();
								}}
							/>
						</Form>
					) : null}
					<Button as={Link} to='/admin/home' style={{ marginTop: '10px' }}>
						Cancel
					</Button>
					<Button
						floated='right'
						disabled={submitActive}
						color='yellow'
						style={{ marginTop: '10px' }}
					>
						Submit
					</Button>
				</Segment>
			</Container>
		</>
	);
};

export default AdminAddProduct;
