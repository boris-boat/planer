import "./App.css";
import Topnavbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/loginSignup";

import NewsReworked from "./pages/NewsReworked";
import ToDo from "./pages/ToDo";
import Chat from "./Chat/Chat/Chat";
import CookBook from "./pages/CookBook";
import TorrentExplorer from "./pages/TorrentTracker";
import Quiz from "./pages/Quiz";
import Tracker from "./pages/ExpenseTracker/Tracker";
import ProtectedRoute from "./components/ProtectedRoute";
import NoUser from "./pages/NoUser/NoUser";
import { useStateContext } from "./components/StateContext";

function App() {
  const { user } = useStateContext();
  
  return (
    <div>
      <Topnavbar />
      <Routes>
        <Route exact path="/nouser" element={<NoUser/>} />
        <Route
          exact
          path="/cookbook"
          element={
            <ProtectedRoute user={user}>
              <CookBook />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/quiz"
          element={
            <ProtectedRoute user={user}>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/torrent"
          element={
            <ProtectedRoute user={user}>
              <TorrentExplorer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute user={user}>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/tracker"
          element={
            <ProtectedRoute user={user}>
              <Tracker />
            </ProtectedRoute>
          }
        />
        <Route exact path="/news" element={<NewsReworked />} />
        <Route
          exact
          path="/toDo"
          element={
            <ProtectedRoute user={user}>
              <ToDo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
