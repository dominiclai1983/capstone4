import React, { useState } from 'react';
import { Grid, Form, Button, Header, Radio } from 'semantic-ui-react';

const NewAddress = () => {
	const [hasBilling, setHasBilling] = useState(false);

	return (
		<Grid columns={2} divided>
			<Grid.Row>
				<Grid.Column>
					<Header as='h2'>Add a new address</Header>
					<Form>
						<Form.Group widths='equal'>
							<Form.Input
								fluid
								label='First Name'
								placeholder='First Name'
								type='text'
							/>
							<Form.Input
								fluid
								label='Last Name'
								placeholder='Last Name'
								type='text'
							/>
						</Form.Group>
						<Form.Input
							label='Address'
							placeholder='Street Address'
							type='text'
						/>
						<Form.Input
							label=''
							placeholder='Apt, Suite, Unit, Building, Floor'
							type='text'
						/>
						<Form.Group widths='equal'>
							<Form.Input
								fluid
								label='District'
								placeholder='First Name'
								type='text'
							/>
							<Form.Input
								label='Phone Number'
								placeholder='9999 0000'
								type='text'
							/>
						</Form.Group>
						<Form.Checkbox inline label='I agree to the terms and conditions' />
						<Form.Field>Selected value</Form.Field>
						<Form.Field>
							<Radio label='Hong Kong' name='radioGroup' value='HK' />{' '}
							<Radio label='Kowloon' name='radioGroup' value='KL' />{' '}
							<Radio label='N.T.' name='radioGroup' value='NT' />
						</Form.Field>
						<Button color='blue'>Submit</Button>
					</Form>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column></Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default NewAddress;
