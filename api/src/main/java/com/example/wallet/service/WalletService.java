package com.example.wallet.service;

import com.example.wallet.dto.*;
import com.example.wallet.exception.MaxWalletSizeExceededException;
import com.example.wallet.exception.NotEnoughFundsException;
import com.example.wallet.exception.NotFoundException;
import com.example.wallet.model.Wallet;
import com.example.wallet.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WalletService {

    @Autowired
    WalletRepository walletRepository;

    public List<WalletDto> getWallets() {
        List<WalletDto> walletList = new ArrayList<>();
        walletRepository.findAll().forEach(w -> walletList.add(new WalletDto(w)));
        return walletList;
    }

    public WalletDto getWalletById(Long id) {
        Optional<Wallet> findResult = walletRepository.findById(id);
        if (findResult.isEmpty()) {
            throw new NotFoundException();
        }
        return new WalletDto(findResult.get());
    }

    public WalletDto createWallet(WalletCreateRequestDto createRequest) {
        return new WalletDto(walletRepository.save(new Wallet(createRequest)));
    }

    private Wallet addFunds(Long id, BigDecimal amount) {
        Optional<Wallet> findResult = walletRepository.findById(id);
        if (findResult.isEmpty()) {
            throw new NotFoundException();
        }

        Wallet wallet = findResult.get();
        BigDecimal newBalance = wallet.getBalance().add(amount);

        if (getIntegerDigits(newBalance) > 100) {
            throw new MaxWalletSizeExceededException(wallet);
        }

        wallet.setBalance(newBalance);
        return walletRepository.save(wallet);
    }

    public WalletDto addFunds(WalletAddFundsRequestDto addRequest) {
        return new WalletDto(addFunds(addRequest.walletId, addRequest.amount));
    }

    private Wallet withdrawFunds(Long id, BigDecimal amount) {
        Optional<Wallet> findResult = walletRepository.findById(id);
        if (findResult.isEmpty()) {
            throw new NotFoundException();
        }

        Wallet wallet = findResult.get();
        BigDecimal newBalance = wallet.getBalance().subtract(amount);

        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            throw new NotEnoughFundsException(wallet);
        }

        wallet.setBalance(newBalance);
        return walletRepository.save(wallet);
    }

    public WalletDto withdrawFunds(WalletWithdrawFundsRequestDto withdrawRequest) {
        return new WalletDto(withdrawFunds(withdrawRequest.walletId, withdrawRequest.amount));
    }

    public void sendFunds(WalletToWalletTransactionRequestDto transactionRequest) {
        withdrawFunds(transactionRequest.fromWalletId, transactionRequest.amount);
        addFunds(transactionRequest.toWalletId, transactionRequest.amount);
    }

    private int getIntegerDigits(BigDecimal bd) {
        return bd.signum() == 0 ? 1 : bd.precision() - bd.scale();
    }
}
