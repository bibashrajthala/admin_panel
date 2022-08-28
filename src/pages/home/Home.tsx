import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Home = () => {
  return (
    <>
      <h3>this is home page</h3>
      <Link to="/auth">
        <Button>Login</Button>
      </Link>
    </>
  );
};

export default Home;
