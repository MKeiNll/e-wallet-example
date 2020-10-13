package com.example.wallet.exception;

import com.example.wallet.model.Wallet;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughFundsException extends RuntimeException {
  public NotEnoughFundsException(Wallet wallet) {
      super("Wallet with an id of '" + wallet.getId() + "' does not have enough funds for the specified transaction");
  }
}