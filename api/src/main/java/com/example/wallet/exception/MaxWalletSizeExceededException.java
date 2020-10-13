package com.example.wallet.exception;

import com.example.wallet.model.Wallet;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MaxWalletSizeExceededException extends RuntimeException {
    public MaxWalletSizeExceededException(Wallet wallet) {
        super("Wallet with an id of '" + wallet.getId() + "' can't store that many funds");
    }
  }