import React, { FC } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import {
  Home,
  TargetInfo,
  TargetSearch,
  NavigationBar,
  TargetCreate,
} from "./components/public";

export const App: FC = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/targets" component={TargetSearch} />
          <Route exact path="/targets/create" component={TargetCreate} />
          <Route path="/targets/:id" component={TargetInfo} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
