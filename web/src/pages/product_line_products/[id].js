import React from "react";
import { useParams } from "react-router-dom";

const ProductLineProducts = () => {
  const { id } = useParams();
  return <div>ProductLineProducts {id}</div>;
};

export default ProductLineProducts;
