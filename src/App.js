import "./App.css";
import Topnavbar from "./components/navbar";

import "./index.css";
import {Route, Routes } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/loginSignup";
import Tracker from "./pages/Tracker";
import NewsReworked from "./pages/NewsReworked";
import ToDo from "./pages/ToDo";

function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/*" element={<Login />} />
      <Route exact path="/tracker" element={<Tracker />} />
      <Route exact path="/news" element={<NewsReworked />} />
      <Route exact path="/toDo" element={<ToDo />} />
    </Routes>
  </div>
    
  );
}

export default App;
