import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import SignIn from "./components/Sign/SignIn";
import Navbar from "./components/Shared/Navbar";
import CategoriesList from "./components/Categories/CategoriesList";
import SignUp from "./components/Sign/SignUp";
import CategoryEdit from "./components/Categories/CategoryEdit";
import SkillsList from "./components/Skills/SkillsList";
import CategoryAdd from "./components/Categories/CategoryAdd";
import SkillAdd from "./components/Skills/SkillAdd";

function App() {
  const userState = useSelector((state) => state.authentication);
  const { user, error, loading } = userState;
  let appRoutes;
  if (user.token)
    appRoutes = (
      <Switch>
        <Route path="/" exact={true}>
          <CategoriesList />
        </Route>
        <Route path="/signin" exact={true}>
          <Redirect to="/" />
        </Route>
        <Route path="/signup" exact={true}>
          <Redirect to="/" />
        </Route>
        <Route path="/category/:id" exact={true}>
          <CategoryEdit />
        </Route>
        <Route path="/skills" exact={true}>
          <SkillsList />
        </Route>
        <Route path="/addCategory" exact={true}>
          <CategoryAdd />
        </Route>
        <Route path="/addSkill" exact={true}>
          <SkillAdd />
        </Route>
      </Switch>
    );
  else
    appRoutes = (
      <Switch>
        <Route path="/" exact={true}>
          <Redirect to="/signin" />
        </Route>
        <Route path="/signin" exact={true}>
          <SignIn />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUp />
        </Route>
      </Switch>
    );

  return (
    <Router>
      <Navbar token={user.token} />
      <div className="App">{appRoutes}</div>
    </Router>
  );
}

export default App;
