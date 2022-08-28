import React, { useEffect } from "react";
import LayoutApp from "../../components/layoutApp/LayoutApp";

import { useDispatch } from "react-redux";
import { getProductsAsync } from "../../store/product/product.action";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      dispatch(getProductsAsync());
    };
    getProducts();
  }, []);
  return <LayoutApp page="products" />;
};

export default Products;
