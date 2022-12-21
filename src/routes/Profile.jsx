/* eslint-disable */
import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";

const Profile = () => {
  const history = useHistory();

  const onLogOutclick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutclick}>Log out</button>
    </>
  );
};

export default Profile;
