import { combineReducers } from "redux";
import { questionReducer } from "./QuestionStore";
import { userReducer } from "./UserStore";

export default combineReducers({
  user: userReducer,
  question: questionReducer
});