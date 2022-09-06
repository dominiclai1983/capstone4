import React from 'react';
import ReactDOM from 'react-dom';
import AdminLogin from './adminLogin';
import AdminLayout from './adminLayout';
import AdminHome from './adminHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AdminIndex = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='admin' element={<AdminLogin />}>
						<Route path='home' element={<AdminLayout />}>
							<Route index element={<AdminHome />} />
						</Route>
					</Route>
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
