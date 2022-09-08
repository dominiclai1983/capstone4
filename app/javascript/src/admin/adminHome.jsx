import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Header,
	Dropdown,
	Menu,
	Button,
} from 'semantic-ui-react';
import HomePanel from '@components/admin/HomePanel';
import HomeRevenueChart from '@components/admin/HomeRevenueChart';
import _ from 'lodash';
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

	const handleTimeDropdownChange = async (m, y) => {
		console.log(m);
		console.log(y);
		try {
			const result = await axios.get(`/api/orders?month=${month}&year=${year}`);
			setAllOrders(result.data.orders);
		} catch (err) {
			console.error(err);
		}
	};

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
	}, []);

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

	const yearDropDownOption = _.times(2, (i) => ({
		key: i,
		value: year + i,
		text: (year + i).toString(),
	}));

	const monthDropDownOption = _.times(12, (i) => ({
		key: i,
		value: i + 1,
		text: (i + 1).toString(),
	}));

	console.log(allOrders);

	return (
		<>
			<Container textAlign='center' style={{ marginTop: '15px' }}>
				<Header as='h2' textAlign='left'>
					Dashboard
				</Header>
				<Container textAlign='right'>
					<Menu compact>
						<Dropdown
							text={year}
							value={year}
							options={yearDropDownOption}
							simple
							item
							onChange={(_, data) => {
								setYear(data.value);
							}}
						/>

						<Dropdown
							text={month}
							value={month}
							options={monthDropDownOption}
							simple
							item
							onChange={(_, data) => {
								console.log(data.value);
								setMonth(data.value);
								console.log(month);
							}}
						/>
					</Menu>{' '}
					<Button color='yellow' size='medium'>
						Apply
					</Button>
				</Container>

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
