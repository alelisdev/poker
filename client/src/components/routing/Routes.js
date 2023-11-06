import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import RegistrationPage from "../../pages/RegistrationPage";
import LoginPage from "../../pages/LoginPage";
import Play from "../../pages/Play";
import ProtectedRoute from "./ProtectedRoute";
import PaymentsPage from "../../pages/Payments";
import TournamentPage from "../../pages/TournamentPage";
import LobbyPage from "../../pages/LobbyPage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute path="/payments" component={PaymentsPage} />
      <ProtectedRoute path="/tournament" component={TournamentPage} />
      <ProtectedRoute path="/lobby" component={LobbyPage} />
      <ProtectedRoute path="/play" component={Play} />
    </Switch>
  );
};

export default Routes;
