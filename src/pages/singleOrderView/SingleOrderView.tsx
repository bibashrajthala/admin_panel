import React, { useEffect } from "react";
import LayoutApp from "../../components/layoutApp/LayoutApp";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../store/orders/orders.selector";
import { getOrderByIdAsync } from "../../store/orders/orders.action";
import { useParams } from "react-router-dom";

type Props = {};

const SingleOrderView = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);

  //   console.log(id);
  //   console.log(order);

  useEffect(() => {
    dispatch<any>(getOrderByIdAsync(id));
  }, []);

  return order && <LayoutApp page="SINGLE_ORDER_VIEW_PAGE" />;
};

export default SingleOrderView;
