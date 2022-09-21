import React, { useState, useEffect } from 'react';
import CartTable from '@components/cart/CartTable';
import { CartState } from '@src/context';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import { Link, useOutletContext, useLocation } from 'react-router-dom';

const Cart = () => {
	const { cart, loginStatus } = CartState();
	const location = useLocation();
	const [activeItem, setActiveItem] = useOutletContext();

	const handleItemClick = (e, { name }) => setActiveItem(name);

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
						<Header as='h2'>Your Cart</Header>
					</Grid.Column>
					<Grid.Column width={4}>
						{loginStatus ? (
							<Button
								color='yellow'
								size='medium'
								as='a'
								href='/checkout'
								disabled={cart.length === 0}
							>
								CheckOut
							</Button>
						) : (
							<Link to={'/login'} state={{ prevPath: location.pathname }}>
								<Button
									color='yellow'
									size='medium'
									name='login'
									onClick={handleItemClick}
									disabled={cart.length === 0}
								>
									CheckOut
								</Button>
							</Link>
						)}
					</Grid.Column>
				</Grid.Row>

				<CartTable />
			</Grid>
		</Container>
	);
};

export default Cart;
