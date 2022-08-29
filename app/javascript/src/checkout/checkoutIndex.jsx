import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutLayout from './checkoutLayout';
import CheckoutAddress from './checkoutAddress';
import CheckoutConfirm from './checkoutConfirm';
import CheckoutSuccess from './checkoutSuccess';
import CheckoutContext from './checkoutContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const CheckoutIndex = () => {
	return (
		<>
			<CheckoutContext>
				<BrowserRouter>
					<Routes>
						<Route path='checkout' element={<CheckoutLayout />}>
							<Route index element={<CheckoutAddress />} />
							{/* <Route path="confirm" element={<CheckoutConfirm />} /> */}
							<Route path=':id/success' element={<CheckoutSuccess />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</CheckoutContext>
		</>
	);
};
//TODO:write the layout of the checkout page
export default CheckoutIndex;

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<CheckoutIndex />,
		document.body.appendChild(document.createElement('div'))
	);
});
