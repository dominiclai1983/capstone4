import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import HomePanel from '@components/admin/HomePanel';
import axios from 'axios';

const AdminHome = () => {
	const [totalOrder, setTotalOrder] = useState(null);
	const [totalRevenue, setTotalRevenue] = useState(null);
	const [allOrders, setAllOrders] = useState([]);
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	// Jan returns 0
	const [year, setYear] = useState(new Date().getFullYear());
	const [revenueArray, setRevenueArray] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(
					`/api/orders?month=${month}&year=${year}`
				);
				setAllOrders(result.data.orders);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [month, year]);

	useEffect(() => {
		let newArray = [];
		for (let i = 0; i < 31; i++) {
			let new_total = allOrders
				.filter((item) => parseInt(item.order_date.substring(8, 10)) === i)
				.reduce((acc, cur) => acc + Number(cur.order_total), 0);
			newArray.push(new_total / 100);
		}
		setRevenueArray(newArray);
		setTotalRevenue(
			allOrders.reduce((acc, cur) => acc + Number(cur.order_total), 0) / 100
		);
		setTotalOrder(allOrders.length);
	}, [allOrders]);

	console.log(revenueArray);
	console.log(totalRevenue);

	return (
		<>
			<Container textAlign='center' style={{ marginTop: '15px' }}>
				<HomePanel totalOrder={totalOrder} totalRevenue={totalRevenue} />
			</Container>
		</>
	);
};

export default AdminHome;
