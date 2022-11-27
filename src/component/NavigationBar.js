import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router";

const NaviagionBar = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  var userName = localStorage.getItem("userName");
  const logout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const handleNavigate = (page) => {
    navigate(page);
  }

  return (
    <div>
      <div className={classes.header}>
        <Breadcrumbs aria-label="breadcrumb" className={classes.menu}>
          <Link
            color="inherit"
            onClick={(e) => {
              handleNavigate("/homepage");
            }}
          >
            Home
          </Link>
          <Link
            color="inherit"
            onClick={(e) => {
              handleNavigate("/leaderboard");
            }}
          >
            LeaderBoard
          </Link>
          <Link
            color="textPrimary"
            onClick={(e) => {
              handleNavigate("/add");
            }}
          >
            Create New Poll
          </Link>
        </Breadcrumbs>
        <div className={classes.hello}>
          <div className={classes.inforAccount}>
            Hello {userName ? userName : ""}
          </div>
          <Button className={classes.button} onClick={logout}>Sign out</Button>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5, 0),
    marginLeft: 20,
    color: "black",
    "&:hover": {
      color: "grey",
    },
  },
  inforAccount: {
    display: "inline-flex",
    margin: theme.spacing(5, 0),
  },
  header: {
    display: "flex",
    marginLeft: 50,
  },
  menu: {
    marginTop: 45,
  },
  hello: {
    marginLeft: "60%",
    fontFamily: '"Segoe UI"'
  },
}));

export default NaviagionBar;
