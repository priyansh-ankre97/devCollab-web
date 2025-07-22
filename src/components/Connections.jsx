import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";

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
            {/* <div className="flex gap-2">
              <button className="btn btn-primary">Accepted</button>
              <button className="btn btn-secondary">Rejected</button>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
