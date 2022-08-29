import React, { useState, useEffect } from 'react';
import CartTable from '@components/cart/CartTable';
import { CartState } from '@src/context';
import { Button, Container, Grid } from 'semantic-ui-react';
import { Link, useOutletContext, useLocation } from 'react-router-dom';

const Cart = () => {
	const { loginStatus } = CartState();
	const location = useLocation();
	const [activeItem, setActiveItem] = useOutletContext();
	const [total, setTotal] = useState(0);

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
						<h3>Your Cart</h3>
					</Grid.Column>
					<Grid.Column width={4}>
						{loginStatus ? (
							<Button color='yellow' size='medium' as='a' href='/checkout'>
								CheckOut
							</Button>
						) : (
							<Link to={'/login'} state={{ prevPath: location.pathname }}>
								<Button
									color='yellow'
									size='medium'
									name='login'
									onClick={handleItemClick}
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
