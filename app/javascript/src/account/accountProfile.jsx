import React, { useState, useEffect } from 'react';
import {
	Header,
	Grid,
	Container,
	Button,
	Form,
	Message,
} from 'semantic-ui-react';
import axios from 'axios';

const AccountProfile = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
	const [displayEdit, setDisplayEdit] = useState(false);
	const [displayMessage, setDisplayMessage] = useState(false);
	const [systemMessage, setSystemMessage] = useState('');
	const [positive, setPositive] = useState(false);
	const [negative, setNegative] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
				setUsername(result.data.username);
				setEmail(result.data.email);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const handleSubmit = async () => {
		const sendNewPassword = {
			user: {
				password: password,
				new_password: newPassword,
			},
		};

		setDisplayMessage(false);

		if (newPassword !== newPasswordConfirm) {
			setSystemMessage(
				'The New Password Does Not Match With Confirm New Password'
			);
			setNegative(true);
			setDisplayMessage(true);
			return;
		}

		try {
			const result = await axios.put('/api/users', sendNewPassword);
			if (result.data.success) {
				setDisplayEdit(!displayEdit);
				setDisplayMessage(true);
				setPositive(true);
				setNegative(false);
				setSystemMessage('The New Password Has Been Set!');
				setPassword('');
				setNewPassword('');
				setNewPasswordConfirm('');
			}
		} catch (err) {
			console.error(err);
			setSystemMessage('The old password is incorrect!');
			setPositive(false);
			setNegative(true);
			setDisplayMessage(true);
		}
	};

	return (
		<>
			{' '}
			<Container textAlign='center' style={{ marginTop: '60px' }}>
				<Header as='h1'>Account Profile</Header>
				<Grid columns='one' textAlign='left' celled>
					<Grid.Row>
						<Grid.Column width={12}>
							User Name: <br />
							{username}
						</Grid.Column>
						<Grid.Column width={4}></Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column width={12}>
							Email: <br />
							{email}
						</Grid.Column>
						<Grid.Column width={4}></Grid.Column>
					</Grid.Row>
					{displayEdit ? null : (
						<Grid.Row>
							<Grid.Column width={12}>
								Password: <br />
								•••••••
							</Grid.Column>
							<Grid.Column textAlign='center' width={4}>
								<Button
									float='right'
									onClick={() => {
										setDisplayMessage(false);
										setDisplayEdit(!displayEdit);
									}}
								>
									Edit
								</Button>
							</Grid.Column>
						</Grid.Row>
					)}
				</Grid>
			</Container>
			{displayEdit && (
				<Container textAlign='left'>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<Header as='h3'>Change Your Password!</Header>
						<Form.Field>
							<label>Old Password</label>
							<input
								type='password'
								value={password}
								onChange={(e) => {
									e.preventDefault();
									setPassword(e.target.value);
								}}
							/>
						</Form.Field>
						<Form.Field>
							<label>New Password</label>
							<input
								type='password'
								value={newPassword}
								onChange={(e) => {
									e.preventDefault();
									setNewPassword(e.target.value);
								}}
							/>
						</Form.Field>
						<Form.Field>
							<label>Confirm New Password</label>
							<input
								type='password'
								value={newPasswordConfirm}
								onChange={(e) => {
									e.preventDefault();
									setNewPasswordConfirm(e.target.value);
								}}
							/>
						</Form.Field>
						<Button
							type='submit'
							onClick={() => {
								setDisplayEdit(!displayEdit);
								setDisplayMessage(false);
								setPassword('');
								setNewPassword('');
								setNewPasswordConfirm('');
							}}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							floated='right'
							color='yellow'
							disabled={!password || !newPassword || !newPasswordConfirm}
						>
							Submit
						</Button>
					</Form>
				</Container>
			)}
			{displayMessage && (
				<Container textAlign='left' style={{ marginTop: '10px' }}>
					<Message positive={positive} negative={negative}>
						{systemMessage}
					</Message>
				</Container>
			)}
		</>
	);
};

export default AccountProfile;
