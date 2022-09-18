import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
	Grid,
	Container,
	Header,
	Breadcrumb,
	Dropdown,
} from 'semantic-ui-react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import ItemDisplay from '@components/product/ItemDisplay';
import axios from 'axios';

import '@src/css/utils.scss';

const Product = () => {
	const [activeItem, setActiveItem] = useOutletContext();
	const { pathname } = useLocation();

	const [sortingType, setSortingType] = useState('default');
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/api/products${pathname}/cat?page=1`);
				//cat is needed. pls refer to route
				setProducts(result.data.products);
				setTotalPages(result.data.total_pages);
				setNextPage(result.data.next_page);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [pathname]);

	console.log(products);

	//refer layout.jsx for useOutletContext() hook
	const handleItemClick = (e, { name }) => setActiveItem(name);

	const handleDropDownClick = (e, { name }) => setSortingType(name);

	const handleLoadMore = async () => {
		if (!nextPage) {
			return;
		}
		setLoading(true);
		try {
			const result = await axios.get(
				`/api/products${pathname}/cat?page=${nextPage}`
			);
			setProducts([...products, result.data.products]);
			setTotalPages(result.data.total_pages);
			setNextPage(result.data.next_page);
			setLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Container style={{ marginTop: 20 }}>
				<Breadcrumb>
					<Breadcrumb.Section
						as={Link}
						to='/'
						name='home'
						onClick={handleItemClick}
					>
						Home
					</Breadcrumb.Section>
					<Breadcrumb.Divider icon='right chevron' color='orange' />
					<Breadcrumb.Section active>
						{_.startCase(pathname)}
					</Breadcrumb.Section>
				</Breadcrumb>
			</Container>
			<Container style={{ marginTop: 20 }}>
				<Grid>
					<Grid.Row columns={1}>
						<Grid.Column>
							<Container text textAlign='center'>
								<Header as='h2'>{_.startCase(pathname)}</Header>
								<p>The following is our {pathname.substring(1)} section.</p>
							</Container>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Grid>
					<Grid.Row columns={1}>
						<Grid.Column textAlign='right'>
							<Dropdown text='Sort'>
								<Dropdown.Menu>
									<Dropdown.Item
										text='Best Selling'
										name='default'
										onClick={handleDropDownClick}
									/>
									<Dropdown.Item
										text='Price, low to high'
										name='asce'
										onClick={handleDropDownClick}
									/>
									<Dropdown.Item
										text='Price, high to low'
										name='desc'
										onClick={handleDropDownClick}
									/>
								</Dropdown.Menu>
							</Dropdown>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
			<ItemDisplay
				products={products}
				sortingType={sortingType}
				handleLoadMore={handleLoadMore}
				nextPage={nextPage}
				loading={loading}
			/>
		</>
	);
};

export default Product;
