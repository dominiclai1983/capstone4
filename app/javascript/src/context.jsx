import React, { createContext, useContext, useState } from "react";

const Cart = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [currentCartID, setCurrentCartID] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <Cart.Provider
      value={{
        cart,
        setCart,
        shippingAddress,
        setShippingAddress,
        billingAddress,
        setBillingAddress,
        currentCartID,
        setCurrentCartID,
        loginStatus,
        setLoginStatus,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
