/* eslint-disable */
import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          updateProfile: args => user.updateProfile(args)
        });
        setIsLoggedIn(true);
        console.log("userObj", userObj);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.id,
      updateProfile: args => user.updateProfile(args)
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default App;
