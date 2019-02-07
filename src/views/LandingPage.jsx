import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../containers/Login";
import Homepage from "./Homepage";

const LandingPage = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
  );
};

export default LandingPage;
