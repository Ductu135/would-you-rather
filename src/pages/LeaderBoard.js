import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const LeaderBoard = ({ userId }) => {
  const classes = useStyles();
  const [leaderBoard, setLeaderBoard] = useState([]);
  const userObject = Object.values(useSelector((state) => state.user.users));

  useEffect(() => {
    CountAnsweredQuestions();
  }, [userObject.length]);

  const CountAnsweredQuestions = () => {
    let userAnsweredScore = [];
    userObject.forEach((user) => {
      let answeredScore = {
        userId: "",
        name: "",
        score: 0,
        questionScore: 0,
        answersScore: 0,
        avatarURL: ""
      };

      answeredScore.answersScore = Object.values(user.answers).length;
      answeredScore.questionScore = user.questions.length;
      answeredScore.name = user.name;
      answeredScore.userId = user.id;
      answeredScore.score =
        answeredScore.answersScore + answeredScore.questionScore;
      answeredScore.avatarURL = user.avatarURL;

      userAnsweredScore.push(answeredScore);
    });

    if (userAnsweredScore.length) {
      userAnsweredScore.sort((a, b) => b.score - a.score);
      setLeaderBoard(userAnsweredScore);
    }
  };

  return (
    <div>
      <h2 style={{textAlign: "center"}}>Leader Board</h2>
      {leaderBoard ? (
        leaderBoard.map((leader) => {
          return (
            <div className={classes.root}>
              <Avatar src={leader.avatarURL} />
              <div>
                <div>{leader.name}</div>
                <div>Answered Questions: {leader.answersScore}</div>
                <div>Questions: {leader.questionScore}</div>
              </div>
              <div>Total score: {leader.score}</div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "30%",
    display: "flex",
    "& > *": {
      margin: theme.spacing(6),
      minHeight: 100,
      minWidth: 100
    },
  },
}));

export default LeaderBoard;
