import React from 'react';
import { Table, Image } from 'semantic-ui-react';

const src = 'https://react.semantic-ui.com/images/avatar/small/matt.jpg';

const OrderTable = (props) => {
	let { orders } = props;

	const items = orders.map((order, index) => {
		const itemValues = Object.values(order.order_details);
		const itemRows = itemValues.map((item, i) => {
			const itemDate =
				i === 0 ? (
					<Table.Cell rowSpan={itemValues.length + 1}>
						{order.order_date}
					</Table.Cell>
				) : null;
			const itemDetails =
				i === 0 ? (
					<Table.Cell rowSpan={itemValues.length + 1}>{order.id}</Table.Cell>
				) : null;
			const customerOptions =
				i === 0 ? (
					<Table.Cell rowSpan={itemValues.length + 1}>
						{order.shipping_fee}
					</Table.Cell>
				) : null;
			const orderStatus =
				i === 0 ? (
					<Table.Cell rowSpan={itemValues.length + 1}>
						{order.status ? 'Active' : 'Cancelled'}
					</Table.Cell>
				) : null;
			const price =
				i === 0 ? (
					<Table.Cell rowSpan={itemValues.length + 1}>
						{order.order_total / 100}
					</Table.Cell>
				) : null;
			return (
				<Table.Row key={i}>
					{itemDate}
					{itemDetails}

					<Table.Cell>
						<Image src={item.thumb ? item.thumb : src} />
					</Table.Cell>
					<Table.Cell>{item.title}</Table.Cell>
					{customerOptions}
					{orderStatus}
					{price}
				</Table.Row>
			);
		});
		return <Table.Body key={index}>{itemRows}</Table.Body>;
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
			{items}
		</Table>
	);
};

export default OrderTable;
