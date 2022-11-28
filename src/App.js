import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatePollPage from "./pages/CreatePollPage";
import LeaderBoard from "./pages/LeaderBoard";
import NotFound from "./pages/NotFound";
import PollDetail from "./pages/PollDetail";
import NaviagionBar from "./component/NavigationBar";
import PrivateRoutes from "./utilities/PrivateRoutes";
import { useSelector } from "react-redux";

const App = () => {
  //const userId = localStorage.getItem("userId");
  const userId = useSelector((state) => state.user.userId);
  return (
    <BrowserRouter>
      {userId ? <NaviagionBar /> : <></>}
      <Routes>
        <Route element={<PrivateRoutes userId={userId} />}>
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
        </Route>
        <Route exact path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
