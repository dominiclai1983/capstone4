import React from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';

const AdminProduct = () => {
	const { pathname } = useLocation();
	const [activeItem, setActiveItem] = useOutletContext();
	return <div>AdminProduct</div>;
};

export default AdminProduct;
