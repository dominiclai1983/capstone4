import React, { useState } from 'react';
import {
	Container,
	Segment,
	Header,
	Icon,
	Button,
	Form,
	Message,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
	const navigate = useNavigate();

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
			const result = await axios.post('/api/admins', user);
			if (result.data.success) {
				navigate('/admin/home');
			}
		} catch (err) {
			console.error(err);
			setDisplayMessage(true);
			setSystemMessage('The Password Is Incorrect!');
		}
	};

	return (
		<>
			<Container style={{ marginTop: '150px' }}>
				<Segment placeholder>
					<Header textAlign='center'>
						<Icon name='shopping bag' />
						Ecommerce Demo Admin Site Login
					</Header>
					<Form onSubmit={handleLogin}>
						<Form.Input
							icon='user'
							iconPosition='left'
							label='Email'
							placeholder='info@info.com'
							value={email}
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
							value={password}
							onChange={(e) => {
								e.preventDefault();
								setPassword(e.target.value);
							}}
						/>

						<Button content='Login' color='yellow' fluid />
					</Form>
				</Segment>
			</Container>
			{displayMessage && (
				<Container textAlign='left' style={{ marginTop: '10px' }}>
					<Message negative>{systemMessage}</Message>
				</Container>
			)}
		</>
	);
};

export default AdminLogin;
