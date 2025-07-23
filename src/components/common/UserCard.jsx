import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL, sendRequestStatus } from "../../utils/constant";
import { removeFeed } from "../../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const handleSendRequest = async (status) => {
    try {
      const response = await fetch(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const { data = null, error = null } = await response.json();
      if (data) {
        dispatch(removeFeed(_id));
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-md ">
        <figure className="pt-5">
          <img src={photoUrl} alt="Photo" />
        </figure>
        <div className="card-body items-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          {about && <p>{about}</p>}
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest(sendRequestStatus.IGNORED)}
            >
              Reject
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest(sendRequestStatus.INTERESTED)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
