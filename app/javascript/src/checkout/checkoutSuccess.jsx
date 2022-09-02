import React, { useEffect, useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useLocation, useOutletContext } from 'react-router-dom';
import axios from 'axios';
//useBeforeunload() is a hook to handle onbeforeunload event
/*fire an api call to change dispatch_confirm to true when the page is close 
and prevent the revisit of the page*/
const CheckoutSuccess = () => {
	const { pathname } = useLocation();
	const [activeItem, setActiveItem] = useOutletContext();
	const path = pathname === '/checkout' ? 'home' : pathname.substring(10);
	const location = window.location.search;
	const clientSecret = new URLSearchParams(window.location.search).get(
		'payment_intent_client_secret'
	);
	const [orderDetail, setOrderDetail] = useState({});
	console.log(location);
	console.log(clientSecret);

	useEffect(() => {
		setActiveItem(path);
		const fetchData = async () => {
			try {
				const result = await axios.get(
					`/api/charges_intent?checkout_session_id=${clientSecret}`
				);
				//TODO: redirect to account page when account section ready
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
