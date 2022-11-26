import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PollList from "../component/PollList";

const HomePage = ({ userId }) => {
  const classes = useStyles();
  const userObject = Object.values(useSelector((state) => state.user.users));
  const questionObject = Object.values(
    useSelector((state) => state.question.questions)
  );

  console.log(questionObject);

  const [questionType, setQuestionType] = useState("unanswered");

  const changeQuestionType = (type) => {
    if (type !== questionType) {
      setQuestionType(type);
    }
  };

  return (
    <div>
      <div classes={classes.typeOfPoll}>
        <Button
          id="unanswered"
          style={{ marginLeft: 45 }}
          className={classes.button}
          onClick={(e) => {
            changeQuestionType("unanswered");
          }}
        >
          Unanswered
        </Button>
        <Button
          id="answered"
          className={classes.button}
          onClick={(e) => {
            changeQuestionType("answered");
          }}
        >
          Answered
        </Button>
      </div>
      <div>
        <PollList
          questions={questionObject}
          users={userObject}
          questionType={questionType}
          userId={userId}
        />
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
}));

export default HomePage;
