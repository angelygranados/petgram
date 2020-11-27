import React from "react";
import { Router } from "@reach/router";
import { GlobalStyle } from "./styles/GlobalStyles";
import Logo from "./components/Logo";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { User } from "./pages/User";
import { Favs } from "./pages/Favs";
import { NotRegisteredUser } from "./pages/NotRegisteredUser";

const UserLogged = ({ children }) => {
  return children({ isAuth: false });
};

export const App = () => {
  const urlParams = new window.URLSearchParams(window.location.search);
  const detailId = urlParams.get("detail");

  return (
    <>
      <GlobalStyle />
      <Logo />
      <Router>
        <Home path="/" />
        <Home path="/pet/:id" />
        <Detail path={"/detail/:detailId"} />
      </Router>
      <UserLogged>
        {({ isAuth }) =>
          isAuth ? (
            <Router>
              <User path={"/user"} />
              <Favs path={"/favs"} />
            </Router>
          ) : (
            <Router>
              <NotRegisteredUser path={"/favs"} />
              <NotRegisteredUser path={"/user"} />
            </Router>
          )
        }
      </UserLogged>
      <NavBar />
    </>
  );
};
