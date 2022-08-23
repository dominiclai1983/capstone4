import React, { useState, useEffect } from 'react';
import { CartState } from '@src/context';
import { Button, Container, Table, Image, Icon } from 'semantic-ui-react';

const Cart = () => {
	const { cart, setCart, loginStatus } = CartState();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(cart.reduce((acc, cur) => acc + Number(cur.price), 0));
	}, [cart]);

	const deleteItemInLoginCart = (index, cartID) => {
		setCart((cart) => cart.filter((_, i) => i !== index));
	};

	const deleteItemInNotLoginCart = async (index, guestCartID) => {
		try {
			const result = await axios.put(`/api/guest_cart_details/${guestCartID}`);
			if (result.data) {
				setCart((cart) => cart.filter((_, i) => i !== index));
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container style={{ marginTop: 20 }}>
			<Table>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Product</Table.HeaderCell>
						<Table.HeaderCell />
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Quantity</Table.HeaderCell>
						<Table.HeaderCell />
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{cart.map((product, index) => (
						<Table.Row key={index}>
							<Table.Cell>
								<Image src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
							</Table.Cell>
							<Table.Cell>{product.title}</Table.Cell>
							<Table.Cell>{product.price}</Table.Cell>
							<Table.Cell>{product.quantity}</Table.Cell>
							<Table.Cell>
								<Button
									color='red'
									onClick={() => {
										loginStatus
											? deleteItemInLoginCart(index, product.id)
											: deleteItemInNotLoginCart(index, product.id);
									}}
								>
									<Icon name='close' /> Cancel
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>

			<Table.Footer>
				<Table.Row>
					<Table.Cell />
					<Table.Cell />
					<Table.Cell />
					<Table.Cell>
						{cart.length === 0 ? null : (
							<Button
								floated='right'
								icon
								labelPosition='left'
								primary
								size='small'
								as='a'
								href='/checkout'
							>
								<Icon name='check' /> Check Out
							</Button>
						)}
					</Table.Cell>
				</Table.Row>
			</Table.Footer>
		</Container>
	);
};

export default Cart;
