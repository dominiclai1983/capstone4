import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Layout from './layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Index = () => (
	<>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					{/* <Route path='login' element={<Login />} />
					<Route path='signup' element={<Signup />} />
					<Route path='bracelet' element={<Product />} />
					<Route path='earrings' element={<Product />} />
					<Route path='product/:sku' element={<ListingProduct />} />
					<Route path='cart' element={<Cart />} />
					<Route path='account' element={<AccountLayout />}>
						<Route index element={<AccountHome />} />
					</Route>
					*/}
				</Route>
			</Routes>
		</BrowserRouter>
	</>
);

console.log('i have no idea why it does not work');

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Index />,
		document.body.appendChild(document.createElement('div'))
	);
});
