import React, { useRef } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';

const AddPicturePanel = (props) => {
	const src = 'https://picsum.photos/id/237/750/562';

	const fileInputRef = useRef();

	const { previewImageOne, handleChange } = props;
	return (
		<Grid columns={3} textAlign='center' divided>
			<Grid.Row>
				<Grid.Column>
					<Image
						src={previewImageOne ? previewImageOne : src}
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
			</Grid.Row>
		</Grid>
	);
};

export default AddPicturePanel;
