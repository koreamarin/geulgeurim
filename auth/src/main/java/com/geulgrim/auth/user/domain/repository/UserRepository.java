package com.geulgrim.auth.user.domain.repository;

import com.geulgrim.auth.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.parameters.P;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserId(Long userId);

    Optional<User> findByPhoneNum(String phoneNumber);

    boolean existsByEmail(String email);

    boolean existsByUserId(Long userId);
}
