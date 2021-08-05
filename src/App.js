import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import SignIn from "./components/Sign/SignIn";
import Navbar from "./components/Shared/Navbar";
import AppModal from "./components/Shared/Modal";
import HomePage from "./components/Shared/Home";
import CategoriesList from "./components/Categories/CategoriesList";
import SignUp from "./components/Sign/SignUp";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/signin" exact={true}>
            <SignIn />
          </Route>
          <Route path="/signup" exact={true}>
            <SignUp />
          </Route>
          <Route path="/categories" exact={true}>
            <CategoriesList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
