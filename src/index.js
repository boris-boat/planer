import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/loginSignup";

import { StateContext } from "./components/StateContext";
import Tracker from "./components/Tracker";
import NewsReworked from "./components/NewsReworked";
ReactDOM.render(
  <StateContext>
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route exact path="/home" element={<App />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/tracker" element={<Tracker />} />
          <Route exact path="/news" element={<NewsReworked />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </StateContext>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
