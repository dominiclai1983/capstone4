import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Menu, Image, Dropdown, Icon } from 'semantic-ui-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
//import { CartState } from '@src/context';

function Layout() {
	const { pathname } = useLocation();
	//const { cart, setCart, currentOrder, setCurrentOrder } = CartState();
	const path = pathname === '/' ? 'home' : pathname.substring(1);

	const [activeItem, setActiveItem] = useState(path);
	const [isLogin, setIsLogin] = useState(false);
	const [username, setUsername] = useState('');

	/*
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
				setIsLogin(result.data.authenticated);
				setUsername(result.data.username);
				setCurrentOrder(result.data.current_order);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	console.log('some string');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/api/order_details/${currentOrder}`);
				setCart(result.data.order_details);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [currentOrder]);
*/
	console.log('anything wrong');

	const handleItemClick = (e, { name }) => setActiveItem(name);

	const handleLogOut = async () => {
		try {
			const result = await axios.delete('/api/sessions');
			if (result.data) {
				window.location.reload();
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
					as={NavLink}
					to='/signup'
					name='signup'
					active={activeItem === 'signup'}
					onClick={handleItemClick}
				>
					SignUp
				</Menu.Item>
				<Menu.Item
					as={NavLink}
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
				<Dropdown item text={username.toString()}>
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
					as={NavLink}
					to='/'
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
				>
					Home
				</Menu.Item>

				<Menu.Item
					as={NavLink}
					to='/bracelet'
					name='bracelet'
					active={activeItem === 'bracelet'}
					onClick={handleItemClick}
				>
					Bracelet
				</Menu.Item>

				<Menu.Item
					as={NavLink}
					to='/earrings'
					name='earrings'
					active={activeItem === 'earrings'}
					onClick={handleItemClick}
				>
					Earrings
				</Menu.Item>
				<Menu.Menu position='right'>
					{isLogin ? (
						<LogoutComponent username={username} />
					) : (
						<LoginComponent />
					)}
					<Menu.Item
						as={NavLink}
						to='/cart'
						name='cart'
						active={activeItem === 'cart'}
						onClick={handleItemClick}
						style={{ marginRight: 20 }}
					>
						<Icon name='shopping cart' size='large' />
						{/* {cart.length} */}
					</Menu.Item>
				</Menu.Menu>
			</Menu>
			<Outlet context={[activeItem, setActiveItem]} />
		</>
	);
}

export default Layout;
