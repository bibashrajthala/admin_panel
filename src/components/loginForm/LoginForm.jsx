import React from "react";

import { ReactComponent as Logo } from "../../assets/svgs/siderLogo.svg";

import { Button, Form, Input } from "antd";

import { loginUserAsync } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

import "./loginForm.css";

// type TFormData = {
//   email: string;
//   password: string;
// };

const LoginForm = () => {
  const dispatch = useDispatch();

  const onFinish = async (formData) => {
    console.log("user form data:", formData);

    await dispatch(loginUserAsync(formData));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="loginForm__container">
      <div className="loginForm__logo-container">
        <Logo className="loginForm__logo" />
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="loginForm"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelAlign="left"
          className="loginForm__item"
        >
          <Input className="loginForm__input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          labelAlign="left"
          className="loginForm__item"
        >
          <Input.Password size="large" className="loginForm__input" />
        </Form.Item>

        <Button size="large" htmlType="submit" className="loginForm__btn" block>
          Login to dynoAdminPanel
        </Button>

        <span className="loginForm__text">Not a customer yet?</span>

        <Button size="large" danger className="loginForm__btn" block>
          Enroll Now
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
