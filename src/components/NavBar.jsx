import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../utils/routingUrls";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const userInfo = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await fetch(BASE_URL + "/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        dispatch(removeUser());
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">💻DevCollab</a>
      </div>
      {userInfo && (
        <div className="flex gap-2 items-center">
          <p>Welcome {userInfo.firstName}</p>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 rounded-full">
                <img alt="profile avatar" src={userInfo.photoUrl || ""} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={ROUTES.PROFILE} className="justify-between">
                  Profile
                </Link>
                <Link to={ROUTES.CONNECTIONS} className="justify-between">
                  Connections
                </Link>
                <Link to={ROUTES.REQUESTS} className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
