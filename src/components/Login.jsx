import React, { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import ROUTES from "../utils/routingUrls";

const Login = () => {
  const [emailId, setEmailId] = useState("Priyansh@gmail.com");
  const [password, setPassword] = useState("Priyansh@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
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
      const { data = null } = await res.json();
      if (data) {
        navigate(ROUTES.DEFAULT);
      }

      dispatch(addUser(data));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login!</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter you emailId</legend>
            <input
              type="text"
              className="input"
              placeholder="Type EmailId here"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter you Password</legend>
            <input
              type="text"
              className="input"
              placeholder="Type Password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <p className="label">Optional</p> */}
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
