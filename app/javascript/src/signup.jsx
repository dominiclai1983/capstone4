import React, { useState } from 'react';
import { Button, Form, Icon, Message, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [disableTAndC, setDisableTAndC] = useState(true);

	const handleSubmit = async () => {
		const user = {
			username,
			email,
			password,
			passwordConfirmation,
		};

		try {
			const result = await axios.post('/api/users', user);
			console.log(result.data);
			if (result.data.success) {
				window.location.replace('/');
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Container style={{ marginTop: 20 }}>
				<Message
					attached
					header='Welcome to our site!'
					content='Fill out the form below to sign-up for a new account'
				/>
				<Form className='attached fluid segment' onSubmit={handleSubmit()}>
					<Form.Input
						label='Email'
						placeholder='email@email.com'
						type='email'
						value={email}
						onChange={(e) => {
							e.preventDefault();
							setEmail(e.target.value);
						}}
					/>
					<Form.Input
						label='Username'
						placeholder='Username'
						type='text'
						value={username}
						onChange={(e) => {
							e.preventDefault();
							setUsername(e.target.value);
						}}
					/>
					<Form.Input
						label='Password'
						type='password'
						value={password}
						onChange={(e) => {
							e.preventDefault();
							setPassword(e.target.value);
						}}
					/>
					<Form.Input
						label='Confirm Password'
						type='password'
						value={passwordConfirmation}
						onChange={(e) => {
							e.preventDefault();
							setPasswordConfirmation(e.target.value);
						}}
					/>
					<Form.Checkbox
						inline
						label='I agree to the terms and conditions'
						onClick={() => {
							setDisableTAndC(!disableTAndC);
							console.log(disableTAndC);
						}}
					/>
					<Button color='blue' disabled={disableTAndC}>
						Submit
					</Button>
				</Form>
				<Message attached='bottom' warning>
					<Icon name='help' />
					Already signed up?&nbsp;<Link to='/login'>Login here</Link>
					&nbsp;instead.
				</Message>
			</Container>
		</>
	);
};

export default Signup;
