export const selectExpenses = (state) => state.expense.expenses;

export const selectExpenseUsers = (state) => state.expense?.expenseUsers;

export const selectExpenseTypes = (state) => state.expense?.expenseTypes;

export const selectExpenseChangeStatus = (state) => state.expense?.changeStatus;

export const selectSingleExpense = (state) => state.expense?.expense;
