import React, { useState } from "react";
import CustInput from "./common/CustInput";
import UserCard from "./common/UserCard";
import { BASE_URL } from "../utils/constant";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState(null);
  const handleSave = async () => {
    setError(null);
    try {
      const response = await fetch(BASE_URL + "/profile/edit", {
        method: "PATCH",
        body: JSON.stringify({
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data = null, error = null } = await response.json();
      if (data) {
        alert("Profile updated successfully");
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center my-10 gap-4">
      <div className="flex justify-center">
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title">Login!</h2>
            <CustInput
              label={"Enter you first name"}
              placeholder={"Type first name here"}
              setValue={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <CustInput
              label={"Enter you last name"}
              value={lastName}
              setValue={(e) => setLastName(e.target.value)}
              placeholder={"Type last name here"}
            />
            <CustInput
              label={"Enter you photo url"}
              value={photoUrl}
              setValue={(e) => setPhotoUrl(e.target.value)}
              placeholder={"Type photo url here"}
            />
            <CustInput
              label={"Enter you age"}
              value={age}
              setValue={(e) => setAge(e.target.value)}
              placeholder={"Type age here"}
            />
            <CustInput
              label={"Enter you gender"}
              value={gender}
              setValue={(e) => setGender(e.target.value)}
              placeholder={"Type gender here"}
            />
            <CustInput
              label={"Enter about you"}
              value={about}
              setValue={(e) => setAbout(e.target.value)}
              placeholder={"Type about here"}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSave}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
