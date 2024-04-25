package com.geulgrim.auth.user.application;

import com.geulgrim.auth.user.domain.User;
import com.geulgrim.auth.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String phoneNum) throws UsernameNotFoundException {
        User user = userRepository.findByPhoneNum(phoneNum).orElseThrow();

//        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority());


        return null;
    }
}
