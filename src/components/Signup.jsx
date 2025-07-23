import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routingUrls";
import Form from "./common/Form";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = async () => {
    setError(null);
    try {
      const res = await fetch(BASE_URL + "/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
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
        navigate(ROUTES.PROFILE);
      } else if (!res.ok || error) {
        throw new Error(error);
      }

      dispatch(addUser(data));
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };
  const navigateToLogin = () => {
    navigate(ROUTES.LOGIN);
  };
  const fields = [
    {
      label: "Enter you firstName",
      placeholder: "Type firstName here",
      setValue: (e) => setFirstName(e.target.value),
      value: firstName,
    },
    {
      label: "Enter you lastName",
      placeholder: "Type lastName here",
      setValue: (e) => setLastName(e.target.value),
      value: lastName,
    },
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
    <Form
      fields={fields}
      onSubmit={handleSignUp}
      title="Signup"
      error={error}
      helperText={"Already have an account? Login"}
      onClickHelperText={navigateToLogin}
    />
  );
};

export default Signup;
