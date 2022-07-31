import Topnavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/LoginSignup/LoginSignup";
import NewsReworked from "./pages/NewsReworked/NewsReworked";
import ToDo from "./pages/ToDo/ToDo";
import Join from "./pages/Chat/components/Join/Join";
import CookBook from "./pages/CookBook/CookBook";
import TorrentExplorer from "./pages/TorrentTracker/TorrentTracker";
import Quiz from "./pages/Quiz/Quiz";
import Tracker from "./pages/ExpenseTracker/Tracker";
import ProtectedRoute from "./components/ProtectedRoute";
import NoUser from "./pages/NoUser/NoUser";
import Chat from "./pages/Chat/Chat/Chat";
import FourOFour from "./pages/PageNotFound/404";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "./components/StateContext";

function App() {
  const { fullUserInfo} = useStateContext();


  return (
    <div>
      <ToastContainer position="top-center" />

      <Topnavbar />
      <Routes>
        <Route exact path="/nouser" element={<NoUser />} />
        <Route
          exact
          path="/cookbook"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <CookBook />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/quiz"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/torrent"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <TorrentExplorer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/join"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <Join />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/tracker"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <Tracker />
            </ProtectedRoute>
          }
        />
        <Route exact path="/news" element={<NewsReworked />} />
        <Route exact path="*" element={<FourOFour />} />

        <Route
          exact
          path="/toDo"
          element={
            <ProtectedRoute fullUserInfo={fullUserInfo}>
              <ToDo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
