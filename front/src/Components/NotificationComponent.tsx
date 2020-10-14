import { Snackbar } from "@material-ui/core";
import React from "react";

interface IProps {
    message: string;
    open: boolean;
    handleClose: () => void;
}

const NotificationComponent: React.FC<IProps> = (props: IProps) => {
    const { message, open, handleClose } = props;
    return (
        <Snackbar
            anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            message={<span id="message-id">{message}</span>}
        />
    );
};

export default NotificationComponent;
