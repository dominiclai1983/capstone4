import React, { useState } from 'react';
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

import '@src/css/utils.scss';

const Product = () => {
	const { pathname } = useLocation();
	const [activeItem, setActiveItem] = useOutletContext();
	const [sortingType, setSortingType] = useState('default');

	//refer layout.jsx for useOutletContext() hook
	const handleItemClick = (e, { name }) => setActiveItem(name);

	const handleDropDownClick = (e, { name }) => setSortingType(name);

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
				{/* TODO: writing the method to change the sorting mode*/}
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
			<ItemDisplay sortingType={sortingType} />
		</>
	);
};

export default Product;
