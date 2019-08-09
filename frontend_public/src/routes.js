import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function Routes() {
  return (
    <Switch>
      <Route path="/:link" exact component={Home} />
      <Route path='*' component={PageNotFound} />
    </Switch>
  );
}

export default Routes;