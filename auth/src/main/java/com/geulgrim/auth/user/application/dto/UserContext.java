package com.geulgrim.auth.user.application.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserContext implements UserDetails {

    private final UserDetailResponseDto userDetailResponseDto;

    private final List<GrantedAuthority> authorities;

    public UserContext(UserDetailResponseDto dto, List<GrantedAuthority> authorities) {
        this.userDetailResponseDto = dto;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return userDetailResponseDto.getPassword();
    }

    @Override
    public String getUsername() {
        return userDetailResponseDto.getPhoneNum();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
