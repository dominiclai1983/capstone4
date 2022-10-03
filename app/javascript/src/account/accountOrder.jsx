import React, { useState, useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';
import OrderTable from '@components/admin/OrderTable';
import axios from 'axios';

const AccountOrder = () => {
	const [orders, setOrder] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('/api/orders');
				console.log(result.data.orders);
				if (result.data.orders) {
					setOrder(result.data.orders);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	const NoOrder = () => {
		return <p>You still have no place an order!</p>;
	};

	return (
		<>
			<Container style={{ marginTop: 60 }}>
				<Header as='h2' textAlign='center'>
					Your Orders
				</Header>
				{orders.length > 0 ? <OrderTable orders={orders} /> : null}
				{orders.length == 0 ? null : <NoOrder />}
			</Container>
		</>
	);
};

export default AccountOrder;
