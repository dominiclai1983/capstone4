import React, { useState, useEffect } from 'react';
import { CartState } from '@src/context';
import _ from 'lodash';
import {
	Menu,
	Image,
	Dropdown,
	Icon,
	Popup,
	Button,
	Header,
	Divider,
	Grid,
	Container,
} from 'semantic-ui-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

function Layout() {
	const { pathname } = useLocation();
	const {
		cart,
		setCart,
		currentCartID,
		setCurrentCartID,
		setLoginStatus,
		loginStatus,
	} = CartState();
	const path = pathname === '/' ? 'home' : pathname.substring(1);

	const [activeItem, setActiveItem] = useState(path);
	const [username, setUsername] = useState('');

	//this useEffect() is checking the login status
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
				setLoginStatus(result.data.authenticated);
				setUsername(result.data.username);
				setCurrentCartID(result.data.current_cart);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [cart]);

	//this useEffect is checking the user cart || guest cart
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (currentCartID) {
					const result = await axios.get(`/api/cart_details/${currentCartID}`);
					setCart(result.data.cart_details);
				} else {
					const result = await axios.get(`/api/guest_cart_details`);
					setCart(result.data.guest_cart_details);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [currentCartID]);

	console.log(cart);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const handleLogOut = async () => {
		try {
			const result = await axios.delete('/api/sessions');
			if (result.data) {
				window.location.replace('/');
			}
		} catch (err) {
			console.error(err);
		}
	};

	//remember the prop component has to be capital
	const LoginComponent = () => {
		return (
			<>
				<Menu.Item
					as={Link}
					to='/signup'
					name='signup'
					active={activeItem === 'signup'}
					onClick={handleItemClick}
				>
					SignUp
				</Menu.Item>
				<Menu.Item
					as={Link}
					to='/login'
					name='login'
					active={activeItem === 'login'}
					onClick={handleItemClick}
				>
					Login
				</Menu.Item>
			</>
		);
	};

	const LogoutComponent = (props) => {
		let { username } = props;
		return (
			<>
				<Dropdown item text={'Hello!' + '  ' + username}>
					<Dropdown.Menu>
						<Dropdown.Item as='a' href='/account'>
							Account
						</Dropdown.Item>
						<Dropdown.Item>Order</Dropdown.Item>
						<Dropdown.Item>Payment</Dropdown.Item>
						<Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Menu.Item> </Menu.Item>
			</>
		);
	};

	return (
		<>
			<Menu secondary>
				<Menu.Item style={{ marginLeft: 20 }}>
					<Image
						src='https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg'
						size='tiny'
					/>
				</Menu.Item>

				<Menu.Item
					as={Link}
					to='/'
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
				>
					Home
				</Menu.Item>

				<Menu.Item
					as={Link}
					to='/bracelet'
					name='bracelet'
					active={activeItem === 'bracelet'}
					onClick={handleItemClick}
				>
					Bracelet
				</Menu.Item>

				<Menu.Item
					as={Link}
					to='/earrings'
					name='earrings'
					active={activeItem === 'earrings'}
					onClick={handleItemClick}
				>
					Earrings
				</Menu.Item>
				<Menu.Menu position='right'>
					{loginStatus ? (
						<LogoutComponent username={username} />
					) : (
						<LoginComponent />
					)}
					<Popup
						trigger={
							<Menu.Item
								as={Link}
								to='/cart'
								name='cart'
								active={activeItem === 'cart'}
								onClick={handleItemClick}
								style={{ marginRight: 20 }}
							>
								<Icon name='shopping cart' size='large' />
								{cart.length}
							</Menu.Item>
						}
						disabled={path === 'cart' || cart.length === 0 ? true : false}
						hoverable
					>
						<Header>My Cart - {cart.length} items</Header>

						{cart.map((cart, index) => {
							return (
								<p
									key={index}
									style={{ textAlign: 'justify', textJustify: 'interWord' }}
								>
									{cart.title} Qty: {cart.quantity}
								</p>
							);
						})}

						<Divider />
						{loginStatus ? (
							<Button color='yellow' fluid as='a' href='/checkout'>
								CheckOut
							</Button>
						) : (
							<Link to={'/login'} state={{ prevPath: 'popup' }}>
								<Button
									color='yellow'
									fluid
									name='login'
									onClick={handleItemClick}
								>
									CheckOut
								</Button>
							</Link>
						)}
					</Popup>
				</Menu.Menu>
			</Menu>
			<Outlet context={[activeItem, setActiveItem]} />
		</>
	);
}

export default Layout;
