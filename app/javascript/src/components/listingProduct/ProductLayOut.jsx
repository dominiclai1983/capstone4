import React, { useState } from 'react';
import {
	Grid,
	Image,
	Header,
	Divider,
	Button,
	Container,
	Popup,
} from 'semantic-ui-react';
import { CartState } from '@src/context';
import ProductIconGroup from '@components/listingProduct/ProductIconGroup';
import axios from 'axios';

const ProductLayOut = (props) => {
	let { title, price, description, product_id } = props;
	const { cart, setCart, currentCartID, setCurrentCartID, loginStatus } =
		CartState();
	const [disablePopup, setDisablePopup] = useState(true);
	console.log(`productID ${product_id}`);

	const getOrderNumber = async () => {
		try {
			const result = await axios.post(`/api/cart_details`);
			if (result.data) {
				setCurrentCartID(result.data.order_id);
				console.log(currentCartID);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getItemIntoLoginCart = async (currentCartID) => {
		/*
			if (!currentCartID) {
				getOrderNumber();
			}
		*/
		const prod = {
			cart_id: parseInt(currentCartID),
			product_id: product_id,
			price: parseFloat(price),
			quantity: 1,
		};

		try {
			const result = await axios.post(`/api/cart_details`, prod);
			if (result.data) {
				console.log(result.data.order_detail);
				setCart([...cart, result.data.order_detail]);
				//remember to remove result.data.order_detail with proper header
				console.log(cart);
				showAddItemPopUp();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getItemIntoNotLoginCart = async () => {
		const prod = {
			product_id: product_id,
			price: parseFloat(price),
			quantity: 1,
		};

		try {
			const result = await axios.post('/api/guest_cart_details', prod);
			if (result.data) {
				setCart([...cart, result.data.guest_cart_detail]);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width={9}>
					<Image src='https://via.placeholder.com/860x700.png' />
				</Grid.Column>
				<Grid.Column width={6} style={{ marginTop: 40 }}>
					<Header as='h3'>{title}</Header>
					<Header as='h4'>{price}</Header>
					<Divider style={{ marginBottom: 20 }} />
					<Button
						fluid
						primary
						onClick={() => {
							loginStatus
								? getItemIntoLoginCart(currentCartID)
								: getItemIntoNotLoginCart();
						}}
					>
						Add To Cart
					</Button>
					<Button fluid style={{ marginTop: 10, marginButton: 20 }}>
						Buy it now
					</Button>
					<Divider />
					<ProductIconGroup />
					<Divider />
					<Container>
						<p>{description}</p>
					</Container>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default ProductLayOut;
