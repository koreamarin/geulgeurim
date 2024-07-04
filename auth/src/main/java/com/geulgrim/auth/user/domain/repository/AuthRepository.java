package com.geulgrim.auth.user.domain.repository;

import com.geulgrim.auth.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AuthRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email_id);
    Optional<User> findByName(String name);
}