import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PollScore from "../component/PollScore";
import NotFound from "./NotFound";

const PollDetail = ({ userId }) => {
  const questionId = useParams().questionId;
  console.log(questionId);

  const questionObject = Object.values(
    useSelector((state) => state.question.questions)
  );
  const userObject = Object.values(useSelector((state) => state.user.users));
  console.log(questionObject);
  const questionToShow = questionObject.find((q) => q.id === questionId);
  const userToShow = userObject.find((u) => u.id === userId);

  console.log(questionToShow);
  return questionToShow ? (
    <div style={{ marginLeft: "25%" }}>
      {<PollScore question={questionToShow} user={userToShow} />}
    </div>
  ) : (
    <NotFound />
  );
};

export default PollDetail;
