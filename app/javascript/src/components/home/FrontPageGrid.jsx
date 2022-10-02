import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

const imageOne = 'https://i.imgur.com/m0EKScR.jpg';
const imageTwo = 'https://i.imgur.com/AA4ADNu.jpg';

const FrontPageGrid = () => {
	return (
		<Grid columns={3} divided>
			<Grid.Row style={{ marginTop: '16px' }}>
				<Grid.Column>
					<Image src={imageOne} />
				</Grid.Column>
				<Grid.Column>
					<Image src={imageOne} />
				</Grid.Column>
				<Grid.Column>
					<Image src={imageOne} />
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Grid.Column>
					<Image src={imageTwo} />
				</Grid.Column>
				<Grid.Column>
					<Image src={imageTwo} />
				</Grid.Column>
				<Grid.Column>
					<Image src={imageTwo} />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default FrontPageGrid;
