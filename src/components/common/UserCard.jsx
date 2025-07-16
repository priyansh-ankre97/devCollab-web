import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

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
            <button className="btn btn-primary">Reject</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
