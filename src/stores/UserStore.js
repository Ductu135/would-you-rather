//#region action
export const AUTHEN = "AUTHEN";
export const GET_USERS = "GET_USERS";
export const SAVE_CREATED_QUESTION = "SAVE_CREATED_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export const saveQuestionAuthor = (questionId, userId) => {
  return {
    type: SAVE_CREATED_QUESTION,
    payload: { questionId: questionId, userId: userId },
  };
};

export const saveUserAnswer = (answer, answerer) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    payload: { answer: answer, answerer: answerer },
  };
};
//#endregion

export const initialState = {
  users: {},
};

//#region reducers
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SAVE_CREATED_QUESTION:
      const questionId = action.payload.questionId;
      const userId = action.payload.userId;
      const result = {
        ...state.users,
        [userId]: {
          ...state.users[userId],
          questions: state.users[userId].questions.concat([questionId]),
        },
      };
      return { ...state, users: result };
    case SAVE_QUESTION_ANSWER:
      const question = action.payload.answer.id;
      const optionAnswer = action.payload.answer.vote;
      const answerer = action.payload.answerer;
      const updatedState = {
        ...state.users,
        [answerer]: {
          ...state.users[answerer],
          answers: {
            ...state.users[answerer].answers,
            [question]: optionAnswer,
          },
        },
      };
      return { ...state, users: updatedState };
    default:
      return state;
  }
};
//#endregion
