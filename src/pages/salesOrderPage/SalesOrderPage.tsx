import React, { useEffect } from "react";
import LayoutApp from "../../components/layoutApp/LayoutApp";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersListAsync } from "../../store/orders/orders.action";
import { selectOrders } from "../../store/orders/orders.selector";

type Props = {};

const SalesOrderPage = (props: Props) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch<any>(getOrdersListAsync(25, 1));
  }, []);

  return orders && <LayoutApp page="SALES_ORDER_PAGE" />;
};

export default SalesOrderPage;
