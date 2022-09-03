import React, { useState, useEffect } from 'react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import ShippingAddress from './ShippingAddress';
import ShippingFee from './ShippingFee';
import OrderTable from './OrderTable';
import OrderSummary from './OrderSummary';
import { Grid, Table, Divider, Container } from 'semantic-ui-react';
import { useLocation, useOutletContext } from 'react-router-dom';

const ConfirmGrid = () => {
	const [chooseShipping, setChooseShipping] = useState(false);
	return (
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
	);
};

export default ConfirmGrid;
