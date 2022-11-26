import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatePollPage from "./pages/CreatePollPage";
import LeaderBoard from "./pages/LeaderBoard";
import { useSelector } from "react-redux";
import NaviagionBar from "./component/NavigationBar";

const App = () => {
  const userId = localStorage.getItem("userId");
  return (
    <div>
      <BrowserRouter>
        {userId ? <NaviagionBar /> : <></>}
        <Routes>
          {userId ? (
            <>
              <Route
                exact
                path="/Homepage"
                element={<HomePage userId={userId} />}
              />
              <Route
                exact
                path="/CreatePollPage"
                element={<CreatePollPage userId={userId} />}
              />
              <Route
                exact
                path="/LeaderBoard"
                element={<LeaderBoard userId={userId} />}
              />
            </>
          ) : (
            <Route exact path="*" element={<LoginPage />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
