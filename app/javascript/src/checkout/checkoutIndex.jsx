import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutAddress from './checkoutAddress';
import CheckoutConfirm from './checkoutConfirm';
import CheckoutContext from './checkoutContext';
import CheckoutFinal from './checkoutFinal';
import CheckoutLayout from './checkoutLayout';
import CheckoutSuccess from './checkoutSuccess';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const CheckoutIndex = () => {
	return (
		<>
			<CheckoutContext>
				<BrowserRouter>
					<Routes>
						<Route path='checkout' element={<CheckoutLayout />}>
							<Route index element={<CheckoutAddress />} />
							<Route path='final' element={<CheckoutFinal />} />
							<Route path='payment' element={<CheckoutConfirm />} />
							<Route path='success' element={<CheckoutSuccess />} />
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
