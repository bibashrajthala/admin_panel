import React from "react";
import { TreeSelect, Form } from "antd";
import { useSelector } from "react-redux";

const CategoryTreeSelect = () => {
  // const [categoryValue, setCategoryValue] = useState<string>(""); // for treeSelect of category
  // const [categoryArray, setCategoryArray] = useState<string[]>([]); // for treeSelect of category

  const categories = useSelector((state: any) => state.product?.categories);

  const categoriesMap = categories?.map((category: any) => {
    const { name, _id: id, sub_categories } = category;

    const childCategoriesMap = sub_categories?.map((childCategory: any) => {
      const { name, _id, sub_categories, parent_group } = childCategory;

      const grandchildCategoryMap = sub_categories?.map(
        (grandchildCategory: any) => {
          const { name, _id, parent_group } = grandchildCategory;
          return {
            title: name,
            // value: _id,
            parent_value: parent_group,
            grandparent_value: id,
            data: [id, parent_group, _id],
            value: [id, parent_group, _id].toString(), // this 'value' is the prop sent as value when node of treeSelet is selected
          };
        }
      );

      return {
        title: name,
        // value: _id,
        parent_value: parent_group,
        children: grandchildCategoryMap,
        data: [parent_group, _id],
        value: [parent_group, _id].toString(),
      };
    });

    return {
      title: name,
      // value: id,
      children: childCategoriesMap,
      data: [id],
      value: id,
    };
  });
  // // console.log(categories);
  // // console.log(categoriesMap);

  // for category treeSelect data
  const treeData = categoriesMap;

  // // when we select node/category in treeSelect
  // const onSelectChange = (value: any, node: any) => {
  //   // console.log("value:", value);
  //   // console.log("node:", node);
  //   setCategoryArray(node.data);
  //   setCategoryValue(categoryArray.toString());
  // };
  // console.log(categoryArray);
  // console.log(categoryArray.toString());
  // console.log("cateogoryValue", categoryValue);

  // const onTreeSelectChange = (value: string) => {
  //   console.log("value", value);
  //   setCategoryValue(categoryArray.toString());
  // };
  // console.log("cateogoryValue", categoryValue);

  return (
    <Form.Item label="Category" name="group">
      <TreeSelect
        style={{ width: "100%" }}
        // value={categoryValue}
        dropdownStyle={{
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll={true}
        // onChange={onTreeSelectChange}
        // onSelect={onSelectChange}
      />
    </Form.Item>
  );
};

export default CategoryTreeSelect;
