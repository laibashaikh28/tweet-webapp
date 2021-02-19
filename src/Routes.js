import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
