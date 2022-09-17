import React from 'react';
import { Table, Image, Button, Dropdown, Input } from 'semantic-ui-react';

const src = 'https://react.semantic-ui.com/images/avatar/small/matt.jpg';

const OrderTable = (props) => {
	let { orders } = props;

	const items = orders.map((order, index) => {
		return (
			<>
				{order.order_details.map((orderDetail) => {
					return (
						<Table.Row>
							<Table.HeaderCell>Order Date</Table.HeaderCell>
							<Table.HeaderCell>Order Details</Table.HeaderCell>
							<Table.HeaderCell>Image</Table.HeaderCell>
							<Table.HeaderCell>Product Name</Table.HeaderCell>
							<Table.HeaderCell>Customer Option</Table.HeaderCell>
							<Table.HeaderCell>Order Status</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
						</Table.Row>
					);
				})}
			</>
		);
	});
	return (
		<Table singleLine>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Order Date</Table.HeaderCell>
					<Table.HeaderCell>Order Details</Table.HeaderCell>
					<Table.HeaderCell>Image</Table.HeaderCell>
					<Table.HeaderCell>Product Name</Table.HeaderCell>
					<Table.HeaderCell>Customer Option</Table.HeaderCell>
					<Table.HeaderCell>Order Status</Table.HeaderCell>
					<Table.HeaderCell>Price</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>{items}</Table.Body>
		</Table>
	);
};

export default OrderTable;
