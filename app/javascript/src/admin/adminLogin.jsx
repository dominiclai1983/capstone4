import axios from 'axios';
import React, { useState } from 'react';
import {
	Container,
	Segment,
	Header,
	Icon,
	Button,
	Form,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = async () => {
		const user = {
			user: {
				email,
				password,
			},
		};

		try {
			const result = await axios.post('/api/admins', user);
			if (result.data.success) {
				window.location.replace('/admin/home');
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
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
	);
};

export default AdminLogin;