package com.example.wallet.controller.dto;

import com.example.wallet.model.Wallet;

import java.math.BigDecimal;

public class WalletDto {

    public WalletDto(Wallet wallet) {
        this.id = wallet.getId();
        this.name = wallet.getName();
        this.balance = wallet.getBalance();
    }
    
    public Long id;
    public String name;
    public BigDecimal balance;
}