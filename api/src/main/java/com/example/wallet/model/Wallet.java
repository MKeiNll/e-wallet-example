package com.example.wallet.model;

import com.example.wallet.controller.wallet.dto.WalletCreateRequestDto;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;

@Entity
@Table(name = "wallet")
public class Wallet {

	private @Id
	@GeneratedValue
	Long id;

	@Column(length=32, nullable=false, unique=false)
	private String name;

	@Digits(integer=100, fraction=2)
	private BigDecimal balance = new BigDecimal(0);

	private Wallet() {}

	public Wallet(WalletCreateRequestDto createRequest) {
		name = createRequest.name;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}
}