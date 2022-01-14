import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import { AuthProvider, RequireAuth } from "./contexts/auth";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Main from "./components/main";

function App() {
  return ( 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={ <SignIn/> } />
          <Route path="/sign-up" element={ <SignUp/> } />
          <Route path="/" element={ 
            <RequireAuth>
              <Main/> 
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
