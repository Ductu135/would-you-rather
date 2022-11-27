import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PollScore from "./PollScore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveQuestionAnswer } from "../utilities/InitialDataAPI";

const Poll = ({ questions, users, loggingUser, questionType }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (option) => {
    const questionAnswer = {
      id: questions.id,
      vote: option,
    };
    const loggingUserId = loggingUser.id;
    dispatch(saveQuestionAnswer(questionAnswer, loggingUserId));
  };
  const userToShow = users.find((u) => u.id === questions.author);

  const ViewResult = (questionId) => {
    const url = `/questions/${questionId}`;
      navigate(url);
  };

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
          {questionType === "unanswered" ? (
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
            <div>
              Would you rather{" "}
              <span style={{ fontStyle: "italic" }}>
                {questions.optionOne.text}
              </span>{" "}
              <span style={{ fontWeight: "bold" }}>OR</span>{" "}
              <span style={{ fontStyle: "italic" }}>
                {questions.optionTwo.text}
              </span>
              <div>
                <Button
                  className={classes.button}
                  onClick={(e) => {
                    ViewResult(questions.id);
                  }}
                >
                  View Poll Result
                </Button>
              </div>
            </div>
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
