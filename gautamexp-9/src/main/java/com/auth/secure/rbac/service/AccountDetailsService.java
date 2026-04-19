package com.auth.secure.rbac.service;
import com.auth.secure.rbac.domain.UserAccount;
import com.auth.secure.rbac.persistence.UserAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

@Service
public class AccountDetailsService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(AccountDetailsService.class);
    private final UserAccountRepository userRepository;

    public AccountDetailsService(UserAccountRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Attempting to load user account for: {}", username);
        
        UserAccount account = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("Account lookup failed for user: {}", username);
                    return new UsernameNotFoundException("Account not found: " + username);
                });
        
        return User.builder()
                .username(account.getUsername())
                .password(account.getPassword())
                .authorities(account.getRole())
                .build();
    }
}
