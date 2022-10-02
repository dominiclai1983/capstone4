import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

//TODO: change the inline style later on
const Footer = () => {
	return (
		<Grid divided='vertically' textAlign='center'>
			<Grid.Row columns={4} style={{ marginTop: 60 }}>
				<Grid.Column>
					<Header as='h6' icon>
						<Icon name='shopping bag' color='yellow' />
						Ecommerce Demo
					</Header>
				</Grid.Column>
				<Grid.Column>text</Grid.Column>
				<Grid.Column>text </Grid.Column>
				<Grid.Column>text</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Footer;
