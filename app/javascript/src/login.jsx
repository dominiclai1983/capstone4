import React, { useState } from 'react';
import {
	Button,
	Divider,
	Form,
	Grid,
	Segment,
	Container,
	Message,
} from 'semantic-ui-react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const location = useLocation();
	//could useLocation hook to pass down the state. get it by location.state

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayMessage, setDisplayMessage] = useState(false);
	const [systemMessage, setSystemMessage] = useState('');

	const handleLogin = async () => {
		const user = {
			user: {
				email,
				password,
			},
		};

		setDisplayMessage(false);

		try {
			const result = await axios.post('/api/sessions', user);
			if (result.data.success) {
				guestCartConversion();
				location.state
					? window.location.replace('/checkout')
					: window.location.replace('/');
			}
			//if prev path is cart, then redirect to checkout
			//prev path is getting by location.state. it is passed down from cart.jsx through <Link> state property"
			//<Link to={'/login'} state={{ prevPath: location.pathname }}>
		} catch (err) {
			console.error(err);
			setSystemMessage('The Password Is Incorrect!');
			setDisplayMessage(true);
		}
	};

	//this method convert guest cart into cart
	const guestCartConversion = async () => {
		try {
			const result = await axios.get('/api/conversion');
			if (result.data) {
				console.log(result.data);
				//keep above console.log
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container style={{ marginTop: 20 }}>
			<Segment placeholder>
				<Grid columns={2} relaxed='very' stackable>
					<Grid.Column>
						<Form onSubmit={handleLogin}>
							<Form.Input
								icon='user'
								iconPosition='left'
								label='Email'
								placeholder='Email'
								type='email'
								onChange={(e) => {
									e.preventDefault();
									setEmail(e.target.value);
								}}
							/>
							<Form.Input
								icon='lock'
								iconPosition='left'
								label='Password'
								type='password'
								onChange={(e) => {
									e.preventDefault();
									setPassword(e.target.value);
								}}
							/>

							<Button content='Login' color='yellow' />
						</Form>
					</Grid.Column>

					<Grid.Column verticalAlign='middle'>
						<Button
							content='Sign up'
							icon='signup'
							size='big'
							as={Link}
							to='/signup'
						/>
					</Grid.Column>
				</Grid>

				<Divider vertical>Or</Divider>
			</Segment>
			{displayMessage && <Message negative>{systemMessage}</Message>}
		</Container>
	);
};

export default Login;
