import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutApp from "../../components/layoutApp/LayoutApp";
import {
  getExpensesAsync,
  getExpenseTypesAsync,
  getExpenseUsersAsync,
} from "../../store/expenses/expenses.action";
import {
  selectExpenses,
  selectExpenseTypes,
  selectExpenseUsers,
} from "../../store/expenses/expenses.selector";

const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectExpenses);
  const expenseTypes = useSelector(selectExpenseTypes);
  const expenseUsers = useSelector(selectExpenseUsers);

  useEffect(() => {
    dispatch<any>(getExpensesAsync(25, 1));
    dispatch<any>(getExpenseUsersAsync());
    dispatch<any>(getExpenseTypesAsync());
  }, []);

  return (
    expenses &&
    expenseTypes &&
    expenseUsers && <LayoutApp page="EXPENSES_PAGE" />
  );
};

export default Expenses;
