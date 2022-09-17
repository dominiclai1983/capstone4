import React from 'react';
import { Table, Image, Button, Dropdown, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const src = 'https://react.semantic-ui.com/images/avatar/small/matt.jpg';

const ProductTable = (props) => {
	let { products } = props;

	const items = products.map((product, index) => {
		return (
			<Table.Row key={product.id}>
				<Table.Cell>
					{product.quantity > 0 ? 'Active' : 'Out of Stock'}
				</Table.Cell>
				<Table.Cell>
					<Image src={product.thumb ? product.thumb : src} />
				</Table.Cell>
				<Table.Cell>{product.sku}</Table.Cell>
				<Table.Cell>{product.title}</Table.Cell>
				<Table.Cell>{product.created_at}</Table.Cell>
				<Table.Cell>{product.quantity}</Table.Cell>
				<Table.Cell>{product.price}</Table.Cell>
				<Table.Cell>
					<Button.Group>
						<Button
							color='yellow'
							as={Link}
							to={`/admin/home/product/${product.sku}`}
						>
							Edit
						</Button>
					</Button.Group>
				</Table.Cell>
			</Table.Row>
		);
	});

	return (
		<Table singleLine>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Status</Table.HeaderCell>
					<Table.HeaderCell>Image</Table.HeaderCell>
					<Table.HeaderCell>SKU</Table.HeaderCell>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Created At</Table.HeaderCell>
					<Table.HeaderCell>Quantity</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
					<Table.HeaderCell></Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>{items}</Table.Body>
		</Table>
	);
};

export default ProductTable;
