import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

import '@src/css/utils.scss';

//TODO: change the inline style later on
const Footer = () => {
	return (
		<Grid divided='vertically' textAlign='center'>
			<Grid.Row columns={4} style={{ marginTop: 60 }}>
				<Grid.Column>
					<Image
						src='https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg'
						size='tiny'
					/>
				</Grid.Column>
				<Grid.Column>text</Grid.Column>
				<Grid.Column>text </Grid.Column>
				<Grid.Column>text</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Footer;
