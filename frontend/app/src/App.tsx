import React, { FC } from "react";
import { Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, TargetInfo, TargetSearch } from "./components/public";

export const App: FC = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Switch>
          <Navbar></Navbar>
          <Route exact path="/" component={Home} />
          <Route exact path="/targets" component={TargetSearch} />
          <Route path="/targets/:id" component={TargetInfo} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
