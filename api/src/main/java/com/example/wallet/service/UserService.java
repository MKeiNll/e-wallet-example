package com.example.wallet.service;

import com.example.wallet.model.User;
import com.example.wallet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User getByCredentials(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}