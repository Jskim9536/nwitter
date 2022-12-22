/* eslint-disable */
import React from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";

function Auth() {
  const onSocialClick = async event => {
    const {
      target: { name }
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else {
      null;
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          {" "}
          Continue with Google{" "}
        </button>
      </div>
    </div>
  );
}

export default Auth;
