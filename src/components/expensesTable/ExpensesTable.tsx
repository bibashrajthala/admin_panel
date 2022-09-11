import React, { useState } from "react";
import {
  Table,
  Pagination,
  Button,
  Tag,
  Drawer,
  Input,
  Form,
  Select,
  Divider,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  addNewExpenseAsync,
  approveExpenseAsync,
  cancelExpenseAsync,
  getExpensesAsync,
  reimburseExpenseAsync,
  viewExpenseAsync,
} from "../../store/expenses/expenses.action";
import {
  selectExpenses,
  selectExpenseTypes,
  selectExpenseUsers,
  selectSingleExpense,
} from "../../store/expenses/expenses.selector";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ExpensesTable = () => {
  const dispatch = useDispatch();
  const expensesStatus = useSelector(selectExpenses);
  const expenseTypes = useSelector(selectExpenseTypes);
  const expenseUsers = useSelector(selectExpenseUsers);
  const singleExpense = useSelector(selectSingleExpense);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(25);
  const [open, setOpen] = useState(false); // for add expense drawer
  const [open2, setOpen2] = useState(false); // for view expense drawer
  const [isModalOpen, setIsModalOpen] = useState(false); // for modal to cancel expense
  const [expenseId, setExpenseId] = useState("");

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Select;
  const { confirm } = Modal;

  //   console.log(expensesStatus);
  // console.log(expenseUsers);
  // console.log(expenseTypes);
  console.log(singleExpense); // it will only get data when a expense is clicked, as its request only dispatch when a expense is clicked

  const {
    // total: totalExpenses,
    total_records: totalNumberOfExpenses,
    data: expenses,
  } = expensesStatus;

  const data = expenses?.map((expense: any) => {
    const {
      _id,
      expense_number,
      status,
      remarks,
      createdAt,
      amount,
      expense_type,
      expense_of: { first_name: firstName, last_name: lastName },
      recorded_by: { first_name, last_name },
    } = expense;
    return {
      key: _id,
      expensesNumber: { expense_number, status },
      remarks: remarks,
      date: moment(createdAt).format("LL"),
      amount: `NPR ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      expenseType: expense_type,
      expenseOf: `${firstName} ${lastName}`,
      recordedBy: `${first_name} ${last_name}`,
    };
  });

  // const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  const onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize);
    setCurrentPage(current);
    setNumberOfItems(pageSize);
  };

  // called when page or pageSize(np. of items per page) is changed
  // const handlePaginationChange = (page: number, pageSize: number) => {
  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch<any>(getExpensesAsync(pageSize, page));
  };

  // for add expense drawer
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // for add expense drawer's form
  const handleSubmit = async (values: any) => {
    console.log(values);
    await dispatch<any>(addNewExpenseAsync(values));
    await dispatch<any>(getExpensesAsync(25, 1));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // for view a Single expense drawer
  const showDrawer2 = () => {
    setOpen2(true);
  };
  const onClose2 = () => {
    setOpen2(false);
  };
  const handleViewSingleExpense = async (key: string) => {
    await dispatch<any>(viewExpenseAsync(key));
    showDrawer2();
  };

  // modal to cancel the expense
  const showModal = (id: string) => {
    setExpenseId(id);
    setIsModalOpen(true);
  };
  const handleOk = async (values: any) => {
    console.log(values);
    const data = { expense_ids: [expenseId], ...values };
    console.log(data);
    await dispatch<any>(cancelExpenseAsync(data));
    await dispatch<any>(viewExpenseAsync(expenseId));
    await dispatch<any>(getExpensesAsync(25, 1));

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // expense table columns
  const columns: any = [
    {
      title: "Expenses Number",
      width: 150,
      dataIndex: "expensesNumber",
      key: "key",
      fixed: "left",
      render: (expensesNumber: any, record: any) => {
        // console.log(record);
        const { key } = record;
        const { expense_number, status } = expensesNumber;
        let color;
        if (status === "Approved") {
          color = "green";
        }
        if (status === "Reimbursed") {
          color = "#16b911";
        }
        if (status === "Pending") {
          color = "orange";
        }
        if (status === "Cancelled") {
          color = "red";
        }
        return (
          <div onClick={() => handleViewSingleExpense(key)}>
            <div>#{expense_number}</div>
            <Tag color={color}>{status}</Tag>
          </div>
        );
      },
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "1",
      width: 150,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "2",
      width: 150,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "3",
      width: 150,
    },
    {
      title: "Expense Type",
      dataIndex: "expenseType",
      key: "4",
      width: 150,
    },
    {
      title: "Expense Of",
      dataIndex: "expenseOf",
      key: "4",
      width: 150,
    },
    {
      title: "Recorded By",
      dataIndex: "recordedBy",
      key: "4",
      width: 150,
    },
  ];

  // to approve(if pending) or to reimburse(if approved) the change status
  // modal to change status of Expense to approved
  const showConfirm = (id: string, status: string) => {
    confirm({
      title:
        status === "Pending"
          ? "Approve this expense?"
          : "Reimburse this expense?",
      content:
        status === "Pending"
          ? "Approving an expense means it is on its way for reimbursement. This action cannot be undone."
          : "Reimbursing an expense means that the amount is paid to the user. This action cannot be undone.",
      async onOk() {
        console.log("OK");
        if (status === "Pending") {
          await dispatch<any>(approveExpenseAsync(id));
        }

        if (status === "Approved") {
          await dispatch<any>(reimburseExpenseAsync(id));
        }
        await dispatch<any>(viewExpenseAsync(id));
        await dispatch<any>(getExpensesAsync(25, 1));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div className="expenseTable__header">
        <Button
          className="expenseTable__btn expenseTable__add-btn"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showDrawer}
        >
          New Expense
        </Button>
        {/* drawer to add a new expense */}
        <Drawer
          title="Expense Details"
          placement="right"
          onClose={onClose}
          visible={open}
          footer={
            <div>
              <Button onClick={onClose}>Close Dialog</Button>
              <Button onClick={form.submit}>Add Expense</Button>
            </div>
          }
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            labelAlign="left"
            colon={false} // colon at side of label
          >
            <Form.Item label="Expense Of" name="expense_of">
              <Select>
                <Option value="disabled" disabled>
                  Select User
                </Option>
                {expenseUsers.map((user: any, index: number) => (
                  <Option key={index} value={user._id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Expense Type" name="expense_type">
              <Select>
                <Option value="disabled" disabled>
                  Select Expense Type
                </Option>
                {expenseTypes.map((type: string, index: number) => (
                  <Option key={index} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Amount" name="amount">
              <Input />
            </Form.Item>
            <Form.Item label="Remark" name="remarks">
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </Drawer>
      </div>

      <Table
        pagination={false}
        className="productTable"
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 300,
        }}
      />
      <Pagination
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        pageSize={numberOfItems} //itemsPerPage
        current={currentPage} // currentPage
        defaultCurrent={1} // by default opened page when first loaded the page
        total={totalNumberOfExpenses} // total items
        onChange={handlePaginationChange}
        pageSizeOptions={[5, 25, 50, 100]} // options to display no. of items
      />

      {/* drawer to view a single expense */}
      <Drawer
        title="Expense Details"
        placement="right"
        onClose={onClose2}
        visible={open2}
        footer={
          <div>
            <Button onClick={onClose2}>Close Dialog</Button>
          </div>
        }
      >
        {singleExpense && (
          <>
            <div>Expense Number: #{singleExpense.expense_number}</div>
            <span>{singleExpense.status}</span>
            <Divider />
            <div>
              {moment(singleExpense.createdAt).format("LL")} (
              {moment(singleExpense.createdAt).fromNow()})
            </div>
            <Divider />

            <div>Amount: NPR {singleExpense.amount} </div>
            <div>
              Expense Of: {singleExpense.expense_of.first_name}{" "}
              {singleExpense?.expense_of.last_name}
            </div>
            <div>
              Recorded By: {singleExpense.recorded_by.first_name}{" "}
              {singleExpense.recorded_by.last_name}
            </div>
            <div>Remarks: {singleExpense?.remarks}</div>
            {singleExpense.status === "Pending" && (
              <>
                <Button
                  onClick={() =>
                    showConfirm(singleExpense._id, singleExpense.status)
                  }
                >
                  Approve Expense
                </Button>
                <Button onClick={() => showModal(singleExpense._id)}>
                  Cancel Expense
                </Button>
              </>
            )}
            {singleExpense.status === "Approved" && (
              <>
                <Button onClick={() => showModal(singleExpense._id)}>
                  Cancel Expense
                </Button>
                <Button
                  onClick={() =>
                    showConfirm(singleExpense._id, singleExpense.status)
                  }
                >
                  Reimburse Expense
                </Button>
              </>
            )}

            {singleExpense.status === "Cancelled" && (
              <>
                <Divider />
                <div>
                  Cancelled by: {singleExpense.cancelled_by.first_name}{" "}
                  {singleExpense.cancelled_by.last_name}
                </div>
                <div>Cancel Reason: {singleExpense.cancel_reason}</div>
              </>
            )}
          </>
        )}
      </Drawer>
      <Modal
        title="Cancellation Reason"
        visible={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleOk}>
          <Form.Item name="cancel_reason">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExpensesTable;
