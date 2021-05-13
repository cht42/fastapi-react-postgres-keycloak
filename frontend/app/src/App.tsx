import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./components/public/Home";
export const App: FC = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
