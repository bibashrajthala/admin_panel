import React, { useEffect } from "react";
import LayoutApp from "../../components/layoutApp/LayoutApp";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsListAsync } from "../../store/product/product.action";
import { selectAllProductsList } from "../../store/product/product.selector";

const EditOrderPage = () => {
  const dispatch = useDispatch();
  const productsList = useSelector(selectAllProductsList);

  useEffect(() => {
    dispatch<any>(getAllProductsListAsync());
  }, []);

  return productsList && <LayoutApp page={"EDIT_ORDER_PAGE"} />;
};

export default EditOrderPage;
