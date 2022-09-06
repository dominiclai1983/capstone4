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
				navigate('../home');
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
				<Form>
					<Form.Field>
						<label>Email:</label>
						<input placeholder='info@info.com' />
					</Form.Field>
					<Form.Field>
						<label>Password:</label>
						<input placeholder='' />
					</Form.Field>
					<Button type='submit' fluid color='yellow'>
						Login Now!
					</Button>
				</Form>
			</Segment>
		</Container>
	);
};

export default AdminLogin;
