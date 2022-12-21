/* eslint-disable */
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from "@firebase/firestore";

const Profile = ({ userObj }) => {
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("createrId", "==", userObj.uid), // where은 필터링 하는 방법
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);
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
