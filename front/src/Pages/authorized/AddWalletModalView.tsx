import { Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationComponent from "../../Components/NotificationComponent";
import { IWallet } from "../../Interfaces/Wallet";

const useStyles = makeStyles(() => ({
    paper: {
        position: "absolute",
        width: 350,
        height: 500,
        backgroundColor: "white",
        border: "2px solid #000",
        padding: "20px",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        margin: "auto",
    },
    openModalButton: {
        marginBottom: 25,
    },
    inputField: {
        marginBottom: 25,
    },
}));

interface IProps {
    submitCallback: (wallet: IWallet) => void;
}

const AddWalletModalView: React.FC<IProps> = (props: IProps) => {
    const { submitCallback } = props;
    const { t } = useTranslation();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [nameValue, setNameValue] = useState<string>("");
    const [nameInputError, setNameInputError] = useState<string>("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNotificationOpen = () => {
        setNotificationOpen(true);
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    const createWallet = () => {
        setNameInputError("");
        fetch("/wallet", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + sessionStorage.getItem("user"),
            },
            body: JSON.stringify({
                name: nameValue,
            }),
        })
            .then((res) => {
                if (res.status === 200) {
                    handleNotificationOpen();
                    handleClose();
                    return res.json();
                } else {
                    setNameInputError(t("input.inputErrorMessage"));
                }
                return null;
            })
            .then((json) => {
                if (json) {
                    submitCallback(json as IWallet);
                }
            });
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                className={classes.openModalButton}
            >
                {t("walletsPage.newWalletButtonLabel")}
            </Button>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    <div>
                        <h3>{t("walletsPage.newWalletModal.title")}</h3>
                    </div>
                    <div>
                        <b>{t("walletsPage.newWalletModal.nameLabel")}</b>
                    </div>
                    <TextField
                        error={nameInputError !== ""}
                        helperText={nameInputError}
                        margin="normal"
                        className={classes.inputField}
                        onChange={(e) => setNameValue((e.target as HTMLInputElement).value)}
                    />
                    <div>
                        <Button variant="contained" color="primary" onClick={createWallet}>
                            {t("walletsPage.newWalletModal.createButtonLabel")}
                        </Button>
                    </div>
                </div>
            </Modal>
            <NotificationComponent
                handleClose={handleNotificationClose}
                open={notificationOpen}
                message={t("notifications.successMessage")}
            />
        </>
    );
};

export default AddWalletModalView;
