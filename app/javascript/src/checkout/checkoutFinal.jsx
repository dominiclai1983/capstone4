import React, { useEffect } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import ConfirmGrid from '@components/checkout/ConfirmGrid';
import { useLocation, useOutletContext } from 'react-router-dom';

const CheckoutFinal = () => {
	const { pathname } = useLocation();
	const [activeItem, setActiveItem, loginStatus, setLoginStatus] =
		useOutletContext();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);

	useEffect(() => {
		setActiveItem(path);
		if (!loginStatus) {
			window.location.replace('/login');
		}
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
