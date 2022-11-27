import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import rootReducers from "./stores/rootReducer";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { initialData } from "./utilities/InitialDataAPI";

export const store = createStore(rootReducers, applyMiddleware(thunk));
store.dispatch(initialData());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
