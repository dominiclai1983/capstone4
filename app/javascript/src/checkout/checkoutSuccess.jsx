import React, { useEffect, useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { handleErrors } from '@components/utils/fetchHelper';
import axios from 'axios';

const CheckoutSuccess = () => {
	const location = window.location.search;
	const clientSecret = new URLSearchParams(window.location.search).get(
		'payment_intent_client_secret'
	);
	const [orderDetail, setOrderDetail] = useState({});
	console.log(location);
	console.log(clientSecret);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(
					`/api/charges_intent?checkout_session_id=${clientSecret}`
				);
				if (result.data) {
					setOrderDetail(result.data.order);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	console.log(clientSecret);

	const id = orderDetail.id;

	const handleRemoveCurrentCart = async () => {
		const order_id = {
			order_id: id,
		};
		try {
			const result = await axios.post('/api/remove_current_cart', order_id);
			console.log(result);
		} catch (err) {
			console.error(err);
		}
	};

	useBeforeunload(async (e) => {
		handleRemoveCurrentCart();
	});

	return <div>CheckoutSuccess: {orderDetail.id}</div>;
};

export default CheckoutSuccess;
