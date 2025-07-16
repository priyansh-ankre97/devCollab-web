import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { use, useEffect, useState } from "react";
import ROUTES from "../utils/routingUrls";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { pathname } = useLocation();

  const userInfo = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userInfo || [ROUTES.LOGIN, ROUTES.SIGNUP].includes(pathname)) return;
    try {
      const response = await fetch(BASE_URL + "/profile/view", {
        credentials: "include",
      });
      if (response.status === 401) {
        navigate(ROUTES.LOGIN);
      }
      const { data = null, error = null } = await response.json();
      if (data) {
        dispatch(addUser(data));
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
