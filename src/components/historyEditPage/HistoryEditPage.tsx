import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { selectProductEditHistory } from "../../store/product/product.selector";
import { useSelector } from "react-redux";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "1",
  },
  {
    title: "Change",
    dataIndex: "change",
    key: "2",
    render: (change: number) => {
      let color = change > 0 ? "green" : "volcano";
      let sign = change > 0 ? "+" : "-";

      return (
        <Tag color={color} key={change}>
          {sign}
          {change}
        </Tag>
      );
    },
  },
  {
    title: "New Stock",
    dataIndex: "newStock",
    key: "3",
    render: (newStock: number) => {
      return (
        <Tag color="geekblue" key={newStock}>
          {newStock}
        </Tag>
      );
    },
  },
  {
    title: "Remarks",
    dataIndex: "remarks",
    key: "4",
    render: (remarks: any) => (
      <>
        <span>{remarks.remarks}</span>
        <p>
          <UserOutlined />
          {remarks.action_by}
        </p>
      </>
    ),
  },
  {
    title: "Action",
    key: "5",
  },
];

const HistoryEditPage = () => {
  const history = useSelector(selectProductEditHistory);

  //   console.log(id);
  // console.log(history);

  const data: DataType[] = history.map((historyData: any, index: number) => {
    const { createdAt, change, new_level, remarks, action_by } = historyData;
    const formatedDate = moment(createdAt).format("MMMM Do YYYY , h:mm a");
    return {
      key: index,
      date: formatedDate,
      change: change,
      newStock: new_level,
      remarks: { remarks, action_by },
    };
  });

  return <Table columns={columns} dataSource={data} />;
};

export default HistoryEditPage;
