import React, { useState, useEffect } from 'react';
import {
	Container,
	Grid,
	Header,
	Dropdown,
	Menu,
	Button,
	Divider,
} from 'semantic-ui-react';
import HomePanel from '@components/admin/HomePanel';
import HomeRevenueChart from '@components/admin/HomeRevenueChart';
import _ from 'lodash';
import axios from 'axios';

const AdminHome = () => {
	const [totalOrder, setTotalOrder] = useState(null);
	const [totalRevenue, setTotalRevenue] = useState(null);
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	// Jan returns 0
	const [year, setYear] = useState(new Date().getFullYear());
	const [revenueArray, setRevenueArray] = useState([]);
	const [orderArray, setOrderArray] = useState([]);

	const handleGraphChange = async () => {
		let newDailyArray = [];
		let newDailyTotalArray = [];
		await axios
			.get(`/api/orders?month=${month}&year=${year}`)
			.then((result) => {
				if (result.data.orders) {
					for (let i = 1; i <= result.data.orders.length; i++) {
						let dailyOrders = result.data.orders.filter(
							(item) => parseInt(item.order_date.substring(8, 10)) === i
						);
						newDailyArray.push(dailyOrders.length);

						let newTotal = dailyOrders.reduce(
							(acc, cur) => acc + Number(cur.order_total),
							0
						);
						newDailyTotalArray.push(newTotal / 100);
					}
				}
				setRevenueArray(newDailyTotalArray);
				setOrderArray(newDailyArray);
				setTotalRevenue(
					result.data.orders.reduce(
						(acc, cur) => acc + Number(cur.order_total),
						0
					) / 100
				);
				setTotalOrder(result.data.orders.length);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			handleGraphChange();
		};
		fetchData();
	}, []);

	const yearDropDownOption = _.times(2, (i) => ({
		key: i,
		value: year + i,
		text: (year + i).toString(),
	}));

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const monthDropDownOption = _.times(12, (i) => ({
		key: i,
		value: i + 1,
		text: monthNames[i],
	}));

	return (
		<>
			{/*
			<Container
				textAlign='center'
				style={{ marginTop: '15px', width: '1000px' }}
			>
				*/}
			<Header as='h2' textAlign='left'>
				Dashboard
			</Header>
			<Container textAlign='right'>
				<Menu compact>
					<Dropdown
						text={year.toString()}
						value={year}
						options={yearDropDownOption}
						simple
						item
						onChange={(_, data) => {
							setYear(data.value);
						}}
					/>
					<Dropdown
						text={monthNames[month - 1].toString()}
						value={month}
						options={monthDropDownOption}
						simple
						item
						onChange={(_, data) => {
							setMonth(data.value);
						}}
					/>
				</Menu>{' '}
				<Button color='yellow' size='medium' onClick={handleGraphChange}>
					Apply
				</Button>
				<Divider />
				{/* </Container> */}
				{/* <Container textAlign='center' style={{ marginTop: '15px' }}>*/}
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
			{/* </Container> */}
		</>
	);
};

export default AdminHome;
