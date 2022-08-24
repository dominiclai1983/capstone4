import React from 'react';
import { CartState } from '@src/context';
import { Button, Table, Image, Icon } from 'semantic-ui-react';
import axios from 'axios';

const CartTable = () => {
	const { cart, setCart, loginStatus } = CartState();

	const deleteItemInLoginCart = async (index, cartID) => {
		try {
			const result = await axios.put(`/api/cart_details/${cartID}`);
			if (result.data) {
				setCart((cart) => cart.filter((_, i) => i !== index));
			}
		} catch (err) {
			console.error(err);
		}
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
		<Table>
			<Table.Body>
				{cart.map((product, index) => (
					<Table.Row key={index}>
						<Table.Cell>
							<Image src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
						</Table.Cell>
						<Table.Cell>{product.title}</Table.Cell>
						<Table.Cell>{product.price}</Table.Cell>
						<Table.Cell>{product.quantity}</Table.Cell>
						<Table.Cell textAlign='right'>
							<Button
								color='red'
								onClick={() => {
									if (loginStatus) {
										deleteItemInLoginCart(index, product.id);
									} else {
										deleteItemInNotLoginCart(index, product.id);
									}
								}}
							>
								<Icon name='close' /> Cancel
							</Button>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

export default CartTable;
