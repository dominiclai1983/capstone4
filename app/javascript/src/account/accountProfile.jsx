import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Header, Table, Button, Container } from 'semantic-ui-react';

const AccountProfile = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
	const [edit, setEdit] = useState(false);

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

	return (
		<>
			{' '}
			<Container textAlign='center' style={{ marginTop: 60 }}>
				<Header as='h1'>Account Profile</Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Username</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Email</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							Password{' '}
							<Button floated='right' labelPosition='left' primary size='small'>
								Edit
							</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Container>
		</>
	);
};

export default AccountProfile;
