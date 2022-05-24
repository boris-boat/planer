import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";


import Topnavbar from "./components/navbar";

import { BrowserRouter } from "react-router-dom";
import { StateContext } from "./components/StateContext";


ReactDOM.render(
<StateContext>
  <BrowserRouter> 
  <Topnavbar/>
  <App/>
  </BrowserRouter>
  </StateContext>
  
   
   
 ,

  document.getElementById("root")
);
