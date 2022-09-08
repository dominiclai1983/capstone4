import React from 'react';
import ReactDOM from 'react-dom';
import AdminLogin from './adminLogin';
import AdminLayout from './adminLayout';
import AdminHome from './adminHome';
import AdminCustomer from './adminCustomer';
import AdminCustomerProf from './adminCustomerProf';
import AdminOrder from './adminOrder';
import AdminProduct from './adminProduct';
import AdminPayment from './adminPayment';
import AdminAddProduct from './adminAddProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AdminIndex = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='admin' element={<AdminLogin />} />
					<Route path='admin/home' element={<AdminLayout />}>
						<Route index element={<AdminHome />} />
						<Route path='customer' element={<AdminCustomer />}>
							<Route path=':username' element={<AdminCustomerProf />} />
						</Route>
						<Route path='order' element={<AdminOrder />} />
						<Route path='product' element={<AdminProduct />} />
						<Route path='payment' element={<AdminPayment />} />
					</Route>
					<Route path='admin/addproduct' element={<AdminAddProduct />} />
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
