import React, { useState } from 'react';
import { CheckoutState } from '@src/checkout/checkoutContext';
import { Header, Icon, Form, Radio, Container } from 'semantic-ui-react';

const ShippingFee = (props) => {
	const { setChooseShipping } = props;
	const { shippingFee, setShippingFee } = CheckoutState();

	const [value, setValue] = useState(null);

	const handleChange = (e, { value }) => {
		setShippingFee(value);
		setValue(value);
		console.log(shippingFee);
		setChooseShipping(true);
	};

	return (
		<>
			<Header as='h4'>
				<Icon name='telegram plane' />
				2. Choose The Shipping Method
			</Header>
			<Container>
				<Form>
					<Form.Field>
						<Radio
							label='HK$7.99 Expedited Shipping '
							name='radioGroup'
							value={7.99}
							checked={value === 7.99}
							onChange={handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<Radio
							label='HK$0.00 Standard Shipping (Free Shipping)'
							name='radioGroup'
							value={0.0}
							checked={value === 0.0}
							onChange={handleChange}
						/>
					</Form.Field>
				</Form>
			</Container>
		</>
	);
};

export default ShippingFee;
