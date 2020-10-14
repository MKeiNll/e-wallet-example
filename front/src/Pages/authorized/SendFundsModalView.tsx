import { Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationComponent from "../../Components/NotificationComponent";

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
    walletId: number;
    submitCallback: () => Promise<void>;
}

const SendFundsModalView: React.FC<IProps> = (props: IProps) => {
    const { walletId, submitCallback } = props;
    const { t } = useTranslation();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [toWalletIdValue, setToWalletIdValue] = useState<number>(1);
    const [toWalletIdInputError, setToWalletIdInputError] = useState<string>("");
    const [amountValue, setAmountValue] = useState<string>("0.01");
    const [amountInputError, setAmountInputError] = useState<string>("");

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

    const addFunds = () => {
        setAmountInputError("");
        setToWalletIdInputError("");
        fetch("/wallet/sendFunds", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + sessionStorage.getItem("user"),
            },
            body: JSON.stringify({
                amount: amountValue,
                fromWalletId: walletId,
                toWalletId: toWalletIdValue,
            }),
        })
            .then((res) => {
                if (res.status === 200) {
                    handleNotificationOpen();
                    handleClose();
                    return true;
                } else {
                    setAmountInputError(t("input.inputErrorMessage"));
                    setToWalletIdInputError(t("input.inputErrorMessage"));
                }
                return false;
            })
            .then(async (ok) => {
                if (ok) {
                    await submitCallback();
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
                {t("walletsPage.sendFundsButtonLabel")}
            </Button>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    <div>
                        <h3>{t("walletsPage.sendFundsModal.title")}</h3>
                    </div>
                    <div>
                        <b>{t("walletsPage.sendFundsModal.toWalletIdLabel")}</b>
                    </div>
                    <TextField
                        error={toWalletIdInputError !== ""}
                        helperText={toWalletIdInputError}
                        margin="normal"
                        className={classes.inputField}
                        onChange={(e) => {
                            if (e.target.value === "" || /^[0-9]*([,.][0-9]{1,2})?$/.test(e.target.value)) {
                                setToWalletIdValue(parseInt((e.target as HTMLInputElement).value, 10));
                            }
                        }}
                        value={toWalletIdValue}
                    />
                    <div>
                        <b>{t("walletsPage.sendFundsModal.amountLabel")}</b>
                    </div>
                    <TextField
                        error={amountInputError !== ""}
                        helperText={amountInputError}
                        margin="normal"
                        className={classes.inputField}
                        onChange={(e) => {
                            if (e.target.value === "" || /^[0-9]*([,.][0-9]{1,2})?$/.test(e.target.value)) {
                                setAmountValue((e.target as HTMLInputElement).value);
                            }
                        }}
                        value={amountValue}
                    />
                    <div>
                        <Button variant="contained" color="primary" onClick={addFunds}>
                            {t("walletsPage.sendFundsModal.submitButtonLabel")}
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

export default SendFundsModalView;
