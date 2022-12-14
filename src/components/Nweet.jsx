/* eslint-disable */
import React, { useState } from "react";
import { dbService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";

function Nweet({ nweetObj, userObj }) {
  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    console.log("nweetsTextRef", NweetTextRef);
    if (ok) {
      await deleteDoc(NweetTextRef);
      if (nweetObj.url !== "") {
        await deleteObject(ref(storageService, nweetObj.url));
      }
    } else {
      null;
    }
  };

  const onUpdate = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await updateDoc(NweetTextRef, {
        text: newNweet
      });
      setEditing(false);
    } else {
      null;
    }
  };

  const onEditToggle = () => setEditing(prev => !prev);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      <div>
        <h4>{nweetObj.text}</h4>
        {nweetObj.url && <img src={nweetObj.url} witdh="50px" height="50px" />}
        {userObj.uid === nweetObj.createrId ? (
          <>
            <button onClick={onDeleteClick}>Delete</button>
            {editing ? (
              <>
                <form onSubmit={onUpdate}>
                  <input value={newNweet} onChange={onChange} />
                  <input onSubmit={onUpdate} type="submit" value="Edit" />
                </form>
              </>
            ) : (
              <button onClick={onEditToggle}>Edit</button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Nweet;
