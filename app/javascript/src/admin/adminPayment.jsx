import React from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';

const AdminPayment = () => {
	return (
		<>
			<Container textAlign='center' style={{ marginTop: '15px' }}>
				<Header as='h2' textAlign='left'>
					Payment
				</Header>
				<Divider />
			</Container>
		</>
	);
};

export default AdminPayment;
