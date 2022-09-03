import React from 'react';
import { Icon, List, Container } from 'semantic-ui-react';

const ProductIconGroup = () => {
	return (
		<>
			<Container textAlign='center'>
				<List horizontal>
					<List.Item>
						<Icon name='shipping fast' color='teal' /> Fast Delivery
					</List.Item>
					<List.Item>
						<Icon name='redo alternate' color='teal' /> Free Return
					</List.Item>
					<List.Item>
						<Icon name='gift' color='teal' />
						Decent Packaging
					</List.Item>
				</List>
			</Container>
		</>
	);
};

export default ProductIconGroup;
