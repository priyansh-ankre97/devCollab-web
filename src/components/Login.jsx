import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routingUrls";
import Form from "./common/Form";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch(BASE_URL + "/login", {
        method: "POST",
        body: JSON.stringify({
          emailId,
          password,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await res.json();

      const { data = null, error = null } = responseData;
      if (data) {
        navigate(ROUTES.DEFAULT);
      } else if (!res.ok || error) {
        throw new Error(error);
      }

      dispatch(addUser(data));
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };
  const navigateToSignup = () => {
    navigate(ROUTES.SIGNUP);
  };
  const fields = [
    {
      label: "Enter you emailId",
      placeholder: "Type EmailId here",
      setValue: (e) => setEmailId(e.target.value),
      value: emailId,
    },
    {
      label: "Enter you Password",
      placeholder: "Type Password here",
      setValue: (e) => setPassword(e.target.value),
      value: password,
    },
  ];
  return (
    <>
      <Form
        fields={fields}
        onSubmit={handleLogin}
        title="Login"
        error={error}
        helperText="Don't have an account? Signup"
        onClickHelperText={navigateToSignup}
      />
    </>
  );
};

export default Login;
