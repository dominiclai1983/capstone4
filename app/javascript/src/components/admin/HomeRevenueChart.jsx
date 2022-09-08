import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip
);

export const HomeRevenueChart = (props) => {
	let { dataArray, title, month, year } = props;

	let length = new Date(year, month, 0).getDate();
	//return the numbers of days for specific month in specific year

	let labels = [];
	for (let i = 1; i <= length; i++) {
		labels.push(i);
	}

	const orderChart = title === 'Order Placed' ? true : false;

	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: title,
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: dataArray,
				borderColor: orderChart ? 'rgb(255, 99, 132)' : 'rgb(53, 162, 235)',
				backgroundColor: orderChart
					? 'rgba(255, 99, 132, 0.5)'
					: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};
	return <Line options={options} data={data} />;
};

export default HomeRevenueChart;
