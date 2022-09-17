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
import { Link, useParams } from 'react-router-dom';
import AddPicturePanel from '@components/admin/AddPicturePanel';
import axios from 'axios';

const AdminEditProduct = () => {
	let { sku } = useParams();
	const [activeItem, setActiveItem] = useState('info');
	const [product, setProduct] = useState({});
	const [codes, setCodes] = useState([]);

	const [title, setTitle] = useState('');
	const [skuHolder, setSKUHolder] = useState('');
	const [price, setPrice] = useState(null);
	const [description, setDescription] = useState('');
	const [productCode, setProductCode] = useState('');
	const [quantity, setQuantity] = useState(null);

	const [imageOne, setImageOne] = useState(null);
	const [previewImageOne, setPreviewImageOne] = useState(null);

	const dropDownOption = _.times(codes.length, (i) => ({
		key: i,
		value: codes[i].id,
		text: _.startCase(codes[i].desc),
	}));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/api/products/${sku}`);
				//getting details of specific product
				if (result.data) {
					setProduct(result.data.product);
					setTitle(result.data.product.title);
					setPrice(result.data.product.price);
					setDescription(result.data.product.description);
					setProductCode(result.data.product.product_id);
					setQuantity(result.data.product.quantity);
					setPreviewImageOne(result.data.product.large_image);
				}
				const resultCode = await axios.get('/api/codes');
				if (resultCode.data) {
					setCodes(resultCode.data.codes);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const handleChange = (e) => {
		setPreviewImageOne(window.URL.createObjectURL(e.target.files[0]));
		setImageOne(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append('product[title]', title);
		formData.append('product[description]', description);
		formData.append('product[sku]', sku);
		formData.append('product[price]', price);
		formData.append('product[quantity]', quantity);
		formData.append('product[code_id]', productCode);
		formData.append('product[attachment]', imageOne);

		try {
			const result = await axios.put('/api/products', formData);
			if (result.data) {
				console.log(result.data);
				navigate('../admin/home/product');
			}
		} catch (err) {
			console.error(err);
		}
	};

	console.log(product);
	console.log(sku);

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
									}}
								/>
							</Form.Field>
							<Form.Group widths='equal'>
								<Form.Input
									fluid
									placeholder='A1234'
									label='SKU'
									value={sku}
									disabled
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
								}}
							/>
						</Form>
					) : (
						<AddPicturePanel
							previewImageOne={previewImageOne}
							handleChange={handleChange}
						/>
					)}
					<Button
						as={Link}
						to='/admin/home/product'
						style={{ marginTop: '10px' }}
					>
						Cancel
					</Button>
					<Button
						floated='right'
						//disabled={submitActive}
						color='yellow'
						style={{ marginTop: '10px' }}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Segment>
			</Container>
		</>
	);
};

export default AdminEditProduct;
