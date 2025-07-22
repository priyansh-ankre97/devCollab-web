import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routingUrls";
import CustInput from "./common/CustInput";
import Toast from "./common/Toast";

const Login = () => {
  const [emailId, setEmailId] = useState("Priyansh@gmail.com");
  const [password, setPassword] = useState("Priyansh@123");
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
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title">Login!</h2>
            <CustInput
              label={"Enter you emailId"}
              placeholder={"Type EmailId here"}
              setValue={(e) => setEmailId(e.target.value)}
              value={emailId}
            />
            <CustInput
              label={"Enter you Password"}
              placeholder={"Type Password here"}
              setValue={(e) => setPassword(e.target.value)}
              value={password}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast open={false} successMessage={"Login Successfull"} />
    </>
  );
};

export default Login;
