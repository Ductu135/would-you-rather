import React, { useEffect } from "react";
import Poll from "../component/Poll";
import { useState } from "react";

const PollList = ({ questions, users, questionType, userId }) => {
  const [showingQuestion, setshowingQuestion] = useState([]);
  const [loggingUser, setloggingUser] = useState({});

  useEffect(() => {
    showQuestionType();
  }, [questionType, users]);

  const showQuestionType = async () => {
    if (users) {
      const loggingAccount = users?.find((u) => u.id === userId);
      if (loggingAccount !== undefined) {
        const questionKeys = Object.keys(loggingAccount?.answers);
        if (questionType === "unanswered") {
          const unansweredQuestions = getUnansweredQuestions(
            loggingAccount?.answers
          );
          unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
          setshowingQuestion(unansweredQuestions);
        } else {
          let answeredQuestions = [];
          questionKeys.forEach((key) => {
            answeredQuestions.push(questions.find((q) => q.id === key));
          });
          answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
          setshowingQuestion(answeredQuestions);
        }
        setloggingUser(loggingAccount);
      }
    }
  };

  const getUnansweredQuestions = (answeredQuestions) => {
    const answeredQuestionKeys = Object.keys(answeredQuestions);
    let unansweredQuestions = [];
    let questionsToCheck = questions;
    answeredQuestionKeys.forEach((key) => {
      unansweredQuestions = questionsToCheck.filter((q) => q.id !== key);
      questionsToCheck = unansweredQuestions;
    });

    return unansweredQuestions;
  };

  return (
    <div>
      <div>
        {showingQuestion ? (
          showingQuestion.map((question) => {
            return (
              <div key={question.id}>
                <Poll
                  questions={question}
                  users={users}
                  loggingUser={loggingUser}
                  questionType={questionType}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PollList;
