/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { dbService } from "../fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, snapshot => {
      const nweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      {nweets.map(nweet => (
        <Nweet key={nweet.id} nweetObj={nweet} userObj={userObj} />
      ))}
    </div>
  );
};

export default Home;
