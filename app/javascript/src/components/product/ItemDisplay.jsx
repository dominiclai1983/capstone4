//here is partly of the component for displaying product, the layout of the listing product
import React, { useState, useEffect } from 'react';
import { Card, Image, Container } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

const src = 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg';

const ItemDisplay = (props) => {
	const { products, sortingType } = props;

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
				<Image src={src} as={Link} to={'/product/' + product.sku} />
				<Card.Content>
					<Card.Header>{product.title}</Card.Header>
					<Card.Description textAlign='right'>
						${product.price}
					</Card.Description>
				</Card.Content>
			</Card>
		);
	});

	return (
		<Container style={{ marginTop: 20 }}>
			<Card.Group itemsPerRow={3}>{items}</Card.Group>
		</Container>
	);
};

export default ItemDisplay;
