/* eslint-disable */
import React, { useState, useRef } from "react";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setNweet(value);
    setAttachment("");
  };

  const onSubmit = async event => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); // Reference -storage의 이미지 폴더 생성.
      const response = await attachmentRef.putString(attachment, "data_url"); // 폴더에 이미지를 넣는 작업
      attachmentUrl = await response.ref.getDownloadURL(); // 폴더에 이미지 넣는 작업이 완료시 .ref를 통해 이미지 Reference 접근이 가능하고, get DownloadURL을 통해 이미지가 저장된 주소를 받을 수 있다.
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      createrId: userObj.uid,
      url: attachmentUrl
    };
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet("");
    onClearAttachment();
  };

  const onFileChange = event => {
    const {
      target: { files }
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result }
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = null;
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on yout mind?"
        maxLength={120}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Cancel</button>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
