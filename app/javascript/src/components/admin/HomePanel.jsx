import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

const HomePanel = (props) => {
	let { totalOrder, totalRevenue } = props;
	return (
		<>
			<Grid
				columns={2}
				divided
				stackable
				container
				textAlign='center'
				style={{
					marginTop: '15px',
					boxShadow: '1px 0px 5px #ccc',
					Height: '35px',
				}}
			>
				<Grid.Row>
					<Grid.Column>
						<Icon name='shopping cart' />
						Orders: {totalOrder}
					</Grid.Column>
					<Grid.Column>
						<Icon name='dollar sign' />
						Sales: {totalRevenue}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
};

export default HomePanel;
