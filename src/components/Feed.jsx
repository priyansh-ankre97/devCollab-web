import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./common/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await fetch(BASE_URL + "/user/feed", {
        credentials: "include",
      });
      const { data } = await res.json();
      dispatch(addFeed(data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="m-10 flex justify-center">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
