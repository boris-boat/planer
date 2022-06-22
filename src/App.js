import "./App.css";
import Topnavbar from "./components/navbar";


import { Route, Routes } from "react-router-dom";

import Join from "./Chat/components/Join/Join";
import Home from "./pages/Home";
import Login from "./pages/loginSignup";
import Tracker from "./pages/Tracker";
import NewsReworked from "./pages/NewsReworked";
import ToDo from "./pages/ToDo";
import Chat from "./Chat/Chat/Chat";
import CookBook from "./pages/CookBook";
import TorrentExplorer from "./pages/TorrentTracker";

function App() {
  return (
    <div>
      <Topnavbar />
      <Routes>
        <Route exact path="/cookbook" element={<CookBook />} />
        <Route exact path="/torrent" element={<TorrentExplorer />} />
        <Route path="/chat" element={<Chat />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/tracker" element={<Tracker />} />
        <Route exact path="/news" element={<NewsReworked />} />
        <Route exact path="/toDo" element={<ToDo />} />
      </Routes>
    </div>
  );
}

export default App;
