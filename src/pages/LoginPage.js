import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authen } from "../stores/UserStore";

const LoginPage = ({ isLoggingOut }) => {
  const classes = useStyles();
  const [isNewSignIn, setIsNewSignIn] = useState(true);
  const navigate = useNavigate();
  const [selectedUserId, setselectedUserId] = useState("");
  const state = useSelector((state) => state.user);
  const users = Object.values(state.users);
  const dispatch = useDispatch();

  const handleSetValue = (e) => {
    setselectedUserId(e);
  };

  const location = useLocation();
  const existedPath = ["/homepage", "/leaderboard", "/add", "/"];

  if (location.pathname === "/" && isNewSignIn === true) {
    location.pathname = "/homepage";
  } else if (
    !existedPath.find((path) => path === location.pathname) &&
    !location.pathname.includes("questions")
  ) {
    location.pathname = "/404";
  }

  const login = () => {
    const userId = selectedUserId;
    if (userId) {
      localStorage.setItem("userId", userId);
      dispatch(authen(userId));
      var userName = users.find((u) => u.id === userId);
      localStorage.setItem("userName", userName.name);
    }
    setIsNewSignIn(false);
    navigate({ location }, { replace: true });
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
              return (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="" key="none">
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
