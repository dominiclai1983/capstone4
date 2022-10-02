import React, { useState, useEffect } from 'react';
import { Container, Header, Icon, Card } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountHome = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/authenticated');
			} catch (err) {
				console.error(err);
				navigate('/login');
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Container style={{ marginTop: 60 }}>
				<Header as='h2' textAlign='center'>
					Your Account
				</Header>
				<Card.Group centered>
					<Card as={Link} to='/account/order'>
						<Card.Content>
							<Card.Header>
								<Icon name='box' />
								Your Orders
							</Card.Header>
							<Card.Meta>Track, return, or buy things again</Card.Meta>
						</Card.Content>
					</Card>

					<Card>
						<Card.Content>
							<Card.Header>
								<Icon name='address book' />
								Your Addresses
							</Card.Header>
							<Card.Meta>Track, return, or buy things again</Card.Meta>
						</Card.Content>
					</Card>
				</Card.Group>

				<Card.Group centered>
					<Card as={Link} to='/account/profile'>
						<Card.Content>
							<Card.Header>
								<Icon name='setting' />
								Your Profiles
							</Card.Header>
							<Card.Meta>Manage Your Account</Card.Meta>
						</Card.Content>
					</Card>
					<Card>
						<Card.Content>
							<Card.Header>
								<Icon name='credit card outline' />
								Your Payment
							</Card.Header>
							<Card.Meta>
								View all transactions, manage payment methods and settings
							</Card.Meta>
						</Card.Content>
					</Card>
				</Card.Group>
			</Container>
		</>
	);
};

export default AccountHome;
