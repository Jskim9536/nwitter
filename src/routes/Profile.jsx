/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where
} from "@firebase/firestore";
import Nweet from "../components/Nweet";

const Profile = ({ userObj, refreshUser }) => {
  const [myNweets, setMyNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("createrId", "==", userObj.uid), // where은 필터링 하는 방법
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    // const qs = await queryDocumentSnapshot.data(q);
    onSnapshot(q, snapshot => {
      const nweetsArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMyNweets(nweetsArr);
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
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      });
      refreshUser();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
        {console.log(userObj.updateProfile)}
      </form>
      <button onClick={onLogOutclick}>Log out</button>
      {Boolean(myNweets) &&
        myNweets.map(nweet => (
          <Nweet key={nweet.id} nweetObj={nweet} userObj={userObj} />
        ))}
    </div>
  );
};

export default Profile;
// myNweet.url ? (
//   <img src={myNweet.url} height="50px" width="50px" />
// ) : null;
