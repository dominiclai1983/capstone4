import React from "react";
import { useParams } from "react-router-dom";

const CheckoutSuccess = () => {
  let params = useParams();
  console.log(params);
  return <div>CheckoutSuccess {params.id}</div>;
};

export default CheckoutSuccess;
