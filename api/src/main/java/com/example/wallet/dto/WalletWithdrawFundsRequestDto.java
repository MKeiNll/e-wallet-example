package com.example.wallet.dto;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class WalletWithdrawFundsRequestDto {
    @Min(1)
    public Long walletId;

    @NotNull
    @DecimalMin("0.01")
    @Digits(integer=100, fraction=2)
    public BigDecimal amount;
}