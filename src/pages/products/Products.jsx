import React, { useEffect } from "react";
import LayoutApp from "../../components/layoutApp/LayoutApp";

import { useDispatch } from "react-redux";
import { getProductsAsync } from "../../store/product/product.action";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = () => {
      dispatch(getProductsAsync(25, 1));
    };
    getProducts();
  }, [dispatch]);
  return <LayoutApp page="PRODUCTS_PAGE" />;
};

export default Products;
