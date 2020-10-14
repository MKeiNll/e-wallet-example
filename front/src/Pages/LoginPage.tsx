import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import base64 from 'base-64';
import React, { ComponentProps, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, withRouter } from "react-router-dom";
import MenuComponent from "../Components/MenuComponent";

const useStyles = makeStyles(({
    inputContainer: {
        marginLeft: 200,
        marginTop: 50,
    },
    inputField: {
        marginBottom: 25,
    },
}));

const LoginPage: React.FC<ComponentProps<any>> = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(!!sessionStorage.getItem("user"));
    const [usernameValue, setUsernameValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [usernameInputError, setEmailInputError] = useState<string>("");
    const [passwordInputError, setPasswordInputError] = useState<string>("");

    const loginUser = () => {
        setEmailInputError("");
        setPasswordInputError("");
        fetch("/wallet", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + base64.encode(usernameValue + ":" + passwordValue),
            },
            method: "get",
        })
            .then((res) => {
                if (res.status === 200) {
                    sessionStorage.setItem("user", base64.encode(usernameValue + ":" + passwordValue));
                    setUserLoggedIn(true);
                }
                return res.json();
            });
    };

    return userLoggedIn ? (
        <Redirect exact from="/" to="/wallets"/>
    ) : (
        <>
            <MenuComponent/>
            <div className={classes.inputContainer}>
                <div>
                    <b>{t("loginPage.usernameLabel")}</b>
                </div>
                <TextField
                    error={usernameInputError !== ""}
                    helperText={usernameInputError}
                    margin="normal"
                    onChange={(e) => setUsernameValue((e.target as HTMLInputElement).value)}
                    className={classes.inputField}
                />

                <div>
                    <b>{t("loginPage.passwordLabel")}</b>
                </div>
                <TextField
                    error={passwordInputError !== ""}
                    helperText={passwordInputError}
                    margin="normal"
                    type="password"
                    onChange={(e) => setPasswordValue((e.target as HTMLInputElement).value)}
                    className={classes.inputField}
                />
                <div>
                    <Button variant="contained" color="primary" onClick={loginUser}>
                        {t("loginPage.loginButtonLabel")}
                    </Button>
                </div>
                <br/>
            </div>
        </>
    );
};

export default withRouter(LoginPage);
