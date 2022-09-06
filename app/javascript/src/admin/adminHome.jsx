import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminHome = () => {
	return (
		<>
			<div>AdminHome</div>
			<Outlet />
		</>
	);
};

export default AdminHome;
