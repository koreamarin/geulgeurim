package com.geulgrim.common.user.domain.repository;

import com.geulgrim.common.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
