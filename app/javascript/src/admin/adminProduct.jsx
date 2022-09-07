import React, { useState } from 'react';
import {
	Menu,
	Container,
	Header,
	Segment,
	Form,
	Button,
} from 'semantic-ui-react';

const AdminProduct = () => {
	const [activeItem, setActiveItem] = useState('info');
	const handleItemClick = (e, { name }) => setActiveItem(name);

	const [title, setTitle] = useState('');
	const [sku, setSKU] = useState('');
	const [price, setPrice] = useState(0);

	const product = {
		title,
		sku,
		price,
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
									setTitle(e.target.value);
								}}
							/>
							<Form.Input
								fluid
								label='Price'
								placeholder='$16.99'
								value={price === 0 ? '' : price}
								onChange={(e) => {
									e.preventDefault();
									setTitle(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group widths='equal'>
							<Form.Input
								fluid
								label='SKU'
								placeholder='A1234'
								value={sku}
								onChange={(e) => {
									e.preventDefault();
									setTitle(e.target.value);
								}}
							/>
							<Form.Input
								fluid
								label='Price'
								placeholder='$16.99'
								value={price === 0 ? '' : price}
								onChange={(e) => {
									e.preventDefault();
									setTitle(e.target.value);
								}}
							/>
						</Form.Group>
						<Button type='submit'>Submit</Button>
					</Form>
				</Segment>
			</Container>
		</>
	);
};

export default AdminProduct;
