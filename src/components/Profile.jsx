import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userInfo = useSelector((store) => store.user);
  return <div>{userInfo && <EditProfile user={userInfo} />}</div>;
};

export default Profile;
