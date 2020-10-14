package com.example.wallet.dto;

import javax.validation.constraints.NotEmpty;

public class WalletCreateRequestDto {
    @NotEmpty
    public String name;
}