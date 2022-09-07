import React, { useState, useEffect } from 'react';
import { Menu, Grid, Icon, Header, Container } from 'semantic-ui-react';
import LayoutMenu from '@components/admin/LayoutMenu';
import { Outlet, useLocation, Link } from 'react-router-dom';

const AdminLayout = () => {
	const { pathname } = useLocation();
	const path = pathname.substring(7).replace('/', '');
	//7 char = '/admin/
	const [activeItem, setActiveItem] = useState(path);
	console.log(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<>
			<Grid>
				<Grid.Row>
					<Grid.Column width={3}>
						<Container
							style={{
								marginTop: '15px',
								marginBottom: '35px',
								paddingLeft: '25px',
								display: 'inlineBlock',
								width: '100%',
							}}
						>
							<p>
								<Icon name='shopping bag' color='yellow' />
								<span style={{ fontSize: '16px' }}>Ecommerce Demo</span>
							</p>
						</Container>
						<Menu secondary vertical>
							<Menu.Item
								as={Link}
								to='/admin/home'
								name='home'
								active={activeItem === 'home'}
								onClick={handleItemClick}
							>
								<Icon name='dashboard' />
								Dashboard
							</Menu.Item>
							<Menu.Item
								as={Link}
								to='/admin/customer'
								name='customer'
								active={activeItem === 'customer'}
								onClick={handleItemClick}
							>
								<Icon name='user outline' />
								Customer
							</Menu.Item>
							<Menu.Item
								name='order'
								active={activeItem === 'order'}
								onClick={handleItemClick}
							>
								<Icon name='shopping cart' />
								Order
							</Menu.Item>
							<Menu.Item
								name='product'
								active={activeItem === 'product'}
								onClick={handleItemClick}
							>
								<Icon name='computer' />
								Product
							</Menu.Item>
							<Menu.Item
								name='payment'
								active={activeItem === 'payment'}
								onClick={handleItemClick}
							>
								<Icon name='credit card outline' />
								Payment
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={13}>
						<LayoutMenu />
						<Outlet />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
};

export default AdminLayout;