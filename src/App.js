import "./App.css";
import Topnavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/LoginSignup/LoginSignup";

import NewsReworked from "./pages/NewsReworked/NewsReworked";
import ToDo from "./pages/ToDo/ToDo";
import Join from "./Chat/components/Join/Join";
import CookBook from "./pages/CookBook/CookBook";
import TorrentExplorer from "./pages/TorrentTracker/TorrentTracker";
import Quiz from "./pages/Quiz/Quiz";
import Tracker from "./pages/ExpenseTracker/Tracker";
import ProtectedRoute from "./components/ProtectedRoute";
import NoUser from "./pages/NoUser/NoUser";
import Chat from "./Chat/Chat/Chat";
import FourOFour from "./pages/PageNotFound/404";


function App() {
  let user = localStorage.getItem("user")?.split(" ")[0];
  
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
          path="/join"
          element={
            <ProtectedRoute user={user}>
              <Join />
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
        <Route exact path="*" element={<FourOFour/>} />

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
