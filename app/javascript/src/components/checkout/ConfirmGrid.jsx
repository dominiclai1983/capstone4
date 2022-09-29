import React, { useState } from 'react';
import ShippingAddress from './ShippingAddress';
import ShippingFee from './ShippingFee';
import OrderTable from './OrderTable';
import OrderSummary from './OrderSummary';
import { Grid, Header } from 'semantic-ui-react';

const ConfirmGrid = () => {
	const [chooseShipping, setChooseShipping] = useState(false);
	return (
		<>
			<Header as='h2'>Confirm Your Order Details</Header>
			<Grid.Row>
				<Grid.Column width={11}>
					<ShippingAddress />
					<ShippingFee setChooseShipping={setChooseShipping} />
					<OrderTable />
				</Grid.Column>
				<Grid.Column width={5}>
					<OrderSummary chooseShipping={chooseShipping} />
				</Grid.Column>
			</Grid.Row>
		</>
	);
};

export default ConfirmGrid;
