import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Main from "./components/main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Main/> } />
        <Route path="sign-in" element={ <SignIn/> } />
        <Route path="sign-up" element={ <SignUp/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
