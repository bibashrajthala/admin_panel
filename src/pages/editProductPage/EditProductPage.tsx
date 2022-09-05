import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LayoutApp from "../../components/layoutApp/LayoutApp";
import {
  getProductByIdAsync,
  getProductEditHistoryAsync,
} from "../../store/product/product.action";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    console.log("edit page useEffect");
    dispatch<any>(getProductByIdAsync(id));
    dispatch<any>(getProductEditHistoryAsync(id));
  }, [id]);

  console.log("edit product page");
  return <LayoutApp page="EDIT_PRODUCT_PAGE" />;
};

export default EditProductPage;
