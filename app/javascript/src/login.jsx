import React, { useState } from 'react';
import {
	Button,
	Divider,
	Form,
	Grid,
	Segment,
	Container,
} from 'semantic-ui-react';
import axios from 'axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const user = {
			user: {
				email,
				password,
			},
		};

		try {
			const result = await axios.post('/api/sessions', user);
			console.log(result.data);
			if (result.data.success) {
				window.location.replace('/');
			}
		} catch (err) {
			console.error(err);
		}
	};

	//TODO: Write a method to convert guest cart to cart
	const guestCartConversion = () => {};

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
