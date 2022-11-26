import React from "react";

const PollScore = ({ question }) => {
  const numberOfVoteOptionOne = question.optionOne.votes.length ? question.optionOne.votes.length : 0;
  const numberOfVoteOptionTwo = question.optionTwo.votes.length ? question.optionTwo.votes.length : 0;
  const totalVote = numberOfVoteOptionOne + numberOfVoteOptionTwo;
  const percentageOfOptionOne = (numberOfVoteOptionOne / totalVote) * 100;

  const percentageOfOptionTwo = (numberOfVoteOptionTwo / totalVote) * 100;

  return (
    <div className="container" style={{ fontFamily: '"Segoe UI"' }}>
      <div>
        Would you rather{" "}
        <span style={{ fontStyle: "italic" }}>{question.optionOne.text}</span>{" "}
        <span style={{ fontWeight: "bold" }}>OR</span>{" "}
        <span style={{ fontStyle: "italic" }}>{question.optionTwo.text}</span>
      </div>
      <div>Result: </div>
      <div>
        <span style={{ fontStyle: "italic" }}>{question.optionOne.text}</span>:{" "}
        {numberOfVoteOptionOne} {numberOfVoteOptionOne > 1 ? "votes" : "vote"} -{" "}
        {percentageOfOptionOne.toFixed()}%
      </div>
      <div>
        <span style={{ fontStyle: "italic" }}>{question.optionTwo.text}</span>:{" "}
        {numberOfVoteOptionTwo} {numberOfVoteOptionTwo > 1 ? "votes" : "vote"} -{" "}
        {percentageOfOptionTwo.toFixed()}%
      </div>
      <div>Total vote: {totalVote}</div>
    </div>
  );
};

export default PollScore;
