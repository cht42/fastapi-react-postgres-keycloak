import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import { App, BoxArrowInLeft, QuestionCircle } from "react-bootstrap-icons";
import React, { useState } from "react";
import SideNav, { NavIcon, NavItem, NavText } from "@trendmicro/react-sidenav";

import { Auth } from "./utils/Auth";
import ClickOutside from "react-click-outsider";
import { Route } from "react-router-dom";

export const SideBar = ({ onAuthUpdate }) => {
  const auth = new Auth([onAuthUpdate]);
  const [expanded, setExpanded] = useState(false);

  return (
    <Route
      render={({ location, history }) => (
        <React.Fragment>
          <ClickOutside onClickOutside={() => setExpanded(false)}>
            <SideNav
              onSelect={(selected) => {
                const to = "/" + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
              expanded={expanded}
              onToggle={(expanded) => {
                setExpanded(expanded);
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav
                defaultSelected={
                  location.pathname === "/login"
                    ? "dashboard"
                    : location.pathname.substring(1)
                }
              >
                <NavItem eventKey="dashboard">
                  <NavIcon>
                    <App size={24} />
                  </NavIcon>
                  <NavText>Dashboard</NavText>
                </NavItem>
                <NavItem eventKey="about">
                  <NavIcon>
                    <QuestionCircle size={24} />
                  </NavIcon>
                  <NavText>About</NavText>
                </NavItem>
                <NavItem eventKey="login" onClick={auth.logoutUser()}>
                  <NavIcon>
                    <BoxArrowInLeft size={24} />
                  </NavIcon>
                  <NavText>"Logout"</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          </ClickOutside>
        </React.Fragment>
      )}
    />
  );
};
