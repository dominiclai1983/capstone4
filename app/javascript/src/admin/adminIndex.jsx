import React from 'react';
import ReactDOM from 'react-dom';
import AdminLogin from './adminLogin';
import AdminLayout from './adminLayout';
import AdminHome from './adminHome';
import AdminCustomer from './adminCustomer';
import AdminProduct from './adminProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AdminIndex = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='admin' element={<AdminLogin />} />
					<Route path='admin/home' element={<AdminLayout />}>
						<Route index element={<AdminHome />} />
						<Route path='customer' element={<AdminCustomer />} />
					</Route>
					<Route path='admin/product' element={<AdminProduct />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default AdminIndex;

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<AdminIndex />,
		document.body.appendChild(document.createElement('div'))
	);
});
