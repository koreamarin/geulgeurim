package com.geulgrim.common.user.doamin.respository;

import com.geulgrim.common.user.doamin.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
