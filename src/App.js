import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatePollPage from "./pages/CreatePollPage";
import LeaderBoard from "./pages/LeaderBoard";
import NotFound from "./pages/NotFound";
import PollDetail from "./pages/PollDetail";
import NaviagionBar from "./component/NavigationBar";
import { useSelector } from "react-redux";

const App = () => {
  const userId = useSelector((state) => state.user.userId);
  return (
    <div>
      <BrowserRouter>
        {userId ? <NaviagionBar /> : <></>}
        <Routes>
          {userId ? (
            <>
              <Route
                exact
                path="/homepage"
                element={<HomePage userId={userId} />}
              />
              <Route
                exact
                path="/add"
                element={<CreatePollPage userId={userId} />}
              />
              <Route
                exact
                path="/leaderboard"
                element={<LeaderBoard userId={userId} />}
              />
              <Route
                exact
                path="/questions/:questionId"
                element={<PollDetail userId={userId} />}
              />
              <Route exact path="/404" element={<NotFound userId={userId} />} />
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
