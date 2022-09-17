//here is partly of the component for displaying product, the layout of the listing product
import React from 'react';
import { Card, Image, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const src = 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg';

const ItemDisplay = (props) => {
	const { products, sortingType, handleLoadMore, nextPage, loading } = props;

	const sortingProducts = () => {
		let sortedProducts = products;

		if (sortingType === 'asce') {
			sortedProducts = sortedProducts.sort((a, b) => {
				return a.price - b.price;
			});
		}
		if (sortingType === 'desc') {
			sortedProducts = sortedProducts.sort((a, b) => {
				return b.price - a.price;
			});
		}
		return sortedProducts;
	};

	const items = sortingProducts().map((product, index) => {
		return (
			<Card key={index}>
				<Image
					src={product.grid_image ? product.grid_image : src}
					as={Link}
					to={'/product/' + product.sku}
				/>
				<Card.Content>
					<Card.Header textAlign='left'>{product.title}</Card.Header>
					<Card.Description textAlign='right'>
						${product.price}
					</Card.Description>
				</Card.Content>
			</Card>
		);
	});

	return (
		<Container style={{ marginTop: 20 }} textAlign='center'>
			<Card.Group itemsPerRow={3}>{items}</Card.Group>
			{nextPage && (
				<Button
					loading={loading}
					size='tiny'
					color='yellow'
					onClick={handleLoadMore}
				>
					Click For More
				</Button>
			)}
		</Container>
	);
};

export default ItemDisplay;
