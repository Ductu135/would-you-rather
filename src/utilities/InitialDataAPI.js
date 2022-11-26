import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
} from "./_DATA";

import { getUsers, saveQuestionAuthor, saveUserAnswer } from "../stores/UserStore";
import { getQuestions, createQuestion, storeQuestionAnswer } from "../stores/QuestionStore";

export const getInitialUsers = async () => {
  let users = {};
  await _getUsers().then((user) => {
    users = user;
  });
  return users;
};

export const getInitialQuestions = async () => {
  let questions = {};
  await _getQuestions().then((question) => {
    questions = question;
  });

  return questions;
};

const saveQuestion = async (question) => {
  let questionToSave = {};
  await _saveQuestion(question).then((question) => {
    questionToSave = question;
  });
  return questionToSave;
};

export const saveTheNewQuestion = (question, userId) => {
  return async (dispatch) => {
    const questionToSave = await saveQuestion(question);
    dispatch(createQuestion(questionToSave));
    dispatch(saveQuestionAuthor(questionToSave.id, userId));
    return questionToSave;
  };
};

export const saveQuestionAnswer = (answer, answerer) => {
  return (dispatch) => {
    dispatch(storeQuestionAnswer(answer, answerer));
    dispatch(saveUserAnswer(answer, answerer));
  }
}

//#region initial data
export const initialData = () => {
  return async (dispatch) => {
    const users = await getInitialUsers();
    const questions = await getInitialQuestions();
    dispatch(getUsers(users));
    dispatch(getQuestions(questions));
  };
};

//#endregion
