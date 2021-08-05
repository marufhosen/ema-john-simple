import React, { useState } from "react";
import LockIcon from "@material-ui/icons/Lock";
import { Avatar, Typography } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";

import { useContext } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  initLoginFramework,
  signInWithEmailandPassword,
  signUpWithEmailandPassword,
} from "./LogInManager";

initLoginFramework();

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    error: "",
    success: false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleOnBlur = (e) => {
    let isValid = true;
    if (e.target.name === "email") {
      isValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isValidNum = e.target.value.length > 6;
      const isHasValid = /\d{1}/.test(e.target.value);
      isValid = isValidNum && isHasValid;
    }
    if (isValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      signUpWithEmailandPassword(user.name, user.email, user.password).then(
        (res) => {
          setUser(res);
          setLoggedInUser(res);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailandPassword(user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ margin: 10, textAlign: "center" }}>
      <Avatar style={{ backgroundColor: "#3f51b5", margin: "auto" }}>
        <LockIcon></LockIcon>
      </Avatar>
      <Typography variant="h6">Sign up</Typography>
      <input
        type="checkbox"
        onClick={() => setNewUser(!newUser)}
        name=""
        id=""
      />
      <label style={{ marginBottom: 100 }} htmlFor="">
        Sign up for new user
      </label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <TextField
            onBlur={handleOnBlur}
            id="outlined-secondary"
            label="User Name"
            variant="outlined"
            color="primary"
            name="name"
            required
          />
        )}
        <br />
        <TextField
          onBlur={handleOnBlur}
          id="outlined-secondary"
          margin="normal"
          label="Email"
          name="email"
          variant="outlined"
          color="primary"
          required
        />
        <br />
        <TextField
          onBlur={handleOnBlur}
          variant="outlined"
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
        />
        <br></br>
        <Button type="submit" variant="contained" color="primary">
          {newUser ? "Sign up" : "Sign in"}
        </Button>
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Loged in"} Successfully
        </p>
      )}
    </div>
  );
};

export default Login;
