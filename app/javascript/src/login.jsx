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
	const [password, setPassword] = useState('');
	const location = useLocation();
	//could useLocation hook to pass down the state. get it by location.state

	console.log(location.state);

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
						<Button content='Sign up' icon='signup' size='big' />
					</Grid.Column>
				</Grid>

				<Divider vertical>Or</Divider>
			</Segment>
		</Container>
	);
};

export default Login;
