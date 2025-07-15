import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { use, useEffect } from "react";
import ROUTES from "../utils/routingUrls";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.user);

  const fetchUser = async () => {
    console.log(userInfo);

    if (userInfo) return;
    try {
      const response = await fetch(BASE_URL + "/profile/view", {
        credentials: "include",
      });
      if (response.status === 401) {
        navigate(ROUTES.LOGIN);
      }
      const { data } = await response.json();
      dispatch(addUser(data));
    } catch (error) {
      console.error(error);
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
