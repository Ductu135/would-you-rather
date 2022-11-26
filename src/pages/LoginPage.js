import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedUserId, setselectedUserId] = useState("");
  const state = useSelector((state) => state.user);
  const users = Object.values(state.users);

  const handleSetValue = (e) => {
    setselectedUserId(e);
  };

  const login = () => {
    const userId = selectedUserId;
    if (userId) {
      localStorage.setItem("userId", userId);
      var userName = users.find((u) => u.id === userId);
      localStorage.setItem("userName", userName.name);
    }
    window.location.assign("/HomePage");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        className="app-header"
        style={{ textAlign: "Center", paddingTop: 50, color: "darkblue" }}
      >
        Welcome to the Would You Rather
      </h2>
      <InputLabel className={classes.pageTitle}>Sign in</InputLabel>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.selectLabel}>User Name</InputLabel>
        <Select
          className={classes.selectLabel}
          onChange={(e) => {
            handleSetValue(e.target.value);
          }}
          value={selectedUserId}
          id="user2"
        >
          {users ? (
            users.map((user) => {
              return <MenuItem value={user.id}>{user.name}</MenuItem>;
            })
          ) : (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
        </Select>
        <Button className={classes.button} onClick={login}>
          Sign in
        </Button>
      </FormControl>
    </div>
  );
};

/*CSS Region*/
const useStyles = makeStyles((theme) => ({
  pageTitle: {
    margin: theme.spacing(10, 12),
    minWidth: 100,
    textAlign: "center",
    fontSize: 30,
    color: "darkblue",
  },
  formControl: {
    minWidth: 250,
    textAlign: "left",
  },
  button: {
    margin: theme.spacing(5, 0),
    color: "white",
    backgroundColor: "darkblue",
    "&:hover": {
      color: "grey",
    },
  },
}));

export default LoginPage;
