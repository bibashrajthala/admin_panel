import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LayoutApp from "../../components/layoutApp/LayoutApp";
import {
  getProductByIdAsync,
  getProductEditHistoryAsync,
} from "../../store/product/product.action";
import { selectProductById } from "../../store/product/product.selector";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(selectProductById);

  useEffect(() => {
    console.log("edit page useEffect");
    dispatch<any>(getProductByIdAsync(id));
    dispatch<any>(getProductEditHistoryAsync(id));
  }, [id]);

  console.log("edit product page");
  return product && <LayoutApp page="EDIT_PRODUCT_PAGE" />;
  // return <h1>edit page</h1>;
};

export default EditProductPage;
