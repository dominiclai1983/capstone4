import React, { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import HomePanel from '@components/admin/HomePanel';
import HomeRevenueChart from '@components/admin/HomeRevenueChart';
import axios from 'axios';

const AdminHome = () => {
	const [totalOrder, setTotalOrder] = useState(null);
	const [totalRevenue, setTotalRevenue] = useState(null);
	const [allOrders, setAllOrders] = useState([]);
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	// Jan returns 0
	const [year, setYear] = useState(new Date().getFullYear());
	const [revenueArray, setRevenueArray] = useState([]);
	const [orderArray, setOrderArray] = useState([]);

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
		let newDailyArray = [];
		let newDailyTotalArray = [];
		//hardcode to ensure all the datapoint would be capture
		for (let i = 1; i < 32; i++) {
			let dailyOrders = allOrders.filter(
				(item) => parseInt(item.order_date.substring(8, 10)) === i
			);
			newDailyArray.push(dailyOrders.length);

			let newTotal = dailyOrders.reduce(
				(acc, cur) => acc + Number(cur.order_total),
				0
			);
			newDailyTotalArray.push(newTotal / 100);
		}
		setRevenueArray(newDailyTotalArray);
		setOrderArray(newDailyArray);
		setTotalRevenue(
			allOrders.reduce((acc, cur) => acc + Number(cur.order_total), 0) / 100
		);
		setTotalOrder(allOrders.length);
	}, [allOrders]);

	return (
		<>
			<Container textAlign='center' style={{ marginTop: '15px' }}>
				<HomePanel totalOrder={totalOrder} totalRevenue={totalRevenue} />
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column>
							<HomeRevenueChart
								dataArray={orderArray}
								title='Order Placed'
								month={month}
								year={year}
							/>
						</Grid.Column>
						<Grid.Column>
							<HomeRevenueChart
								dataArray={revenueArray}
								title='Ordered Product Sales'
								month={month}
								year={year}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</>
	);
};

export default AdminHome;
