import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PollScore from "./PollScore";
import { useDispatch } from "react-redux";
import { saveQuestionAnswer } from "../utilities/InitialDataAPI";

const Poll = ({ questions, users, loggingUser, questionType }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClick = (option) => {
    const questionAnswer = {
      id: questions.id,
      vote: option
    }
    const loggingUserId = loggingUser.id;
    dispatch(saveQuestionAnswer(questionAnswer, loggingUserId))
  };
  const userToShow = users.find((u) => u.id === questions.author);

  return (
    <div>
      <div className={classes.root}>
        <Avatar alt={userToShow.name} src={userToShow.avatarURL} />
        <div>
          <div>
            {questions.author
              ? users.find((u) => u.id === questions.author).name
              : ""}{" "}
            ask:
          </div>
          {(questionType === "unanswered" && isShowPollResult === false) ? (
            <div id="optionsToChoose">
              <div>Would you rather?</div>
              <Button
                id="optionOne"
                className={classes.button}
                onClick={(e) => {
                  handleClick("optionOne");
                }}
              >
                {questions.optionOne.text}
              </Button>
              <div>or</div>
              <Button
                id="optionTwo"
                className={classes.button}
                onClick={(e) => {
                  handleClick("optionTwo");
                }}
              >
                {questions.optionTwo.text}
              </Button>
            </div>
          ) : (
            <PollScore users={users} question={questions} />
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(6),
      minHeight: 100,
      minWidth: 100,
    },
  },
}));

export default Poll;
