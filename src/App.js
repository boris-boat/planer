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
import Loyalty from "./pages/LoyaltyCollector/Loyalty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
            <ProtectedRoute>
              <CookBook />
            </ProtectedRoute>
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
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/join"
          element={
            <ProtectedRoute>
              <Join />
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
      </Routes>
    </div>
  );
}

export default App;
