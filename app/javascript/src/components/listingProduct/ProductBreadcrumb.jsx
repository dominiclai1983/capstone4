import React from 'react';
import _ from 'lodash';
import { Breadcrumb } from 'semantic-ui-react';
import { Link, useOutletContext } from 'react-router-dom';

const ProductBreadcrumb = (props) => {
	let { desc, title } = props;
	const [activeItem, setActiveItem] = useOutletContext();

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<>
			<Breadcrumb style={{ marginLeft: 80 }}>
				<Breadcrumb.Section
					as={Link}
					to='/'
					name='home'
					onClick={handleItemClick}
				>
					Home
				</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' color='orange' />
				<Breadcrumb.Section
					as={Link}
					to={'/' + desc}
					name={desc}
					onClick={handleItemClick}
				>
					{_.startCase(desc)}
				</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right chevron' color='orange' />
				<Breadcrumb.Section>{title}</Breadcrumb.Section>
			</Breadcrumb>
		</>
	);
};

export default ProductBreadcrumb;
