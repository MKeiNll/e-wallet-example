package com.example.wallet.model;

import javax.persistence.*;

@Entity
@Table(name = "wallet_user")
public class User {

	private @Id
	@GeneratedValue
	Long id;

    @Column(length=32, nullable=false, unique=true)
	private String username;

    @Column(length=128, nullable=false, unique=false)
	private String password;

	private User() {}

	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}