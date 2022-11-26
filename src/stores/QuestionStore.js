//#region action
export const GET_QUESTIONS = "GET_QUESTIONS";
export const CREATE_QUESTIONS = "CREATE_QUESTIONS";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER"

export const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    payload: questions
  };
};

export const createQuestion = (question) => {
  return {
    type: CREATE_QUESTIONS,
    payload: question
  }
}

export const storeQuestionAnswer = (answer, answerer) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    payload: {answer: answer, answerer: answerer}
  }
}
//#endregion

export const initialState = {
  questions: {},
};

//#region reducers
export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case CREATE_QUESTIONS:
      const result = {
        ...state.questions,
        [action.payload.id]: action.payload
      }
      return {...state, questions: result};
    case SAVE_QUESTION_ANSWER:
      const questionId = action.payload.answer.id
      const optionAnswer = action.payload.answer.vote
      const answerer = action.payload.answerer;
      const newVote = state.questions[questionId][optionAnswer];
      const concatNewVote = newVote.votes.concat(answerer);
      const updatedState = {
        ...state.questions,
        [questionId] : {
          ...state.questions[questionId],
          [optionAnswer]: {
            ...state.questions[questionId][optionAnswer],
            votes: concatNewVote
          }
        }
      }
      state.questions = updatedState;
      console.log(state);
      return state
    default:
      return state;
  }
};
//#endregion
