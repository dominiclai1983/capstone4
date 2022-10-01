import React from 'react';
import { Segment, Container } from 'semantic-ui-react';

const CustomerDisplay = (props) => {
	let { user } = props;
	return (
		<>
			<Segment inverted color='grey' size='mini' textAlign='left'>
				Customer Details
			</Segment>
			<Container textAlign='left'>
				<p>username: {user.username}</p>
			</Container>
			<Segment inverted color='grey' size='mini' textAlign='left'>
				Customer Orders
			</Segment>
		</>
	);
};

export default CustomerDisplay;
