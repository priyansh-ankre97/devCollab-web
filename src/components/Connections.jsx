import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import ROUTES from "../utils/routingUrls";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/connections", {
        credentials: "include",
      });
      const { data = null, error = null } = await response.json();
      if (data) {
        dispatch(addConnections(data));
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return null;
  if (connections.length === 0) {
    return <h1 className="text-center my-5">No Connections found</h1>;
  }
  return (
    <div className="flex flex-col gap-4 my-5 items-center justify-center">
      {connections?.map((connection) => {
        const { firstName, lastName, photoUrl } = connection;
        return (
          <div className="w-md flex items-center justify-between gap-3 bg-base-300 p-3">
            <div className="flex gap-3 items-center">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={photoUrl} alt="image of user" />
                </div>
              </div>
              <div>
                <div className="font-bold">{firstName + " " + lastName}</div>
                <div className="text-sm opacity-50"></div>
              </div>
            </div>
            <Link to={ROUTES.CHAT + "/" + connection._id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
