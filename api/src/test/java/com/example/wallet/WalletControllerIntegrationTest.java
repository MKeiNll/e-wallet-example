package com.example.wallet;

import com.example.wallet.configuration.AuthenticationEntryPoint;
import com.example.wallet.controller.WalletController;
import com.example.wallet.dto.WalletDto;
import com.example.wallet.model.Wallet;
import com.example.wallet.service.WalletService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(WalletController.class)
@WithMockUser(authorities = "ROLE_ADMIN")
public class WalletControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private WalletService service;

    @MockBean
    private AuthenticationEntryPoint entryPoint;

    @Test
    public void givenWallets_whenGetWallets_thenReturnJsonArray()
            throws Exception {

        WalletDto walletDto1 = new WalletDto(new Wallet("Test wallet 1"));
        WalletDto walletDto2 = new WalletDto(new Wallet("Test wallet 2"));

        List<WalletDto> wallets = Arrays.asList(walletDto1, walletDto2);

        given(service.getWallets()).willReturn(wallets);

        mvc.perform(get("/wallet")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is(walletDto1.name)))
                .andExpect(jsonPath("$[0].balance", is(walletDto1.balance.intValue())))
                .andExpect(jsonPath("$[1].name", is(walletDto2.name)))
                .andExpect(jsonPath("$[1].balance", is(walletDto2.balance.intValue())));
    }

    @Test
    public void givenWallet_whenGetWallet_thenReturnJson()
            throws Exception {

        WalletDto walletDto = new WalletDto(new Wallet("Test wallet"));

        given(service.getWalletById(1L)).willReturn(walletDto);

        mvc.perform(get("/wallet/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is(walletDto.name)))
                .andExpect(jsonPath("$.balance", is(walletDto.balance.intValue())));
    }
}
