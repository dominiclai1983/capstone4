import React, { useEffect, useState } from 'react';
import 
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

	const handleRemoveCurrentCart = () => {
		fetch(`/api/charges_intent?order_id=${orderDetail.id}`)
			.then(handleErrors)
			.then((data) => {
				console.log(data);
			});
	};

	useBeforeunload((e) => {
		handleRemoveCurrentCart();
	})

	return <div>CheckoutSuccess: {orderDetail.id}</div>;
};

export default CheckoutSuccess;
