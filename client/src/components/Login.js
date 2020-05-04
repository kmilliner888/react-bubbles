import React, { useState } from "react";
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username: "Lambda School", 
    password: "i<3Lambd4"
  });

  const handleChange = e => {
    setUser({[e.target.name]: e.target.value})
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .post("/api/login", user)
      .then(res => {
        console.log("handleSubmit response", res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(error => {
        console.error("error", error)
      });
  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
