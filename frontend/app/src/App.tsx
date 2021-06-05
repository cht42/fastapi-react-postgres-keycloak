import React, { createContext, FC, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Home, NavigationBar, Login } from "./components/public";
import { TargetInfo, TargetSearch, TargetCreate } from "./components/private";
import { PrivateRoute } from "./PrivateRoute";
import { isAuthenticated, peridodicRefreshTokenCheck } from "./utils/Auth";

export const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: (auth: boolean) => {},
});

export const App: FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(
    isAuthenticated()
  );

  peridodicRefreshTokenCheck(60);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <BrowserRouter basename="/">
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/targets" component={TargetSearch} />
          <PrivateRoute exact path="/targets/create" component={TargetCreate} />
          <PrivateRoute path="/targets/:id" component={TargetInfo} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
