import React, { useState, useEffect } from 'react';
import { CartState } from '@src/context';
import _ from 'lodash';
import CartSummary from '@components/cart/CartSummary';
import { Button, Table, Image, Icon, Dropdown, Grid } from 'semantic-ui-react';
import axios from 'axios';

const CartTable = () => {
	const { cart, setCart, currentCartID, loginStatus } = CartState();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(cart.reduce((acc, cur) => acc + Number(cur.total), 0));
	}, [cart]);

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

	const changeItemQuantityInLoginCart = async (cartID, quantity) => {
		const prod = {
			id: cartID,
			quantity: quantity,
		};

		try {
			const result = await axios.put(`api/cart_details_quantity`, prod);
			if (result.data) {
				const result = await axios.get(`/api/cart_details/${currentCartID}`);
				setCart(result.data.cart_details);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const changeItemQuantityInNotLoginCart = async (guestCartID, quantity) => {
		const prod = {
			id: guestCartID,
			quantity: quantity,
		};

		try {
			const result = await axios.put(`api/guest_cart_details_quantity`, prod);
			if (result.data) {
				const result = await axios.get(`/api/guest_cart_details`);
				setCart(result.data.guest_cart_details);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const dropDownOption = _.times(5, (i) => ({
		key: i,
		value: i + 1,
		text: 'Qty: ' + (i + 1),
	}));

	console.log(cart);

	return (
		<Grid.Row>
			<Grid.Column width={11}>
				<Table>
					<Table.Body>
						{cart.map((product, index) => (
							<Table.Row key={index}>
								<Table.Cell>
									<Image src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
								</Table.Cell>
								<Table.Cell>{product.title}</Table.Cell>
								<Table.Cell>
									<Dropdown
										text={'Qty :' + product.quantity}
										value={product.quantity}
										selection
										options={dropDownOption}
										onChange={(e, data) => {
											e.preventDefault();
											if (loginStatus) {
												changeItemQuantityInLoginCart(product.id, data.value);
											} else {
												changeItemQuantityInNotLoginCart(
													product.id,
													data.value
												);
											}
										}}
									/>
								</Table.Cell>
								<Table.Cell>{'$' + product.price}</Table.Cell>
								<Table.Cell textAlign='right'>
									<Button
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
			</Grid.Column>
			<Grid.Column width={5}>
				<CartSummary total={total} />
			</Grid.Column>
		</Grid.Row>
	);
};

export default CartTable;
