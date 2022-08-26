import React, { useState } from 'react';
import {
	Button,
	Divider,
	Form,
	Grid,
	Segment,
	Container,
} from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const location = useLocation();
	//could useLocation hook to passdown the state
	const [password, setPassword] = useState('');

	console.log(location.state);
	//console.log(location.state ? true : false);

	const handleLogin = async () => {
		const user = {
			user: {
				email,
				password,
			},
		};

		try {
			const result = await axios.post('/api/sessions', user);
			if (result.data.success) {
				guestCartConversion();
				location.state
					? window.location.replace('/checkout')
					: window.location.replace('/');
			}
		} catch (err) {
			console.error(err);
		}
	};

	//this method convert guest cart into cart
	const guestCartConversion = async () => {
		try {
			const result = await axios.get('/api/conversion');
			if (result.data) {
				console.log(result.data);
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

							<Button content='Login' primary />
						</Form>
					</Grid.Column>

					<Grid.Column verticalAlign='middle'>
						<Button content='Sign up' icon='signup' size='big' />
					</Grid.Column>
				</Grid>

				<Divider vertical>Or</Divider>
			</Segment>
		</Container>
	);
};

export default Login;
