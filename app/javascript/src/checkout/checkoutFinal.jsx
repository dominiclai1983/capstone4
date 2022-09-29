import React, { useEffect } from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import ConfirmGrid from '@components/checkout/ConfirmGrid';
import { useLocation, useOutletContext } from 'react-router-dom';

const CheckoutFinal = () => {
	const { pathname } = useLocation();
	const [activeItem, setActiveItem] = useOutletContext();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);

	useEffect(() => {
		setActiveItem(path);
	}, []);
	return (
		<Container style={{ marginTop: '25px' }}>
			<Grid>
				<ConfirmGrid />
			</Grid>
		</Container>
	);
};

export default CheckoutFinal;
