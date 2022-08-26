import React, { useState } from "react";
import BillingAddress from "@components/checkout/BillingAddress";
import ShippingAddress from "@components/checkout/ShippingAddress";

const Address = () => {
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  return (
    <>
      <BillingAddress
        checkBoxValue={checkBoxValue}
        setCheckBoxValue={setCheckBoxValue}
      />
      if(checkBoxValue){<ShippingAddress />}
    </>
  );
};

export default Address;
