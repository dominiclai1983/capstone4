import React, { useState } from 'react';
import { Button, Form, Icon, Message, Container } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [disableTAndC, setDisableTAndC] = useState(true);
	const [displayMessage, setDisplayMessage] = useState(false);
	const [systemMessage, setSystemMessage] = useState('');

	const handleSubmit = async () => {
		const user = {
			user: {
				username,
				email,
				password,
				passwordConfirmation,
			},
		};

		setDisplayMessage(false);

		if (password !== passwordConfirmation) {
			setSystemMessage('The Password Does Not Match With Confirm Password!');
			setDisplayMessage(true);
			return;
		}

		try {
			const result = await axios.post('/api/users', user);
			console.log(result.data);
			if (result.data.success) {
				navigate('/');
			}
		} catch (err) {
			console.error(err);
			setSystemMessage('The Username / Email Has Been Registered!');
			setDisplayMessage(true);
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
				{displayMessage && <Message negative>{systemMessage}</Message>}
				<Form
					className='attached fluid segment'
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
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
						onChange={() => {
							setDisableTAndC(!disableTAndC);
						}}
					/>
					<Button
						color='yellow'
						disabled={
							!disableTAndC ||
							!username ||
							!email ||
							!password ||
							!passwordConfirmation
						}
					>
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
