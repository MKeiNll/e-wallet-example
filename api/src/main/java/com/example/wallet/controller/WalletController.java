package com.example.wallet.controller;

import com.example.wallet.dto.*;
import com.example.wallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @GetMapping()
    public List<WalletDto> getWallets() {
        return walletService.getWallets();
    }

    @GetMapping("/{id}")
    public WalletDto getWallet(@PathVariable Long id) {
        return walletService.getWalletById(id);
    }

    @PutMapping()
    public WalletDto createWallet(@Valid @RequestBody WalletCreateRequestDto createRequest) {
        return walletService.createWallet(createRequest);
    }

    @PostMapping("/addFunds")
    public WalletDto addFunds(@Valid @RequestBody WalletAddFundsRequestDto addRequest) {
        return walletService.addFunds(addRequest);
    }

    @PostMapping("/withdrawFunds")
    public WalletDto withdrawFunds(@Valid @RequestBody WalletWithdrawFundsRequestDto withdrawRequest) {
        return walletService.withdrawFunds(withdrawRequest);
    }

    @PostMapping("/sendFunds")
    public void sendFunds(@Valid @RequestBody WalletToWalletTransactionRequestDto transactionRequest) {
        walletService.sendFunds(transactionRequest);
    }
}