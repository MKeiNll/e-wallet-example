import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(() => ({
    logoutButton: {
        "alignItems": "center",
        "display": "flex",
        "float": "right",
        "height": "100%",
        "&:hover": {
            background: "#C9CEEA",
            color: "#3F51B5",
            cursor: "pointer",
        },
        "justifyContent": "center",
        "width": "120px",
    },
}));

const LogoutComponent: React.FC = () => {
    const { t } = useTranslation();
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(!!sessionStorage.getItem("user"));
    const classes = useStyles();

    const logoutUser = () => {
        sessionStorage.removeItem("user");
        setUserLoggedIn(false);
    };

    return userLoggedIn ? (
        <>
            <div onClick={logoutUser} className={classes.logoutButton}>
                {t("menu.logoutLabel")}
            </div>
        </>
    ) : (
        <Redirect to="/login"/>
    );
};

export default LogoutComponent;
