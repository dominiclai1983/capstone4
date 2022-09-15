import React, { useRef } from 'react';
import { Grid, Form, Image, Button } from 'semantic-ui-react';

const AddPicturePanel = (props) => {
	const placeholder = 'https://picsum.photos/id/237/750/562';

	const fileInputRef = useRef();

	const { previewImageOne, handleChange } = props;
	return (
		<Grid columns={3} textAlign='center' divided>
			<Grid.Row>
				<Grid.Column>
					{/*
					<Form>
						<Image
							src={previewImageOne ? previewImageOne : placeholder}
							size='small'
							centered
						/>
						<Form.Field
							label='Add Image 1'
							control='button'
							accept='image/*'
							onChange={() => handleChange}
						>
							Add An Image
						</Form.Field>
					</Form>
					*/}
					<Image
						src={previewImageOne ? previewImageOne : placeholder}
						size='small'
						centered
						style={{ marginBottom: '2px' }}
					/>
					<Button
						content='Choose File'
						labelPosition='left'
						icon='file'
						size='mini'
						onClick={() => fileInputRef.current.click()}
					/>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						hidden
						onChange={handleChange}
					/>
				</Grid.Column>
				{/*
				<Grid.Column>
					<Form>
						<Image
							src={previewImageOne ? previewImageOne : placeholder}
							size='small'
							centered
						/>
						<Form.Field
							label='Add Image 2'
							control='button'
							accept='image/*'
							onChange={handleChange}
						>
							Add An Image
						</Form.Field>
					</Form>
				</Grid.Column>
				*/}
				{/*
				<Grid.Column>
					<Form>
						<Image
							src={previewImageOne ? previewImageOne : placeholder}
							size='small'
							centered
						/>
						<Form.Field
							label='Add Image 3'
							control='button'
							accept='image/*'
							onChange={handleChange}
						>
							Add An Image
						</Form.Field>
					</Form>
				</Grid.Column>
				*/}
			</Grid.Row>
		</Grid>
	);
};

export default AddPicturePanel;
