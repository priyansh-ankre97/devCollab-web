import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await fetch(BASE_URL + "/user/feed");
      const { data } = await res.json();
      dispatch(addFeed(data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return <div>{feed && <UserCard user={feed[0]} />}</div>;
};

export default Feed;
