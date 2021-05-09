import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { About } from "./About";
import { Auth } from "./utils/Auth";
import { Container } from "react-bootstrap";
import { Dashboard } from "./Dashboard";
import Home from "./Home";
import { Login } from "./Login";
import { NavigationBar } from "./NavigationBar";
import { NotificationContainer } from "react-notifications";
import { SideBar } from "./SideBar";
import packageJson from "../package.json";

export const App = () => {
  const periodicLoginCheck = (seconds = 60) => {
    const interval = setInterval(() => {
      if (authenticated) auth.checkUserToken();
    }, seconds * 1000);
    return () => clearInterval(interval);
  };

  const onAuthUpdate = () => {
    setAuthenticated(auth.isUserAuthenticated());
  };

  const auth = new Auth([onAuthUpdate]);
  auth.checkUserToken();
  const [authenticated, setAuthenticated] = useState(
    auth.isUserAuthenticated()
  );
  periodicLoginCheck(60);

  return (
    <React.Fragment>
      <Router basename={packageJson["homepage"] + "/"}>
        <NotificationContainer />
        {authenticated ? (
          <SideBar authenticated={authenticated} onAuthUpdate={onAuthUpdate} />
        ) : (
          <NavigationBar
            authenticated={authenticated}
            onAuthUpdate={onAuthUpdate}
          />
        )}
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  authenticated={authenticated}
                  onAuthUpdate={onAuthUpdate}
                />
              )}
            />
            <Route
              path="/dashboard"
              render={(props) => (
                <Dashboard {...props} authenticated={authenticated} />
              )}
            />
            <Route path="/about" component={About} />
          </Switch>
        </Container>
      </Router>
    </React.Fragment>
  );
};

export default App;
