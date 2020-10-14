package com.example.wallet.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class WalletCreateRequestDto {
    @NotEmpty
    @Size(max=32)
    public String name;
}