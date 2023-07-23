import Topnavbar from "./components/Navbar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginSignup/LoginSignup";
import NewsReworked from "./pages/NewsReworked/NewsReworked";
import ToDo from "./pages/ToDo/ToDo";
import CookBook from "./pages/CookBook/CookBook";
import TorrentExplorer from "./pages/TorrentTracker/TorrentTracker";
import Quiz from "./pages/Quiz/Quiz";
import Tracker from "./pages/ExpenseTracker/Tracker";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteTuya from "./components/ProtectedRouteTuya";
import NoUser from "./pages/NoUser/NoUser";
import Loyalty from "./pages/LoyaltyCollector/Loyalty";
import Tuya from "./pages/Tuya/Tuya";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoPage from "./pages/PageNotFound/404";
import { Spinner } from "react-bootstrap";
import { useStateContext } from "./components/StateContext";

function App() {
  const { spinnerIsLoading } = useStateContext();
  return (
    <div>
      <ToastContainer position="top-center" />
      <Topnavbar />
      {spinnerIsLoading && (
        <div className="spinnerWrapper">
          <Spinner
            animation="border"
            style={{ width: "4rem", height: "4rem" }}
          />
        </div>
      )}
      <Routes>
        <Route exact path="/nouser" element={<NoUser />} />
        <Route
          exact
          path="/cookbook"
          element={
            <ProtectedRoute>
              <CookBook />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/tuya"
          element={
            <ProtectedRouteTuya>
              <Tuya />
            </ProtectedRouteTuya>
          }
        />
        <Route
          exact
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/torrent"
          element={
            <ProtectedRoute>
              <TorrentExplorer />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/loyalty"
          element={
            <ProtectedRoute>
              <Loyalty />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />

        <Route
          exact
          path="/tracker"
          element={
            <ProtectedRoute>
              <Tracker />
            </ProtectedRoute>
          }
        />
        <Route exact path="/news" element={<NewsReworked />} />

        <Route
          exact
          path="/toDo"
          element={
            <ProtectedRoute>
              <ToDo />
            </ProtectedRoute>
          }
        />
        <Route exact path="/*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
