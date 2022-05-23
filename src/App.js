import "./App.css";
import Topnavbar from "./components/navbar";

import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StateContext } from "./components/StateContext";

import Home from "./pages/Home";
import Login from "./pages/loginSignup";
import Tracker from "./pages/Tracker";
import NewsReworked from "./pages/NewsReworked";
import ToDo from "./pages/ToDo";

function App() {
  return (
    <div>
      <StateContext>
        <BrowserRouter>
          <Topnavbar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/tracker" element={<Tracker />} />
            <Route exact path="/news" element={<NewsReworked />} />
            <Route exact path="/toDo" element={<ToDo />} />
          </Routes>
        </BrowserRouter>
      </StateContext>
    </div>
  );
}

export default App;
