import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import "./index.css";
import AllWalletsPage from "./Pages/authorized/AllWalletsPage";
import LoginPage from "./Pages/LoginPage";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/wallets" component={AllWalletsPage}/>
            <Route path="/login" component={LoginPage}/>
            <Redirect exact from="/" to="/login"/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root"),
);

serviceWorker.unregister();
