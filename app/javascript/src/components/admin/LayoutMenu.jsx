import React from 'react';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LayoutMenu = (props) => {
	const navigate = useNavigate();
	let { username } = props;
	const handleLogOut = async () => {
		try {
			const result = await axios.delete('/api/admins');
			if (result.data) {
				navigate('/admin');
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<Container textAlign='center'>
				<Menu text>
					<Menu.Menu position='right'>
						<Dropdown item text={`Hello! ${username}`}>
							<Dropdown.Menu>
								<Dropdown.Item>Setting</Dropdown.Item>
								<Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Menu>
				</Menu>
			</Container>
		</>
	);
};

export default LayoutMenu;
