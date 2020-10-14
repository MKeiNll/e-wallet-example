import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router";
import MenuComponent from "../../Components/MenuComponent";
import AddFundsModalView from "./AddFundsModalView";
import AddWalletModalView from "./AddWalletModalView";
import SendFundsModalView from "./SendFundsModalView";
import WithdrawFundsModalView from "./WithdrawFundsModalView";

const useStyles = makeStyles({
    table: {
        width: 1000,
    },
    tableContainer: {
        marginLeft: 200,
        marginTop: 50,
    },
    tableRow: {
        height: 75,
    },
});

interface IWallet {
    id: number;
    balance: number;
    name: string;
}

const AllWalletsPage: React.FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [wallets, setWallets] = useState<IWallet[]>([]);

    const handleWalletCreate = (wallet: IWallet) => {
        const walletsCopy = wallets.slice();
        walletsCopy.push(wallet);
        setWallets(walletsCopy);
    };

    const handleWalletUpdate = (wallet: IWallet) => {
        const newWallets = wallets.map((w) => {
            if (w.id === wallet.id) {
                return Object.assign({}, w, wallet);
            }
            return w;
        });
        setWallets(newWallets);
    };

    const fetchForWallets = () => fetch("/wallet", {
        method: "get",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            if (res.status === 200 || res.status === 304) {
                return res.json();
            } else {
                return null;
            }
        })
        .then((json) => {
            if (json !== null) {
                setWallets(json);
            }
        });

    useEffect(() => {
        void fetchForWallets();
    }, []);

    if (!sessionStorage.getItem("user")) {
        return <Redirect to={"/login"}/>;
    }

    return (
        <>
            <MenuComponent/>
            <div className={classes.tableContainer}>
                <AddWalletModalView submitCallback={handleWalletCreate}/>
                <div>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <b>{t("walletsPage.tableIdLabel")}</b>
                                </TableCell>
                                <TableCell>
                                    <b>{t("walletsPage.tableNameLabel")}</b>
                                </TableCell>
                                <TableCell>
                                    <b>{t("walletsPage.tableBalanceLabel")}</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(wallets || [])
                                .map((wallet, index) => (
                                    <TableRow key={index} className={classes.tableRow}>
                                        <TableCell component="th" scope="row">
                                            {wallet.id}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {wallet.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {`${wallet.balance}	€`}
                                        </TableCell>
                                        <TableCell align="right">
                                            <WithdrawFundsModalView
                                                walletId={wallet.id}
                                                submitCallback={handleWalletUpdate}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <AddFundsModalView
                                                walletId={wallet.id}
                                                submitCallback={handleWalletUpdate}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <SendFundsModalView
                                                walletId={wallet.id}
                                                submitCallback={() => fetchForWallets()}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default AllWalletsPage;
