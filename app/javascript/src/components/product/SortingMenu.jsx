//this one is just the dropdown menu component
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import sortingArray from '@components/supportinglist';

const SortingMenu = (props) => {
	return (
		<Dropdown text='Sort'>
			<Dropdown.Menu>
				<Dropdown.Item text='Best Selling' />
				<Dropdown.Item text='Price, low to high' />
				<Dropdown.Item text='Price, high to low' />
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default SortingMenu;
