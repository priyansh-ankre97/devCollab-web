import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/RequestSlice";
import { BASE_URL, reviewRequestStatus } from "../utils/constant";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState(null);
  const fetchRequests = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/request", {
        credentials: "include",
      });
      const { data = null, error = null } = await response.json();
      if (data) {
        dispatch(addRequests(data));
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const handleReviewRequest = async (status, _id) => {
    try {
      const response = await fetch(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const { data = null, error = null } = await response.json();
      if (data) {
        dispatch(removeRequest(_id));
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return null;
  if (requests.length === 0) {
    return <h1 className="text-center my-5">No request to review</h1>;
  }
  return (
    <div className="flex flex-col gap-4 my-5 items-center justify-center">
      <h1>Connection Requests</h1>
      {requests?.map((request) => {
        const { firstName, lastName, photoUrl } = request.fromUserId;
        return (
          <div
            key={request._id}
            className="w-md flex items-center justify-between gap-3 bg-base-300 p-3"
          >
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
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleReviewRequest(reviewRequestStatus.ACCEPT, request._id)
                }
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  handleReviewRequest(reviewRequestStatus.REJECT, request._id)
                }
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
