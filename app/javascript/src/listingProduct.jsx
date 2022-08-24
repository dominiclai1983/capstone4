import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductBreadcrumb from '@components/listingProduct/ProductBreadcrumb';
import ProductLayOut from '@components/listingProduct/ProductLayOut';

const ListingProduct = () => {
	let { sku } = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/api/products/${sku}`);
				//getting details of specific product
				if (result.data) {
					setProduct(result.data.product);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	/*
	note: pass down the whole obj by using spreading
	*/

	return (
		<>
			<ProductBreadcrumb desc={product.desc} title={product.title} />
			<Container style={{ marginTop: 20 }}>
				<ProductLayOut {...product} />
			</Container>
		</>
	);
};

export default ListingProduct;
