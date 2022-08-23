import React from 'react';
import { Card, Grid } from 'semantic-ui-react';

const CartSummary = (props) => {
	let { total } = props;
	return (
		<Card>
			<Card.Content>
				<Card.Header style={{ textAlign: 'left' }}>Order Summary</Card.Header>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column style={{ textAlign: 'left' }}>SubTotal</Grid.Column>
						<Grid.Column style={{ textAlign: 'right' }}>
							${total.toFixed(2)}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column style={{ textAlign: 'left' }}>
							Estimated Shipping
						</Grid.Column>
						<Grid.Column style={{ textAlign: 'right' }}>TBD</Grid.Column>
					</Grid.Row>
				</Grid>
			</Card.Content>
			<Card.Content extra>
				<Card.Meta>
					<span className='date'>Order Total: ${total.toFixed(2)}</span>
				</Card.Meta>
			</Card.Content>
		</Card>
	);
};

export default CartSummary;
