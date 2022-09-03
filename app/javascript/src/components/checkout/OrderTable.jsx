import React from 'react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import { Table, Image, Header, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const OrderTable = () => {
	const { cart } = CheckoutState();

	return (
		<>
			<Header as='h4'>
				<Icon name='shopping cart' />
				3. Your Order Items
			</Header>
			<Table>
				<Table.Body>
					{cart.map((product, index) => (
						<Table.Row key={index}>
							<Table.Cell>
								<Image src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
							</Table.Cell>
							<Table.Cell>{product.title}</Table.Cell>
							<Table.Cell>Qty: {product.quantity}</Table.Cell>
							<Table.Cell>Each: {'HK$' + product.price}</Table.Cell>
							<Table.Cell>Total: {'HK$' + product.total}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan='5'>
							<Button floated='right' as={Link} to='../../cart'>
								Edit Cart
							</Button>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</>
	);
};

export default OrderTable;
