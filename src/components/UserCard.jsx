import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age && gender && age + ", " + gender}</p>
          <p>{about && about}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Reject</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
