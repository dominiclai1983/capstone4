import React, { useState } from 'react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import { Header, Icon, Radio, Container, List } from 'semantic-ui-react';

const ShippingFee = (props) => {
	const { setChooseShipping } = props;
	const { shippingFee, setShippingFee } = CheckoutState();

	const [value, setValue] = useState(null);

	const handleChange = (e, { value }) => {
		setShippingFee(value);
		setValue(value);
		setChooseShipping(true);
	};

	return (
		<>
			<Header as='h4'>
				<Icon name='telegram plane' />
				2. Choose The Shipping Method
			</Header>
			<List>
				<List.Item>
					<Radio
						label='HK$7.99 Expedited Shipping '
						name='radioGroup'
						value={7.99}
						checked={value === 7.99}
						onChange={handleChange}
					/>
				</List.Item>
				<List.Item>
					<Radio
						label='HK$0.00 Standard Shipping (Free Shipping)'
						name='radioGroup'
						value={0.0}
						checked={value === 0.0}
						onChange={handleChange}
					/>
				</List.Item>
			</List>
		</>
	);
};

export default ShippingFee;
