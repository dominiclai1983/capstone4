import React, { useState, useEffect } from 'react';
import { Menu, Grid, Icon, Dropdown } from 'semantic-ui-react';
import LayoutMenu from '@components/admin/LayoutMenu';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLayout = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const path = pathname.substring(7).replace('home/', '');
	//7 char = '/admin/
	console.log(path);
	const [activeItem, setActiveItem] = useState(path);
	const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/admin_auth');

				if (result.data.authenticated) {
					setLoginStatus(result.data.authenticated);
					setUsername(result.data.username);
				}
			} catch (err) {
				console.error(err);
				navigate('/admin');
			}
		};
		fetchData();
	}, []);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<>
			{loginStatus && (
				<Grid container style={{ width: '100vw' }}>
					<Grid.Row>
						<Grid.Column width={3}>
							<p
								style={{
									marginTop: '35px',
									marginBottom: '35px',
									paddingLeft: '25px',
									display: 'inlineBlock',
									width: '100%',
								}}
							>
								<Icon name='shopping bag' color='yellow' />
								<span style={{ fontSize: '16px' }}>Ecommerce Demo Admin</span>
							</p>
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
									to='/admin/home/customer'
									name='customer'
									active={activeItem === 'customer'}
									onClick={handleItemClick}
								>
									<Icon name='user outline' />
									Customer
								</Menu.Item>
								<Menu.Item
									as={Link}
									to='/admin/home/order'
									name='order'
									active={activeItem === 'order'}
									onClick={handleItemClick}
								>
									<Icon name='shopping cart' />
									Order
								</Menu.Item>
								<Dropdown item text='Product'>
									<Dropdown.Menu>
										<Dropdown.Item
											as={Link}
											to='/admin/home/product'
											name='product'
											active={activeItem === 'product'}
											onClick={handleItemClick}
										>
											Manage Products
										</Dropdown.Item>
										<Dropdown.Item
											as={Link}
											to='/admin/addproduct'
											name='addproduct'
											active={activeItem === 'addproduct'}
											onClick={handleItemClick}
										>
											Add a Product
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>

								<Menu.Item
									as={Link}
									to='/admin/home/payment'
									name='payment'
									active={activeItem === 'payment'}
									onClick={handleItemClick}
								>
									<Icon name='credit card outline' />
									Payment
								</Menu.Item>
							</Menu>
						</Grid.Column>
						<Grid.Column width={13} textAlign='center'>
							<LayoutMenu username={username} />
							<Outlet context={[errorMsg, setErrorMsg]} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)}
		</>
	);
};

export default AdminLayout;
