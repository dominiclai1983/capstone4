import React, { useState, useEffect } from 'react';
import CartSummary from '@components/cart/CartSummary';
import CartTable from '@components/cart/CartTable';
import { CartState } from '@src/context';
import { Button, Container, Grid } from 'semantic-ui-react';
import { Link, useOutletContext } from 'react-router-dom';

const Cart = () => {
	const { cart, loginStatus } = CartState();
	const [activeItem, setActiveItem] = useOutletContext();
	const [total, setTotal] = useState(0);

	const handleItemClick = (e, { name }) => {
		setActiveItem(name);
	};

	useEffect(() => {
		setTotal(cart.reduce((acc, cur) => acc + Number(cur.price), 0));
	}, [cart]);

	return (
		<Container style={{ marginTop: 20, textAlign: 'center' }}>
			<Grid divided='vertically'>
				<Grid.Row>
					<Grid.Column width={4}>
						<Button
							basic
							color='black'
							size='medium'
							as={Link}
							to='/'
							name='home'
							onClick={handleItemClick}
						>
							Continue Shopping
						</Button>
					</Grid.Column>
					<Grid.Column width={8}>
						<h3>Your Cart</h3>
					</Grid.Column>
					<Grid.Column width={4}>
						<Button
							primary
							size='medium'
							as={Link}
							to={loginStatus ? null : '/login'}
							name={loginStatus ? 'checkout' : 'login'}
							onClick={handleItemClick}
						>
							Checkout Now
						</Button>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column width={11}>
						<CartTable />
					</Grid.Column>
					<Grid.Column width={5}>
						<CartSummary total={total} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default Cart;