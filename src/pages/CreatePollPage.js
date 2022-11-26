import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTheNewQuestion } from "../utilities/InitialDataAPI";

const CreatePollPage = ({ userId }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObject = useSelector((state) => state.user.users);
  const questionObject = useSelector((state) => state.question.questions);

  const formatQuestion = async () => {
    const questionToSave = {
      optionOneText: "",
      optionTwoText: "",
      author: "",
    };
    questionToSave.optionOneText = document.getElementById("optionOne").value;
    questionToSave.optionTwoText = document.getElementById("optionTwo").value;
    const users = Object.values(userObject);
    const author = users?.find((u) => u.id === userId);
    questionToSave.author = author.id;
    await dispatch(saveTheNewQuestion(questionToSave, userId));
    navigate("/HomePage");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Create New Poll Question</h2>
      <div style={{ textAlign: "center" }} className={classes.questionInfor}>
        <div>Complete the question</div>
        <div>Would you rather</div>
        <div style={{ textAlign: "left" }}>
          <Box className={classes.boxQuestion}>
            <TextField
              id="optionOne"
              label="Option one"
              variant="standard"
              className={classes.pageTitle1}
            />
            <div>Or</div>
            <TextField
              id="optionTwo"
              label="Option two"
              variant="standard"
              className={classes.pageTitle2}
            />
            <br />
            <Button className={classes.button} onClick={formatQuestion}>
              Submit
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  pageTitle1: {
    margin: theme.spacing(5, 0),
    minWidth: 400,
    textAlign: "center",
    fontSize: 30,
    color: "darkblue",
  },
  pageTitle2: {
    minWidth: 400,
    textAlign: "center",
    fontSize: 30,
    color: "darkblue",
  },
  button: {
    margin: theme.spacing(5, 0),
    color: "white",
    minWidth: 200,
    backgroundColor: "darkblue",
    "&:hover": {
      color: "grey",
    },
  },
  boxQuestion: {
    textAlign: "center",
    marginTop: 20,
  },
  questionInfor: {
    fontFamily: '"Segoe UI"',
    fontSize: 18,
  },
}));

export default CreatePollPage;
