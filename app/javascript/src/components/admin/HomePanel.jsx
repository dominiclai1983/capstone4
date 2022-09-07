import React from 'react';
import { Grid, Image, Header, Icon } from 'semantic-ui-react';

const HomePanel = (props) => {
	let { totalOrder, totalRevenue } = props;
	return (
		<>
			<Header as='h3' textAlign='left'>
				Dashboard
			</Header>
			<Grid
				columns={2}
				divided
				stackable
				container
				style={{ marginTop: '15px' }}
			>
				<Grid.Row>
					<Grid.Column>Orders: {totalOrder}</Grid.Column>
					<Grid.Column>Sales: {totalRevenue}</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
};

export default HomePanel;
