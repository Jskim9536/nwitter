/* eslint-disable */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  {
    console.log(userObj.email);
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            {userObj.displayName ? userObj.displayName : userObj.email}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
