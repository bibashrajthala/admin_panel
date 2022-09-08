import React, { useEffect } from "react";
import LayoutApp from "../../components/layoutApp/LayoutApp";
import { useDispatch, useSelector } from "react-redux";
import { getInvoicesListAsync } from "../../store/orders/orders.action";
import { selectInvoices } from "../../store/orders/orders.selector";

type Props = {};

const SalesInvoicePage = (props: Props) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectInvoices);
  useEffect(() => {
    dispatch<any>(getInvoicesListAsync(25, 1));
  }, []);
  return orders && <LayoutApp page="SALES_INVOICE_PAGE" />;
};

export default SalesInvoicePage;
