import React from 'react';
import {
	Grid,
	Image,
	Header,
	Divider,
	Button,
	Container,
} from 'semantic-ui-react';
import { CartState } from '@src/context';
import ProductIconGroup from '@components/listingProduct/ProductIconGroup';
import axios from 'axios';

const src = 'https://via.placeholder.com/860x700.png';

const ProductLayOut = (props) => {
	let { title, price, description, product_id, large_image } = props;
	const { cart, setCart, currentCartID, setCurrentCartID, loginStatus } =
		CartState();

	const getCartNumber = async () => {
		try {
			const result = await axios.post(`/api/carts`);
			if (result.data) {
				setCurrentCartID(result.data.cart_id);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getItemIntoLoginCart = async (currentCartID) => {
		if (!currentCartID) {
			getCartNumber();
		}

		const prod = {
			cart_id: parseInt(currentCartID),
			product_id: product_id,
			price: parseFloat(price),
			quantity: 1,
		};

		try {
			const result = await axios.post(`/api/cart_details`, prod);
			if (result.data) {
				setCart([...cart, result.data.cart_detail]);
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
					<Image src={large_image ? large_image : src} />
				</Grid.Column>
				<Grid.Column width={6} style={{ marginTop: 40 }}>
					<Header as='h2'>{title}</Header>
					<Header as='h3'>HK$ {price}</Header>
					<Divider style={{ marginBottom: 20 }} />
					<Button
						fluid
						color='yellow'
						onClick={() => {
							loginStatus
								? getItemIntoLoginCart(currentCartID)
								: getItemIntoNotLoginCart();
						}}
					>
						Add To Cart
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
